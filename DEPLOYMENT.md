Deployment checklist for Vercel

1. Push your branch to GitHub (main or a branch you will connect).

2. In the Vercel dashboard, "Import Project" and connect the GitHub repo.
   - Framework Preset: Next.js (should be auto-detected).
   - Build Command: `npm run build`
   - Output Directory: (leave empty — Vercel will detect Next.js)

3. Environment variables
   - Do NOT commit `.env.local` to the repo. Instead add the following in Vercel > Settings > Environment Variables (Project):
     - `RESEND_API_KEY` (server)
     - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` (client)
     - `CLOUDINARY_API_KEY` (server)
     - `CLOUDINARY_API_SECRET` (server)
     - `NEXT_PUBLIC_SUPABASE_URL` (client) — optional
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (client) — optional
     - `NEXT_PUBLIC_SITE_URL` (client) — set to your production URL (e.g., https://your-site.vercel.app or your custom domain)

4. Secrets vs. Runtime
   - Server-only secrets (API keys, service secrets) should be added as "Environment Variable" and marked for the appropriate environment (Production/Preview/Development).
   - Client-facing vars must be prefixed with `NEXT_PUBLIC_`.

5. Deploy
   - Once connected, Vercel will build on every push to the linked branch.
   - Monitor the build logs in Vercel for any failures.

6. Custom domain (optional)
   - Add your domain in Vercel Dashboard > Domains and follow the DNS instructions.
   - For most registrars, add the required A or CNAME records.

7. Post-deploy checks
   - Visit the production URL and verify pages load.
   - Check analytics and any integrations that rely on environment variables.

Notes

- If the build fails due to linting or type errors, run locally:

```bash
npm ci
npm run validate
npm run build
```

- Keep `.env.example` up to date for developer onboarding.
