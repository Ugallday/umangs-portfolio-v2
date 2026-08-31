"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import ReactMarkdown from "react-markdown";

import { cn } from "@/core/utils/cn";
import { siteConfig } from "@/config/site";
import { ButtonWithIcon } from "@/components/ui/button-with-icon";

interface ChatMessage {
  readonly role: "user" | "model";
  readonly content: string;
}

const SUGGESTED_QUESTIONS = [
  "What are his strongest technical skills?",
  "Tell me about his most impressive project",
  "What's his research experience?",
  "Why should I consider him for a data role?",
  "How can I contact him?",
] as const;

const WELCOME_MESSAGE = `Hi! I'm ${siteConfig.name}'s AI assistant. Ask me about his projects, technical skills, education, experience, research, or anything else you'd like to know.`;

/**
 * Renders one assistant message's markdown. Links get target/rel set per
 * whether they're internal (same-origin) or external - an internal link
 * (e.g. a project case study) should feel like normal site navigation, an
 * external one (GitHub, LinkedIn) should open in a new tab so the
 * conversation isn't lost.
 */
function MarkdownMessage({ content }: { readonly content: string }): React.JSX.Element {
  return (
    <div className="prose-chat [&_a]:text-accent-default text-sm leading-6 [&_a]:underline [&_p:not(:first-child)]:mt-2">
      <ReactMarkdown
        components={{
          a: ({ href, children }) => {
            const isExternal = href?.startsWith("http");
            return (
              <a
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

function TypingIndicator(): React.JSX.Element {
  return (
    <div className="flex items-center gap-1.5 px-1 py-2" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="bg-text-muted h-1.5 w-1.5 animate-bounce rounded-full"
          style={{ animationDelay: `${i * 120}ms` }}
        />
      ))}
    </div>
  );
}

export function ChatWidget(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<readonly ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Focus the input the moment the window opens, so a keyboard user can
  // start typing immediately rather than having to tab to find it.
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Escape closes the window from anywhere inside it, matching the standard
  // dialog convention every visitor already expects.
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Keep the newest message in view without yanking the whole page's scroll
  // position - only the message list itself scrolls.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  async function sendMessage(text: string): Promise<void> {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const nextMessages = [...messages, { role: "user" as const, content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-12) }),
      });

      const data: { reply?: string; error?: string } = await response.json();

      if (!response.ok || !data.reply) {
        setError(data.error ?? "Something went wrong. Try again in a moment.");
        setIsLoading(false);
        return;
      }

      setMessages((prev) => [...prev, { role: "model", content: data.reply! }]);
    } catch {
      setError("Couldn't reach the assistant. Check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event: React.FormEvent): void {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <>
      <div className="fixed right-5 bottom-5 z-50">
        <ButtonWithIcon
          label={isOpen ? "Close chat" : "Ask me about Umang"}
          icon={
            isOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
            )
          }
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          aria-controls="chat-widget-dialog"
          aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
          className="shadow-elevation-2 bg-white text-black hover:bg-white focus-visible:ring-2 focus-visible:ring-black focus-visible:outline-none"
          discClassName="bg-black text-white"
        />
      </div>

      {isOpen ? (
        <div
          ref={dialogRef}
          id="chat-widget-dialog"
          role="dialog"
          aria-modal="false"
          aria-label={`Chat assistant for ${siteConfig.name}`}
          className={cn(
            "fold-panel shadow-elevation-2 fixed z-50 flex flex-col overflow-hidden rounded-3xl",
            "inset-x-4 top-20 bottom-24 sm:inset-x-auto sm:top-auto sm:right-5 sm:bottom-24",
            "sm:h-[32rem] sm:w-96",
          )}
        >
          <header className="border-border-subtle flex items-center justify-between border-b px-4 py-3">
            <div>
              <p className="text-text-primary text-sm font-semibold">
                {siteConfig.name}'s assistant
              </p>
              <p className="text-text-muted text-xs">Answers from his actual portfolio</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="text-text-muted hover:text-text-primary rounded-full p-1.5 transition"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </header>

          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            role="log"
            aria-live="polite"
            aria-label="Conversation"
          >
            <div className="bg-surface-overlay border-border-subtle max-w-[85%] rounded-2xl border px-3 py-2">
              <MarkdownMessage content={WELCOME_MESSAGE} />
            </div>

            {messages.length === 0 ? (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTED_QUESTIONS.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => void sendMessage(question)}
                    className="border-border-default text-text-secondary hover:border-border-strong hover:text-text-primary rounded-full border px-3 py-1.5 text-xs transition"
                  >
                    {question}
                  </button>
                ))}
              </div>
            ) : null}

            {messages.map((message, index) => (
              <div
                key={index}
                className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl border px-3 py-2",
                    message.role === "user"
                      ? "bg-accent-default text-text-on-accent border-transparent"
                      : "bg-surface-overlay border-border-subtle",
                  )}
                >
                  {message.role === "model" ? (
                    <MarkdownMessage content={message.content} />
                  ) : (
                    <p className="text-sm leading-6">{message.content}</p>
                  )}
                </div>
              </div>
            ))}

            {isLoading ? (
              <div className="flex justify-start">
                <div className="bg-surface-overlay border-border-subtle rounded-2xl border px-3">
                  <TypingIndicator />
                </div>
              </div>
            ) : null}

            {error ? (
              <div className="rounded-2xl border border-red-900/40 bg-red-950/20 px-3 py-2">
                <p className="text-sm leading-6 text-red-300">{error}</p>
              </div>
            ) : null}
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-border-subtle flex items-center gap-2 border-t p-3"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask a question..."
              maxLength={1000}
              aria-label="Type your question"
              className="border-border-default bg-surface-base text-text-primary placeholder:text-text-muted focus-visible:ring-accent-default flex-1 rounded-full border px-4 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none"
            />
            <button
              type="submit"
              disabled={isLoading || input.trim().length === 0}
              aria-label="Send message"
              className="bg-accent-default text-text-on-accent hover:bg-accent-hover flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition disabled:opacity-40"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}
