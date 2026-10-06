import { SKILLS, type Level, type Skill } from "./skills";

export interface Project {
  id: string;
  title: string;
  difficulty: Level;
  skills: string[]; // skill ids
  hours: number;
  problem: string;
  features: string[];
  tech: string[];
  bonus: string[];
}

export interface Stage {
  name: string;
  skills: string[];
}

export interface Career {
  id: string;
  title: string;
  tagline: string;
  difficulty: Level;
  months: string;
  icon: string; // lucide icon key
  stages: Stage[];
  projects: Project[];
}

const P = (
  id: string,
  title: string,
  difficulty: Level,
  skills: string[],
  hours: number,
  problem: string,
  features: string[],
  tech: string[],
  bonus: string[],
): Project => ({ id, title, difficulty, skills, hours, problem, features, tech, bonus });

const CAREER_STAGE = { name: "Career Preparation", skills: ["portfolio", "resume", "github-profile", "interview"] };

export const CAREERS: Career[] = [
  {
    id: "frontend", title: "Frontend Developer", tagline: "Build the interfaces people use every day.", difficulty: "Beginner", months: "5–7 months", icon: "Layout",
    stages: [
      { name: "Foundation", skills: ["html", "css", "responsive"] },
      { name: "Programming", skills: ["js", "dom", "async", "apis"] },
      { name: "Development Tools", skills: ["git", "devtools", "npm"] },
      { name: "Framework", skills: ["react", "hooks", "state", "routing"] },
      { name: "Real-World Development", skills: ["ts", "rest", "auth", "testing", "deploy"] },
      CAREER_STAGE,
    ],
    projects: [
      P("fe-todo", "To-Do List Web App", "Beginner", ["js", "dom"], 6, "People lose track of small tasks. Build a fast, keyboard-friendly to-do list that persists between visits.", ["Add, edit, delete tasks", "Mark complete", "Filter active/done", "Save to localStorage"], ["HTML", "CSS", "JavaScript"], ["Drag to reorder", "Due dates"]),
      P("fe-weather", "Weather Dashboard", "Intermediate", ["js", "apis", "dom"], 10, "Travellers need weather at a glance. Build a dashboard that searches any city and shows a forecast.", ["Search city", "Display current weather", "5-day forecast", "Loading state", "Error handling"], ["JavaScript", "Open-Meteo API", "CSS Grid"], ["Geolocation", "Unit toggle °C/°F"]),
      P("fe-movies", "Movie Search Dashboard", "Intermediate", ["react", "hooks", "apis"], 14, "Finding something to watch takes too long. Build a React app to search, filter and save movies.", ["Debounced search", "Movie detail view", "Watchlist", "Responsive grid"], ["React", "TypeScript", "OMDb API"], ["Infinite scroll", "Shareable URLs"]),
      P("fe-shop", "E-commerce Storefront", "Advanced", ["react", "state", "routing", "ts"], 24, "Small brands need a clean online store. Build a multi-page storefront with cart and checkout flow.", ["Product listing & filters", "Product pages", "Cart with persistence", "Checkout form validation"], ["React", "TypeScript", "TanStack Router"], ["Dark mode", "Unit tests"]),
      P("fe-portfolio", "Portfolio Website", "Intermediate", ["responsive", "deploy", "portfolio"], 10, "Recruiters spend under a minute on your work. Build a fast portfolio that tells your story.", ["Hero & about", "Project case studies", "Contact form", "Deployed on a custom domain"], ["React", "Tailwind CSS", "Vercel"], ["Blog", "Lighthouse score 95+"]),
    ],
  },
  {
    id: "backend", title: "Backend Developer", tagline: "Design the APIs and data systems behind products.", difficulty: "Intermediate", months: "6–8 months", icon: "Server",
    stages: [
      { name: "Foundation", skills: ["js", "git", "linux"] },
      { name: "Programming", skills: ["async", "dsa", "ts"] },
      { name: "Server Development", skills: ["node", "rest", "auth"] },
      { name: "Data", skills: ["sql"] },
      { name: "Production", skills: ["security-basics", "testing", "docker", "deploy"] },
      CAREER_STAGE,
    ],
    projects: [
      P("be-short", "URL Shortener API", "Beginner", ["node", "rest"], 8, "Long links are ugly to share. Build an API that shortens and redirects URLs.", ["Create short codes", "Redirect", "Click counts", "Input validation"], ["Node.js", "Express", "PostgreSQL"], ["Custom aliases", "Rate limiting"]),
      P("be-notes", "Notes REST API with Auth", "Intermediate", ["rest", "auth", "sql"], 14, "Users need private notes. Build a secure CRUD API with authentication.", ["Signup/login", "CRUD notes", "Pagination", "Ownership checks"], ["Node.js", "JWT", "PostgreSQL"], ["Full-text search", "OpenAPI docs"]),
      P("be-chat", "Realtime Chat Server", "Advanced", ["node", "async", "docker"], 20, "Teams need instant messaging. Build a websocket chat backend with rooms.", ["Rooms", "Message history", "Presence", "Dockerized"], ["Node.js", "WebSockets", "Redis"], ["Typing indicators", "Load testing"]),
      P("be-jobs", "Job Queue Service", "Advanced", ["node", "sql", "testing"], 18, "Slow tasks block requests. Build a background job queue with retries.", ["Enqueue jobs", "Workers", "Retries & backoff", "Dashboard endpoint"], ["Node.js", "PostgreSQL"], ["Scheduled jobs", "Metrics"]),
    ],
  },
  {
    id: "fullstack", title: "Full Stack Developer", tagline: "Own features end to end — UI, API and database.", difficulty: "Intermediate", months: "8–10 months", icon: "Layers",
    stages: [
      { name: "Foundation", skills: ["html", "css", "responsive"] },
      { name: "Programming", skills: ["js", "dom", "async", "apis"] },
      { name: "Tools", skills: ["git", "npm"] },
      { name: "Frontend", skills: ["react", "hooks", "routing", "ts"] },
      { name: "Backend", skills: ["node", "rest", "sql", "auth"] },
      { name: "Shipping", skills: ["testing", "deploy"] },
      CAREER_STAGE,
    ],
    projects: [
      P("fs-todo", "To-Do List Web App", "Beginner", ["js", "dom"], 6, "Build a persistent to-do app.", ["CRUD tasks", "Filters", "Persistence"], ["JavaScript"], ["Drag & drop"]),
      P("fs-blog", "Full-Stack Blog", "Intermediate", ["react", "node", "sql"], 20, "Writers need a simple publishing platform.", ["Auth", "Write/edit posts", "Comments", "Markdown"], ["React", "Node.js", "PostgreSQL"], ["Image uploads", "RSS"]),
      P("fs-tracker", "Expense Tracker SaaS", "Advanced", ["react", "auth", "sql", "deploy"], 28, "People want to see where their money goes.", ["Accounts", "Categories", "Charts", "CSV export"], ["React", "TypeScript", "PostgreSQL"], ["Budgets", "Recurring expenses"]),
      P("fs-portfolio", "Portfolio Website", "Intermediate", ["responsive", "deploy", "portfolio"], 10, "Show your work to recruiters.", ["Case studies", "Contact", "Deployed"], ["React", "Tailwind"], ["Blog"]),
    ],
  },
  {
    id: "ai", title: "AI/ML Engineer", tagline: "Train models and ship intelligent products.", difficulty: "Advanced", months: "10–12 months", icon: "Brain",
    stages: [
      { name: "Foundation", skills: ["python", "git", "stats"] },
      { name: "Data", skills: ["pandas", "viz", "sql"] },
      { name: "Machine Learning", skills: ["ml", "dsa"] },
      { name: "Deep Learning", skills: ["dl", "llm"] },
      { name: "Production", skills: ["docker", "rest", "deploy"] },
      CAREER_STAGE,
    ],
    projects: [
      P("ai-house", "House Price Predictor", "Intermediate", ["ml", "pandas"], 12, "Buyers want fair price estimates.", ["Clean dataset", "Train regression models", "Evaluate", "Explain features"], ["Python", "scikit-learn"], ["Web demo"]),
      P("ai-vision", "Image Classifier Web Demo", "Advanced", ["dl", "deploy"], 20, "Make a trained model usable by anyone.", ["Fine-tune CNN", "Upload image UI", "Confidence scores"], ["PyTorch", "Gradio"], ["Grad-CAM heatmaps"]),
      P("ai-rag", "Chat-with-your-Notes (RAG)", "Advanced", ["llm", "rest"], 24, "Search your notes by meaning, not keywords.", ["Embed documents", "Vector search", "Chat UI", "Citations"], ["Python", "Hugging Face"], ["Evaluation suite"]),
      P("ai-eda", "Exploratory Analysis Notebook", "Beginner", ["pandas", "viz"], 8, "Turn a raw dataset into insights.", ["Cleaning", "Charts", "Findings summary"], ["Python", "pandas"], ["Interactive dashboard"]),
    ],
  },
  {
    id: "data", title: "Data Analyst", tagline: "Turn raw data into decisions.", difficulty: "Beginner", months: "4–6 months", icon: "BarChart3",
    stages: [
      { name: "Foundation", skills: ["excel", "stats"] },
      { name: "Querying", skills: ["sql"] },
      { name: "Programming", skills: ["python", "pandas"] },
      { name: "Communication", skills: ["viz"] },
      { name: "Tools", skills: ["git"] },
      CAREER_STAGE,
    ],
    projects: [
      P("da-budget", "Personal Budget Dashboard", "Beginner", ["excel"], 5, "Track monthly spending visually.", ["Categorize", "Pivot summaries", "Charts"], ["Excel / Sheets"], ["Forecasting"]),
      P("da-sales", "Sales Insights Dashboard", "Intermediate", ["sql", "viz"], 12, "Leadership wants a weekly sales snapshot.", ["SQL queries", "KPIs", "Interactive dashboard"], ["SQL", "Power BI"], ["Automated refresh"]),
      P("da-ab", "A/B Test Report", "Intermediate", ["stats", "pandas"], 10, "Did the new feature actually work?", ["Hypothesis", "Significance test", "Recommendation"], ["Python", "pandas"], ["Power analysis"]),
    ],
  },
  {
    id: "cyber", title: "Cybersecurity Engineer", tagline: "Defend systems and find vulnerabilities first.", difficulty: "Advanced", months: "9–12 months", icon: "Shield",
    stages: [
      { name: "Foundation", skills: ["networking", "linux"] },
      { name: "Programming", skills: ["python", "git"] },
      { name: "Web Security", skills: ["html", "security-basics", "auth"] },
      { name: "Hands-on", skills: ["seclabs"] },
      { name: "Cloud", skills: ["aws", "docker"] },
      CAREER_STAGE,
    ],
    projects: [
      P("cy-scan", "Port Scanner Tool", "Beginner", ["python", "networking"], 8, "Know what's exposed on your network.", ["Scan ports", "Service detection", "Report"], ["Python"], ["Threading"]),
      P("cy-assess", "Vulnerability Assessment Report", "Intermediate", ["seclabs", "security-basics"], 14, "Assess a deliberately vulnerable app.", ["Recon", "Findings with severity", "Remediation"], ["OWASP ZAP", "Burp CE"], ["CVSS scoring"]),
      P("cy-harden", "Cloud Hardening Lab", "Advanced", ["aws", "linux"], 16, "Secure a cloud environment end to end.", ["IAM least privilege", "Logging", "Alerting"], ["AWS"], ["IaC checks"]),
    ],
  },
  {
    id: "uiux", title: "UI/UX Designer", tagline: "Design products that feel effortless.", difficulty: "Beginner", months: "4–6 months", icon: "PenTool",
    stages: [
      { name: "Foundation", skills: ["design-basics", "figma"] },
      { name: "Research", skills: ["research", "a11y"] },
      { name: "Systems", skills: ["design-systems"] },
      { name: "Web Literacy", skills: ["html", "css", "responsive"] },
      CAREER_STAGE,
    ],
    projects: [
      P("ux-redesign", "App Redesign Case Study", "Beginner", ["design-basics", "figma"], 10, "Redesign a frustrating everyday app.", ["Audit", "Wireframes", "High-fidelity screens"], ["Figma"], ["Usability test"]),
      P("ux-proto", "Mobile App Prototype", "Intermediate", ["figma", "research"], 14, "Design a habit tracker from research to prototype.", ["Interviews", "Personas", "Clickable prototype"], ["Figma"], ["Motion design"]),
      P("ux-system", "Mini Design System", "Advanced", ["design-systems", "a11y"], 16, "Give a startup a consistent visual language.", ["Tokens", "10 components", "Documentation"], ["Figma"], ["Code handoff"]),
    ],
  },
  {
    id: "cloud", title: "Cloud Engineer", tagline: "Run reliable infrastructure at scale.", difficulty: "Intermediate", months: "7–9 months", icon: "Cloud",
    stages: [
      { name: "Foundation", skills: ["linux", "networking", "git"] },
      { name: "Programming", skills: ["python"] },
      { name: "Containers", skills: ["docker"] },
      { name: "Cloud", skills: ["aws", "iac"] },
      { name: "Operations", skills: ["cicd", "k8s"] },
      CAREER_STAGE,
    ],
    projects: [
      P("cl-static", "Static Site on S3 + CDN", "Beginner", ["aws"], 5, "Host a site globally for pennies.", ["S3 hosting", "CDN", "HTTPS"], ["AWS"], ["Custom domain"]),
      P("cl-serverless", "Serverless Image Uploader", "Intermediate", ["aws", "python"], 12, "Resize uploads automatically.", ["Upload", "Lambda resize", "Store results"], ["AWS Lambda", "S3"], ["Queue"]),
      P("cl-iac", "One-command Environment", "Advanced", ["iac", "cicd"], 16, "Spin up dev/staging/prod identically.", ["Terraform modules", "CI apply", "Teardown"], ["Terraform", "GitHub Actions"], ["Cost alerts"]),
    ],
  },
  {
    id: "devops", title: "DevOps Engineer", tagline: "Automate the path from commit to production.", difficulty: "Advanced", months: "8–10 months", icon: "Workflow",
    stages: [
      { name: "Foundation", skills: ["linux", "git", "networking"] },
      { name: "Scripting", skills: ["python"] },
      { name: "Automation", skills: ["cicd", "docker"] },
      { name: "Orchestration", skills: ["k8s", "iac"] },
      { name: "Cloud", skills: ["aws"] },
      CAREER_STAGE,
    ],
    projects: [
      P("do-ci", "CI Pipeline for a Web App", "Beginner", ["cicd", "git"], 6, "Ship safely on every merge.", ["Lint & test", "Build", "Deploy"], ["GitHub Actions"], ["Preview environments"]),
      P("do-compose", "Containerized Full-Stack App", "Intermediate", ["docker"], 10, "Run the whole stack with one command.", ["Dockerfiles", "Compose", "Healthchecks"], ["Docker"], ["Multi-stage builds"]),
      P("do-k8s", "Auto-scaling Microservice", "Advanced", ["k8s", "aws"], 20, "Handle traffic spikes without paging anyone.", ["Deployments", "HPA", "Monitoring"], ["Kubernetes"], ["Canary releases"]),
    ],
  },
];

