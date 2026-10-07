# 🛤️ SkillPath AI

> Turn any career goal into a clear, personalized roadmap. Discover what to learn, where to learn it for free, what to build, and track your job-readiness score as you progress.

<p>
  <a href="https://pixel-perfect-liart-nu.vercel.app/"><img src="https://img.shields.io/badge/Live%20Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" /></a>
  <a href="https://github.com/Dhanashreeagrawal30/pixel-perfect"><img src="https://img.shields.io/github/license/Dhanashreeagrawal30/pixel-perfect?style=for-the-badge" alt="License" /></a>
  <a href="https://github.com/Dhanashreeagrawal30/pixel-perfect"><img src="https://img.shields.io/github/last-commit/Dhanashreeagrawal30/pixel-perfect?style=for-the-badge" alt="Last Commit" /></a>
  <a href="https://github.com/Dhanashreeagrawal30/pixel-perfect"><img src="https://img.shields.io/github/languages/top/Dhanashreeagrawal30/pixel-perfect?style=for-the-badge&color=3178c6" alt="Top Language" /></a>
</p>

**Live Demo:** [pixel-perfect-liart-nu.vercel.app](https://pixel-perfect-liart-nu.vercel.app) ✅

---

## ✨ What is SkillPath AI?

SkillPath AI is an **AI-powered career companion for students and career-changers**. Pick a target career, tell us what you already know, and instantly get a structured roadmap — complete with free learning resources, practice drills, real project ideas, and a job-readiness score that updates as you progress.

No more guessing what to learn next. No more bouncing between random tutorials. Just a clear path from "I want to be a developer" to your first tech role.

---

## 🎯 9 Career Paths Built In

| Career Path | Difficulty | Timeline |
|-------------|-----------|----------|
| 🎨 **Frontend Developer** | Beginner | 5–7 months |
| ⚙️ **Backend Developer** | Intermediate | 6–8 months |
| 🔗 **Full Stack Developer** | Intermediate | 8–10 months |
| 🧠 **AI / ML Engineer** | Advanced | 10–12 months |
| 📊 **Data Analyst** | Beginner | 4–6 months |
| 🛡️ **Cybersecurity Engineer** | Advanced | 9–12 months |
| ✏️ **UI / UX Designer** | Beginner | 4–6 months |
| ☁️ **Cloud Engineer** | Intermediate | 7–9 months |
| 🔧 **DevOps Engineer** | Advanced | 8–10 months |

---

## 🚀 Key Features

- **🎯 Personalized roadmaps** — Skip what you already know. The AI re-orders stages based on your current skill level and experience.
- **📚 Curated free resources** — Every skill links to trusted, free material: MDN, freeCodeCamp, Khan Academy, Kaggle Learn, YouTube, Exercism, The Odin Project, and more.
- **🏗️ Learn → Practice → Build** — For every skill: a resource to *learn*, exercises to *practice*, and a real project to *build* and add to your portfolio.
- **40+ guided projects** — Each with a problem statement, feature list, tech stack, and bonus challenges. (To-Do apps, Weather dashboards, URL shorteners, House price predictors, CTF labs, Design systems, and more.)
- **📊 Job-readiness score** — A single number (0–100%) broken down into 5 categories:
  - Technical Skills
  - Projects Built
  - Problem Solving
  - Portfolio Strength
  - Interview Preparation
- **⏱️ Realistic timelines** — Estimated completion date calculated from your daily study minutes.
- **🔥 Gamified progress** — Streaks, XP, badges, and next-step suggestions.
- **📉 Skill-gap analyzer** — See exactly what's missing between you and your target role, prioritized by impact.
- **✅ No sign-up required** for the core experience. All progress is stored locally.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Framework** | React 19, TanStack Start (SSR) |
| **Routing** | TanStack Router (file-based) |
| **Language** | TypeScript 5 |
| **Build Tool** | Vite 8 |
| **Styling** | Tailwind CSS 4, Radix UI, tw-animate-css, class-variance-authority, tailwind-merge |
| **State & Data** | TanStack React Query, Zustand-style store, Zod validation |
| **Forms** | React Hook Form + @hookform/resolvers |
| **Charts & Viz** | Recharts, embla-carousel-react |
| **UI Components** | 40+ custom components (shadcn-style): Accordion, Calendar, Chart, Command, Drawer, Dropdown, Form, Resizable, Sidebar, Table, Tabs, Tooltip, etc. |
| **Icons** | lucide-react |
| **Testing** | Vitest + Testing Library + jsdom |
| **Linting/Formatting** | ESLint 9, Prettier, typescript-eslint |
| **Date** | date-fns, react-day-picker |
| **Notices** | Sonner (toasts), Vaul (drawers) |

---

## 📦 Project Structure

```
pixel-perfect/
├── src/
│   ├── components/          # Reusable UI (AppShell, Assistant, icons, 40+ Radix primitives)
│   │   └── ui/              # shadcn-style component library
│   ├── hooks/               # use-mobile, etc.
│   ├── lib/                 # Core logic
│   │   ├── careers.ts       # 9 careers, projects, roadmap generator, stats engine
│   │   ├── skills.ts        # 60+ skills with resources, practice, builds
│   │   ├── assistant.ts     # AI assistant logic
│   │   ├── store.tsx        # Client-side state (profile, progress)
│   │   └── utils.ts
│   ├── routes/              # File-based routing (TanStack Router)
│   │   ├── index.tsx        # Landing page
│   │   ├── careers.tsx      # Career explorer
│   │   ├── dashboard.tsx    # Today / home dashboard
│   │   ├── roadmap.tsx      # Full roadmap view
│   │   ├── projects.tsx     # Projects list
│   │   ├── progress.tsx     # Stats & score breakdown
│   │   ├── profile.tsx      # Profile settings
│   │   ├── onboarding.tsx   # Build your roadmap flow
│   │   └── how-it-works.tsx # How it works page
│   ├── router.tsx
│   ├── routeTree.gen.ts     # Auto-generated route tree
│   ├── server.ts            # SSR server entry (Nitro)
│   ├── start.ts
│   ├── styles.css           # Tailwind + design tokens
│   └── test/                # Vitest setup + routing tests
├── public/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind config (inline in vite via @tailwindcss/vite)
└── components.json
```

---

## 💻 Local Development

You need **Node.js ≥ 20** (includes npm).

```sh
# 1. Clone the repo
git clone https://github.com/Dhanashreeagrawal30/pixel-perfect.git
cd pixel-perfect

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
# → http://localhost:8080
```

### Other useful commands

```sh
npm run build          # Production build
npm run preview        # Preview production build locally
npm run test           # Run tests once (Vitest)
npm run test:watch     # Run tests in watch mode
npm run lint           # ESLint check
npm run format         # Format all files with Prettier
```

---

## 🌐 Deployment

This project uses **TanStack Start with Nitro** — it's a full SSR framework. The easiest deploys:

### Option A — Vercel (recommended, 1-click-ish)
```sh
npm i -g vercel
vercel
```
Or connect the GitHub repo to Vercel dashboard — it auto-detects the framework.

### Option B — Any Node host
```sh
npm run build
node .output/server/index.mjs   # Or the .output folder for your platform
```
Nitro outputs to `.output/` — see the [Nitro deployment docs](https://nitro.unjs.io/deploy) for Cloudflare, Netlify, AWS, Docker, etc.

---

## 🤝 Contributing

Contributions are welcome! Ideas for PRs:
- Add more career paths (Game Dev, Mobile, QA, Product Manager…)
- Add more free resources / projects to existing skills
- Improve the AI personalization logic
- Add multi-language support
- Persist progress to a backend

This repo syncs with [Lovable](https://lovable.dev) — avoid rewriting published git history (force push, rebase, squash of pushed commits).

---

## 📄 License

MIT — feel free to use this for learning, building, or shipping your own version.

---

<p align="center">
  Built with ❤️ using React, TanStack, and Tailwind CSS.
</p>
