import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

import { siteConfig } from "@/config/site";
import { buildKnowledgeBase } from "@/features/chatbot/knowledge";

/**
 * POST /api/chat — the chat backend for the "Ask about Umang" widget.
 *
 * Node runtime, not edge: buildKnowledgeBase() reads the project MDX files
 * from disk via the same repository the rest of the site uses, and edge
 * functions have no filesystem access.
 *
 * The Gemini API key never reaches the browser - it's read from a
 * server-only env var and this route is the only place that touches it.
 * The client only ever talks to this same-origin route, which is why no
 * CSP change was needed to ship this (connect-src 'self' already covers it).
 */
export const runtime = "nodejs";

/**
 * Two different caps, not one. `MAX_USER_MESSAGE_LENGTH` bounds what a
 * visitor can type in (anti-abuse). `MAX_MODEL_MESSAGE_LENGTH` bounds the
 * assistant's own past replies as they're echoed back in conversation
 * history on every subsequent turn - and it has to be generous enough to
 * comfortably hold whatever `maxOutputTokens` below can actually produce,
 * or a single long reply breaks every message after it in the same
 * conversation, which is exactly the bug this comment is replacing.
 */
const MAX_USER_MESSAGE_LENGTH = 1000;
const MAX_MODEL_MESSAGE_LENGTH = 4000;
const MAX_HISTORY_TURNS = 12;

const messageSchema = z
  .object({
    role: z.enum(["user", "model"]),
    content: z.string().min(1),
  })
  .refine(
    (message) =>
      message.content.length <=
      (message.role === "user" ? MAX_USER_MESSAGE_LENGTH : MAX_MODEL_MESSAGE_LENGTH),
    { message: "Message too long." },
  );

const requestSchema = z.object({
  messages: z.array(messageSchema).min(1).max(MAX_HISTORY_TURNS),
});

/**
 * The instruction that keeps the bot from inventing anything. Repeated,
 * specific "don't guess" language rather than one polite line - a model
 * left to its own devices will happily synthesize a plausible-sounding
 * answer from a vague question, which is exactly the failure mode this
 * whole feature exists to avoid.
 */
function buildSystemInstruction(knowledge: string): string {
  return `You are an assistant answering questions about ${siteConfig.name} on his personal portfolio site, for visitors such as recruiters, hiring managers, and professors.

Answer ONLY using the information below. This is the complete set of facts you have about him.

Rules, no exceptions:
- Never invent or infer accomplishments, skills, employers, metrics, dates, or results that are not explicitly stated below.
- If a question asks about something not covered below, say plainly that you don't have that information, and suggest the visitor check the site directly or use the contact page - do not guess or extrapolate.
- Do not speculate about his opinions, preferences, or anything not stated as fact below.
- When you reference a specific project, mention its name and, if useful, its link (format: ${siteConfig.url}/projects/<slug>).
- Keep answers concise - a few sentences for a simple question, a short paragraph with structure for a broader one like "summarize his experience." Don't pad with filler.
- Write in third person about him (he/his), since you are an assistant representing him, not speaking as him.
- Be professional. This is read by recruiters and professors.
- You may use markdown formatting (links, bold, short lists) where it genuinely helps readability - don't force it into every answer.

--- KNOWLEDGE BASE ---

${knowledge}

--- END KNOWLEDGE BASE ---`;
}

export async function POST(request: Request): Promise<Response> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // A missing key is a deploy misconfiguration, not a user-facing detail -
    // logged for whoever is watching the deploy, generic message to the client.
    console.error("GEMINI_API_KEY is not set");
    return Response.json(
      { error: "The assistant isn't configured yet. Try the contact page instead." },
      { status: 503 },
    );
  }

  const body: unknown = await request.json().catch(() => null);
  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const { messages } = parsed.data;

  try {
    const knowledge = await buildKnowledgeBase();
    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: messages.map((m) => ({
        role: m.role,
        parts: [{ text: m.content }],
      })),
      config: {
        systemInstruction: buildSystemInstruction(knowledge),
        maxOutputTokens: 500,
        temperature: 0.3,
      },
    });

    const text = response.text;
    if (!text) {
      return Response.json({ error: "Didn't get a response. Please try again." }, { status: 502 });
    }

    return Response.json({ reply: text });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      { error: "Something went wrong answering that. Try again in a moment." },
      { status: 502 },
    );
  }
}