export const CAREER_BY_ID = Object.fromEntries(CAREERS.map((c) => [c.id, c])) as Record<string, Career>;

export const KNOWN_SKILL_OPTIONS: Record<string, string[]> = Object.fromEntries(
  CAREERS.map((c) => [c.id, c.stages.flatMap((st) => st.skills).filter((id) => SKILLS[id]?.kind !== "career").slice(0, 10)]),
);

export function matchCustomCareer(text: string): string {
  const t = text.toLowerCase();
  const rules: [RegExp, string][] = [
    [/front|web|react|ui dev/, "frontend"],
    [/back|api|server/, "backend"],
    [/full/, "fullstack"],
    [/ai|ml|machine|deep|llm|data scien/, "ai"],
    [/data|analy|bi\b/, "data"],
    [/secur|cyber|hack|pentest/, "cyber"],
    [/design|ux|ui/, "uiux"],
    [/cloud|aws|azure|gcp/, "cloud"],
    [/devops|sre|platform|infra/, "devops"],
  ];
  return rules.find(([re]) => re.test(t))?.[1] ?? "fullstack";
}

// ---------------- Profile & roadmap generation ----------------

export type Experience = "Complete Beginner" | "Beginner" | "Intermediate" | "Advanced";

export interface Profile {
  careerId: string;
  careerTitle: string;
  known: string[];
  experience: Experience;
  minutesPerDay: number;
  targetMonths: number;
  createdAt: string;
}

