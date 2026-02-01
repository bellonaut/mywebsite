# Bashir Aminu Bello — Premium Portfolio

Next.js (App Router) + Tailwind v4 + Framer Motion + react-three-fiber. Editorial minimalism with GPU-accelerated flow-field background, MDX case studies, and a live Substack RSS feed.

## Quick start

```bash
npm install
npm run dev
# lint / typecheck / production build
npm run lint
npm run build
```

Open http://localhost:3000.

## Project layout

- `app/` — pages, layouts, metadata, sitemap/robots.
- `components/` — UI kit, layout, background, projects drawer, writing feed, lab demos.
- `data/projects.ts` — primary project catalog (used on Home, /projects, drawers).
- `content/projects/*.mdx` — long-form case studies.
- `lib/rss.ts` — Substack RSS fetch with caching; tweak feed URL in `lib/constants.ts`.
- `public/projects/*.svg` — placeholder visuals.
- `public/resume.pdf` — placeholder resume (replace with the real PDF).

## Updating content

- **Projects**: edit `data/projects.ts` (categories/tags/links). Add MDX for deep dives in `content/projects/` and map slug in `app/projects/[slug]/page.tsx`.
- **Writing**: edit `data/writing.ts`. Substack pulls automatically from `SITE.substackFeed` in `lib/constants.ts`.
- **Site metadata**: adjust `SITE` in `lib/constants.ts` (name, description, canonical `url`).
- **Resume**: replace `public/resume.pdf` with your file (keep the same name). Header/Footer buttons link here.

## Environment variables

None required by default. If you later connect APIs (e.g., analytics, email), add them to `.env.local` and reference via `process.env`.

## Deployment (Vercel)

1) Push to a Git repo.  
2) In Vercel, “New Project” → import the repo.  
3) Framework preset: **Next.js**. No env vars needed.  
4) Deploy.  
5) Update `SITE.url` in `lib/constants.ts` to the live domain for correct OpenGraph/robots/sitemap URLs.

## Accessibility & performance

- Global `prefers-reduced-motion` support; background falls back to a static gradient.
- Flow-field uses capped DPR and throttle-friendly uniforms.
- Drawer has ESC + focus trapping; cards are keyboard activatable.
- Images are local & optimized via `next/image`.
