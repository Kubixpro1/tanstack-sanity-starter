# TanStack Start + Sanity CMS Starter

A minimal, production-ready starter for building business websites using **TanStack Start** and **Sanity CMS**, deployable to **Cloudflare Pages** in minutes.

Built by [NordStack](https://nordstack.pages.dev) — a web studio building AI-powered sites for local businesses in Poland.

---

## What's included

- **TanStack Start** — file-based routing, SSR, type-safe loaders
- **Sanity CMS** — structured content with three ready-made document types
- **Cloudflare Pages** — zero-config deployment target
- **Web3Forms** — contact form submissions with no backend
- **TypeScript** throughout
- Clean, responsive CSS (no Tailwind dependency)

### Sanity document types out of the box

| Type | Purpose |
|---|---|
| `businessInfo` | Name, tagline, contact info, opening hours, social links |
| `page` | Hero + flexible content sections |
| `galleryItem` | Image gallery with categories |

---

## Quick start

### 1. Clone and install

```bash
git clone https://github.com/your-username/tanstack-start-sanity-starter.git
cd tanstack-start-sanity-starter
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in your values:

```env
VITE_SANITY_PROJECT_ID=your_project_id    # from sanity.io → project settings
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-01-01
VITE_WEB3FORMS_KEY=your_key               # free at web3forms.com
```

> **Never commit `.env.local` to git.** It's already in `.gitignore`.

### 3. Set up Sanity

If you don't have a Sanity project yet:

```bash
npm create sanity@latest
```

Then deploy your Studio:

```bash
cd sanity
npx sanity deploy
```

### 4. Run locally

```bash
npm run dev
```

---

## Deploy to Cloudflare Pages

### Option A — drag and drop (fastest)

```bash
npm run build
```

Upload the `.output/public` folder at [pages.cloudflare.com](https://pages.cloudflare.com).

### Option B — CLI

```bash
npm run deploy
```

Add your environment variables in the Cloudflare Pages dashboard under **Settings → Environment variables**.

---

## Project structure

```
├── src/
│   ├── routes/
│   │   ├── __root.tsx      # Layout, nav, footer, global CSS
│   │   └── index.tsx       # Homepage (hero, gallery, contact)
│   ├── components/
│   │   └── ContactForm.tsx # Web3Forms-powered contact form
│   └── lib/
│       └── sanity.ts       # Sanity client + GROQ queries
├── sanity/
│   ├── schemas/            # Document type definitions
│   │   ├── businessInfo.ts
│   │   ├── page.ts
│   │   └── galleryItem.ts
│   └── sanity.config.ts    # Sanity Studio config
├── .env.example            # ← copy this to .env.local
└── .gitignore              # .env.local is excluded
```

---

## Customisation

### Adding a new page

1. Create `src/routes/about.tsx` with a `createFileRoute("/about")` component
2. Add a `page` document in Sanity Studio with slug `about`
3. Use `getPageContent("about")` in the loader

### Adding a new content type

1. Create a schema file in `sanity/schemas/`
2. Add it to `sanity/schemas/index.ts`
3. Add a query in `src/lib/sanity.ts`

---

## Environment variables reference

| Variable | Required | Description |
|---|---|---|
| `VITE_SANITY_PROJECT_ID` | ✅ | Your Sanity project ID |
| `VITE_SANITY_DATASET` | ✅ | Usually `production` |
| `VITE_SANITY_API_VERSION` | ✅ | e.g. `2024-01-01` |
| `SANITY_API_TOKEN` | ❌ | Only for private datasets |
| `VITE_WEB3FORMS_KEY` | ✅ | Free at web3forms.com |

---

## License

MIT — use it for anything, client sites included.

---

## Contributing

PRs welcome. If you use this for a client project and improve something, consider opening a PR so others benefit too.