export interface RoadmapItem extends Skill {
  stage: string;
  status: "done" | "skipped" | "current" | "upcoming";
  index: number;
}

export function buildRoadmap(profile: Profile, completed: string[]) {
  const career = CAREER_BY_ID[profile.careerId] ?? CAREERS[0];
  const done = new Set(completed);
  const known = new Set(profile.known);
  const pace = { "Complete Beginner": 1.25, Beginner: 1, Intermediate: 0.8, Advanced: 0.65 }[profile.experience];
  const items: RoadmapItem[] = [];
  let foundCurrent = false;
  let i = 0;
  for (const st of career.stages) {
    for (const id of st.skills) {
      const base = SKILLS[id];
      if (!base) continue;
      let status: RoadmapItem["status"];
      if (known.has(id)) status = "skipped";
      else if (done.has(id)) status = "done";
      else if (!foundCurrent) {
        status = "current";
        foundCurrent = true;
      } else status = "upcoming";
      items.push({ ...base, hours: Math.max(1, Math.round(base.hours * pace)), stage: st.name, status, index: ++i });
    }
  }
  const stages = career.stages.map((st) => ({ name: st.name, items: items.filter((it) => it.stage === st.name) }));
  return { career, items, stages };
}

export interface Stats {
  total: number;
  mastered: number;
  progressPct: number;
  remainingHours: number;
  readyDate: Date;
  readiness: number;
  breakdown: { label: string; value: number }[];
  boosts: { label: string; gain: number; skillId?: string; projectId?: string }[];
  next?: RoadmapItem;
  projectsDone: number;
  projectsTotal: number;
  skipped: number;
}

export function computeStats(profile: Profile, completed: string[], projectsDone: string[], now = new Date()): Stats {
  const { career, items } = buildRoadmap(profile, completed);
  const isDone = (it: RoadmapItem) => it.status === "done" || it.status === "skipped";
  const tech = items.filter((i) => i.kind !== "career");
  const careerItems = items.filter((i) => i.kind === "career");
  const pct = (a: number, b: number) => (b === 0 ? 0 : Math.round((a / b) * 100));

  const mastered = items.filter(isDone).length;
  const totalHours = items.reduce((a, b) => a + b.hours, 0);
  const doneHours = items.filter(isDone).reduce((a, b) => a + b.hours, 0);
  const projHoursLeft = career.projects.filter((p) => !projectsDone.includes(p.id)).reduce((a, p) => a + p.hours, 0);
  const remainingHours = items.filter((i) => !isDone(i)).reduce((a, b) => a + b.hours, 0) + projHoursLeft;
  const days = Math.ceil((remainingHours * 60) / Math.max(15, profile.minutesPerDay));
  const readyDate = new Date(now.getTime() + days * 86400000);

  const pDone = career.projects.filter((p) => projectsDone.includes(p.id)).length;
  const technical = pct(tech.filter(isDone).length, tech.length);
  const projects = pct(pDone, career.projects.length);
  const probIds = ["js", "dsa", "async", "python", "sql", "stats"];
  const prob = tech.filter((t) => probIds.includes(t.id) || t.stage.toLowerCase().includes("program"));
  const problem = Math.min(100, pct(prob.filter(isDone).length, prob.length || 1) * 0.8 + projects * 0.2);
  const portfolio = Math.round(
    (careerItems.filter((c) => ["portfolio", "github-profile"].includes(c.id) && isDone(c)).length / 2) * 60 + projects * 0.4,
  );
  const interviewItems = careerItems.filter((c) => ["resume", "interview"].includes(c.id));
  const interview = Math.round((interviewItems.filter(isDone).length / 2) * 70 + technical * 0.3);

  const breakdown = [
    { label: "Technical Skills", value: technical },
    { label: "Projects", value: projects },
    { label: "Problem Solving", value: Math.round(problem) },
    { label: "Portfolio", value: Math.min(100, portfolio) },
    { label: "Interview Preparation", value: Math.min(100, interview) },
  ];
  const readiness = Math.round(technical * 0.4 + projects * 0.25 + problem * 0.15 + Math.min(100, portfolio) * 0.1 + Math.min(100, interview) * 0.1);

  const techWeight = tech.length ? 40 / tech.length : 0;
  const boosts: Stats["boosts"] = [];
  tech.filter((t) => !isDone(t)).slice(0, 2).forEach((t) => boosts.push({ label: `Complete ${t.name}`, gain: Math.max(1, Math.round(techWeight + 1)), skillId: t.id }));
  const nextProj = career.projects.find((p) => !projectsDone.includes(p.id));
  if (nextProj) boosts.push({ label: `Build ${nextProj.title}`, gain: Math.round(25 / career.projects.length + 2), projectId: nextProj.id });
  const pf = careerItems.find((c) => c.id === "portfolio" && !isDone(c));
  if (pf) boosts.push({ label: "Publish your portfolio", gain: 6, skillId: "portfolio" });

  return {
    total: items.length,
    mastered,
    progressPct: pct(doneHours, totalHours),
    remainingHours,
    readyDate,
    readiness,
    breakdown,
    boosts: boosts.slice(0, 4),
    next: items.find((i) => i.status === "current"),
    projectsDone: pDone,
    projectsTotal: career.projects.length,
    skipped: items.filter((i) => i.status === "skipped").length,
  };
}

export function skillGap(profile: Profile, completed: string[]) {
  const { items } = buildRoadmap(profile, completed);
  const tech = items.filter((i) => i.kind !== "career");
  const have = tech.filter((i) => i.status === "done" || i.status === "skipped");
  const missing = tech.filter((i) => i.status === "current" || i.status === "upcoming");
  const gaps = missing.map((m, idx) => ({
    ...m,
    priority: (idx < Math.ceil(missing.length / 3) ? "High" : idx < Math.ceil((missing.length * 2) / 3) ? "Medium" : "Low") as "High" | "Medium" | "Low",
  }));
  return { have, gaps };
}

export function todaysPlan(profile: Profile, next?: RoadmapItem) {
  const m = profile.minutesPerDay;
  if (!next) return [{ minutes: m, label: "Review your portfolio and apply to one role", kind: "review" as const }];
  const learn = Math.round(m * 0.5);
  const practice = Math.round(m * 0.33);
  return [
    { minutes: learn, label: `Learn — ${next.name}: ${next.resources[0]?.name ?? "core concepts"}`, kind: "learn" as const },
    { minutes: practice, label: `Practice — ${next.practice[0]}`, kind: "practice" as const },
    { minutes: m - learn - practice, label: "Review — recap yesterday's notes", kind: "review" as const },
  ];
}

export const DEMO_PROFILE: Profile = {
  careerId: "frontend",
  careerTitle: "Frontend Developer",
  known: ["html", "css"],
  experience: "Beginner",
  minutesPerDay: 60,
  targetMonths: 6,
  createdAt: new Date().toISOString(),
};
export const DEMO_COMPLETED = ["responsive", "js", "dom", "git", "devtools", "npm"];
export const DEMO_PROJECTS = ["fe-todo", "fe-weather"];
