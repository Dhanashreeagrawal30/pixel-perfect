export type ResourceType = "Course" | "Video" | "Documentation" | "Practice";
export type Level = "Beginner" | "Intermediate" | "Advanced";

export interface Resource {
  name: string;
  platform: string;
  type: ResourceType;
  url: string;
  level: Level;
  time: string;
}

export interface Skill {
  id: string;
  name: string;
  desc: string;
  difficulty: Level;
  hours: number;
  prereqs: string[];
  why: string;
  resources: Resource[];
  practice: string[];
  build: string;
  kind?: "skill" | "project" | "career";
}

const r = (
  name: string,
  platform: string,
  type: ResourceType,
  url: string,
  level: Level = "Beginner",
  time = "2h",
): Resource => ({ name, platform, type, url, level, time });

const s = (
  id: string,
  name: string,
  difficulty: Level,
  hours: number,
  prereqs: string[],
  desc: string,
  why: string,
  resources: Resource[],
  practice: string[],
  build: string,
  kind: Skill["kind"] = "skill",
): Skill => ({ id, name, difficulty, hours, prereqs, desc, why, resources, practice, build, kind });

// Shared, reputable free resources (real URLs only)
const FCC = "https://www.freecodecamp.org/learn";
const ODIN = "https://www.theodinproject.com/paths";
const TIH = "https://www.techinterviewhandbook.org/";

const list: Skill[] = [
  // ---------- Web foundations ----------
  s("html", "HTML & Semantic HTML", "Beginner", 6, [], "Structure web pages with meaningful, accessible markup.", "Every website starts with HTML — search engines, screen readers and frameworks all depend on clean structure.",
    [r("Structuring content with HTML", "MDN", "Documentation", "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content", "Beginner", "4h"),
     r("Responsive Web Design certification", "freeCodeCamp", "Course", FCC, "Beginner", "10h"),
     r("Foundations path", "The Odin Project", "Course", ODIN, "Beginner", "6h")],
    ["Rebuild a news article using only semantic tags", "Write an accessible signup form"], "Personal bio page"),
  s("css", "CSS Fundamentals", "Beginner", 10, ["html"], "Selectors, the box model, Flexbox, Grid and modern layout.", "CSS is how products look and feel — layout skills are tested in nearly every frontend interview.",
    [r("Learn CSS", "web.dev", "Course", "https://web.dev/learn/css", "Beginner", "8h"),
     r("Flexbox Froggy", "Flexbox Froggy", "Practice", "https://flexboxfroggy.com/", "Beginner", "1h"),
     r("CSS reference", "MDN", "Documentation", "https://developer.mozilla.org/en-US/docs/Web/CSS", "Beginner", "—")],
    ["Recreate 3 layouts from Frontend Mentor", "Center anything 5 different ways"], "Landing page clone"),
  s("responsive", "Responsive Design", "Beginner", 5, ["css"], "Media queries, fluid units and mobile-first layouts.", "Over half of web traffic is mobile — employers expect every UI to work on every screen.",
    [r("Learn Responsive Design", "web.dev", "Course", "https://web.dev/learn/design", "Beginner", "5h"),
     r("Frontend Mentor challenges", "Frontend Mentor", "Practice", "https://www.frontendmentor.io/challenges", "Beginner", "3h")],
    ["Make a 3-column layout collapse gracefully", "Build a responsive navbar"], "Responsive portfolio landing page"),
  s("a11y", "Web Accessibility", "Intermediate", 4, ["html"], "ARIA, keyboard navigation, contrast and inclusive patterns.", "Accessible products reach more users and are increasingly a legal requirement.",
    [r("Learn Accessibility", "web.dev", "Course", "https://web.dev/learn/accessibility", "Intermediate", "4h")],
    ["Audit a page with Lighthouse", "Make a modal fully keyboard accessible"], "Accessible component kit"),

  // ---------- Programming ----------
  s("js", "JavaScript Fundamentals", "Beginner", 20, ["html"], "Variables, functions, arrays, objects, loops and scope.", "JavaScript is the language of the web — it powers every interactive feature you will build.",
    [r("The Modern JavaScript Tutorial", "javascript.info", "Documentation", "https://javascript.info/", "Beginner", "15h"),
     r("JavaScript Algorithms & Data Structures", "freeCodeCamp", "Course", FCC, "Beginner", "20h"),
     r("JavaScript track", "Exercism", "Practice", "https://exercism.org/tracks/javascript", "Beginner", "5h")],
    ["Solve 10 array challenges", "Write 5 functions without looking up syntax"], "To-Do List Web App"),
  s("dom", "DOM Manipulation", "Beginner", 6, ["js"], "Select, create and update elements; handle events.", "The DOM is the bridge between your code and what users actually see and click.",
    [r("Manipulating documents", "MDN", "Documentation", "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/DOM_scripting", "Beginner", "3h"),
     r("Document and events", "javascript.info", "Documentation", "https://javascript.info/document", "Beginner", "4h")],
    ["Build a click counter", "Create a dynamic list with add/remove"], "Interactive quiz app"),
  s("async", "Async JavaScript", "Intermediate", 8, ["js"], "Callbacks, Promises, async/await and the event loop.", "Real apps wait on networks constantly — async code is how they stay responsive.",
    [r("Promises, async/await", "javascript.info", "Documentation", "https://javascript.info/async", "Intermediate", "4h"),
     r("Asynchronous JavaScript", "MDN", "Documentation", "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS", "Intermediate", "3h")],
    ["Promisify a setTimeout", "Chain 3 dependent requests"], "Quote generator with loading states"),
  s("apis", "Working with APIs", "Intermediate", 6, ["async"], "fetch, JSON, HTTP methods, status codes and error handling.", "Almost every product pulls data from APIs — this is where frontends come alive.",
    [r("Fetching data from the server", "MDN", "Documentation", "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Network_requests", "Intermediate", "2h"),
     r("HTTP overview", "MDN", "Documentation", "https://developer.mozilla.org/en-US/docs/Web/HTTP", "Intermediate", "3h")],
    ["Fetch and render a public API", "Handle loading, empty and error states"], "Weather Dashboard"),
  s("ts", "TypeScript", "Intermediate", 10, ["js"], "Static types, interfaces, generics and type narrowing.", "Most modern teams ship TypeScript — it catches bugs before users do.",
    [r("TypeScript Handbook", "typescriptlang.org", "Documentation", "https://www.typescriptlang.org/docs/handbook/intro.html", "Intermediate", "8h"),
     r("TypeScript track", "Exercism", "Practice", "https://exercism.org/tracks/typescript", "Intermediate", "4h")],
    ["Type an existing JS project", "Write a generic utility function"], "Typed expense tracker"),
  s("dsa", "Data Structures & Algorithms", "Intermediate", 20, ["js"], "Arrays, hash maps, stacks, trees, sorting and Big-O.", "Problem solving is the core of technical interviews at most companies.",
    [r("CS50x", "Harvard CS50", "Course", "https://cs50.harvard.edu/x/", "Beginner", "30h"),
     r("LeetCode problem set", "LeetCode", "Practice", "https://leetcode.com/problemset/", "Intermediate", "ongoing"),
     r("HackerRank practice", "HackerRank", "Practice", "https://www.hackerrank.com/", "Beginner", "ongoing")],
    ["Solve 15 easy LeetCode problems", "Implement a stack and a queue"], "Algorithm visualizer"),
  s("python", "Python Fundamentals", "Beginner", 15, [], "Syntax, data types, functions, modules and files.", "Python is the lingua franca of data, AI and automation.",
    [r("The Python Tutorial", "python.org", "Documentation", "https://docs.python.org/3/tutorial/", "Beginner", "10h"),
     r("Python course", "Kaggle Learn", "Course", "https://www.kaggle.com/learn/python", "Beginner", "5h"),
     r("Python track", "Exercism", "Practice", "https://exercism.org/tracks/python", "Beginner", "5h")],
    ["Write 10 small scripts", "Parse a CSV file"], "CLI habit tracker"),

  // ---------- Tools ----------
  s("git", "Git & GitHub", "Beginner", 5, [], "Commits, branches, merges, pull requests and collaboration.", "Every engineering team uses version control — your GitHub is also your public résumé.",
    [r("Learn Git Branching", "learngitbranching.js.org", "Practice", "https://learngitbranching.js.org/", "Beginner", "2h"),
     r("Pro Git book", "git-scm.com", "Documentation", "https://git-scm.com/book/en/v2", "Beginner", "6h"),
     r("GitHub Skills", "GitHub", "Course", "https://skills.github.com/", "Beginner", "2h")],
    ["Open a PR on your own repo", "Resolve a merge conflict"], "Publish a project to GitHub"),
  s("devtools", "Browser DevTools", "Beginner", 3, ["html"], "Inspect, debug, profile and audit pages in the browser.", "Debugging fast is what separates juniors from productive engineers.",
    [r("Chrome DevTools docs", "Chrome for Developers", "Documentation", "https://developer.chrome.com/docs/devtools", "Beginner", "2h")],
    ["Debug a broken layout", "Set a breakpoint in a click handler"], "Performance audit of your site"),
  s("npm", "npm & Tooling", "Beginner", 3, ["js"], "Packages, scripts, bundlers and project setup.", "Modern projects are built from packages — you need to install, update and script them confidently.",
    [r("npm docs", "npm", "Documentation", "https://docs.npmjs.com/", "Beginner", "2h"),
     r("Getting started", "Vite", "Documentation", "https://vite.dev/guide/", "Beginner", "1h")],
    ["Scaffold a Vite app", "Write a custom npm script"], "Starter template repo"),
  s("linux", "Linux & Command Line", "Beginner", 6, [], "Shell navigation, permissions, processes and scripting.", "Servers, containers and cloud all run Linux — the terminal is your control room.",
    [r("Learning the shell", "LinuxCommand.org", "Course", "https://linuxcommand.org/lc3_learning_the_shell.php", "Beginner", "5h")],
    ["Write a bash backup script", "Manage file permissions"], "Automated setup script"),

  // ---------- Frontend framework ----------
  s("react", "React", "Intermediate", 15, ["js", "dom"], "Components, props, JSX and rendering lists.", "React is the most requested frontend skill in job listings worldwide.",
    [r("Learn React", "react.dev", "Documentation", "https://react.dev/learn", "Intermediate", "10h"),
     r("React course", "The Odin Project", "Course", ODIN, "Intermediate", "15h"),
     r("freeCodeCamp channel", "YouTube", "Video", "https://www.youtube.com/@freecodecamp", "Beginner", "4h")],
    ["Build 5 small components", "Render a filtered list"], "Movie Search Dashboard"),
  s("hooks", "React Hooks", "Intermediate", 6, ["react"], "useState, useEffect, useMemo, custom hooks.", "Hooks are how modern React handles state and side effects.",
    [r("Managing state", "react.dev", "Documentation", "https://react.dev/learn/managing-state", "Intermediate", "3h"),
     r("Escape hatches (effects)", "react.dev", "Documentation", "https://react.dev/learn/escape-hatches", "Intermediate", "3h")],
    ["Write a useLocalStorage hook", "Debounce a search input"], "Pomodoro timer"),
  s("state", "State Management", "Intermediate", 6, ["hooks"], "Context, reducers and server state with query libraries.", "As apps grow, predictable state is what keeps them maintainable.",
    [r("Scaling up with reducer and context", "react.dev", "Documentation", "https://react.dev/learn/scaling-up-with-reducer-and-context", "Intermediate", "2h"),
     r("TanStack Query docs", "TanStack", "Documentation", "https://tanstack.com/query/latest/docs/framework/react/overview", "Intermediate", "3h")],
    ["Move prop-drilled state into context", "Cache API data with a query library"], "Shopping cart"),
  s("routing", "Routing", "Intermediate", 4, ["react"], "Client-side routes, params, layouts and navigation.", "Every multi-page app needs routing — it shapes how users move through your product.",
    [r("TanStack Router docs", "TanStack", "Documentation", "https://tanstack.com/router/latest/docs/framework/react/overview", "Intermediate", "3h")],
    ["Add a detail page with params", "Build a 404 page"], "Multi-page blog"),
  s("testing", "Testing", "Intermediate", 6, ["react"], "Unit and component tests with Vitest and Testing Library.", "Tested code ships with confidence — a strong signal in code reviews and interviews.",
    [r("Vitest guide", "Vitest", "Documentation", "https://vitest.dev/guide/", "Intermediate", "2h"),
     r("Testing Library docs", "Testing Library", "Documentation", "https://testing-library.com/docs/", "Intermediate", "3h")],
    ["Test a form component", "Mock a fetch call"], "Tested component library"),

  // ---------- Real-world / backend ----------
  s("rest", "REST APIs", "Intermediate", 6, ["apis"], "Resources, verbs, status codes, pagination and API design.", "Frontends and backends speak REST — designing and consuming it well is essential.",
    [r("HTTP request methods", "MDN", "Documentation", "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods", "Intermediate", "1h"),
     r("Back End Development and APIs", "freeCodeCamp", "Course", FCC, "Intermediate", "15h")],
    ["Design endpoints for a notes app", "Implement pagination"], "Notes app with a REST backend"),
  s("auth", "Authentication", "Intermediate", 6, ["rest"], "Sessions, JWTs, OAuth and protecting routes.", "Nearly every real product has users — securing them is non-negotiable.",
    [r("Introduction to JWT", "jwt.io", "Documentation", "https://jwt.io/introduction", "Intermediate", "1h"),
     r("Authentication cheat sheet", "OWASP", "Documentation", "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html", "Intermediate", "2h")],
    ["Add login to an app", "Protect a private route"], "Private journal app"),
  s("deploy", "Deployment", "Beginner", 3, ["git"], "Hosting, environment variables, CI and custom domains.", "A project nobody can open doesn't count — shipping is a skill.",
    [r("Vercel docs", "Vercel", "Documentation", "https://vercel.com/docs", "Beginner", "1h"),
     r("GitHub Pages", "GitHub Docs", "Documentation", "https://docs.github.com/en/pages", "Beginner", "1h")],
    ["Deploy a static site", "Set up a preview deploy"], "Live portfolio on a custom domain"),
  s("node", "Node.js & Express", "Intermediate", 12, ["js"], "Servers, routing, middleware and file systems.", "Node lets you use JavaScript on the server — the fastest path to full-stack.",
    [r("Learn Node.js", "nodejs.org", "Documentation", "https://nodejs.org/en/learn", "Intermediate", "6h"),
     r("Express getting started", "Express", "Documentation", "https://expressjs.com/en/starter/installing.html", "Intermediate", "3h")],
    ["Build a JSON API", "Write custom middleware"], "URL shortener API"),
  s("sql", "SQL & Databases", "Beginner", 10, [], "Tables, queries, joins, indexes and modelling.", "Data lives in databases — SQL is one of the most transferable skills in tech.",
    [r("SQLBolt", "SQLBolt", "Practice", "https://sqlbolt.com/", "Beginner", "3h"),
     r("PostgreSQL tutorial", "postgresql.org", "Documentation", "https://www.postgresql.org/docs/current/tutorial.html", "Beginner", "5h"),
     r("Intro to SQL", "Kaggle Learn", "Course", "https://www.kaggle.com/learn/intro-to-sql", "Beginner", "3h")],
    ["Write 20 queries on a sample DB", "Design a schema for a library"], "Library management database"),
  s("security-basics", "Web Security Basics", "Intermediate", 5, ["rest"], "OWASP Top 10, XSS, CSRF, injection and secure defaults.", "Security bugs are expensive — every engineer is expected to avoid the common ones.",
    [r("OWASP Top 10", "OWASP", "Documentation", "https://owasp.org/www-project-top-ten/", "Intermediate", "3h")],
    ["Find an XSS bug in a toy app", "Sanitize user input"], "Security-hardened form"),

  // ---------- Data / AI ----------
  s("stats", "Statistics & Probability", "Beginner", 12, [], "Distributions, hypothesis testing and descriptive stats.", "Stats lets you tell signal from noise — the backbone of data and ML work.",
    [r("Statistics and probability", "Khan Academy", "Course", "https://www.khanacademy.org/math/statistics-probability", "Beginner", "15h"),
     r("3Blue1Brown", "YouTube", "Video", "https://www.youtube.com/@3blue1brown", "Intermediate", "3h")],
    ["Compute mean/median/std by hand", "Run an A/B test analysis"], "A/B test report"),
  s("excel", "Spreadsheets", "Beginner", 5, [], "Formulas, pivot tables, lookups and charts.", "Spreadsheets are still the most-used analytics tool in every company.",
    [r("Excel help & learning", "Microsoft", "Documentation", "https://support.microsoft.com/en-us/excel", "Beginner", "4h")],
    ["Build a pivot table", "Use XLOOKUP across sheets"], "Personal budget dashboard"),
  s("pandas", "Pandas & Data Wrangling", "Intermediate", 10, ["python"], "DataFrames, cleaning, grouping and merging data.", "Real data is messy — cleaning it is 80% of analytics work.",
    [r("Pandas course", "Kaggle Learn", "Course", "https://www.kaggle.com/learn/pandas", "Intermediate", "4h"),
     r("Getting started", "pandas", "Documentation", "https://pandas.pydata.org/docs/getting_started/index.html", "Intermediate", "3h")],
    ["Clean a messy CSV", "Group and aggregate sales data"], "Exploratory analysis notebook"),
  s("viz", "Data Visualization", "Intermediate", 6, ["pandas"], "Charts, dashboards and storytelling with data.", "Insights only matter when stakeholders understand them.",
    [r("Data Visualization", "Kaggle Learn", "Course", "https://www.kaggle.com/learn/data-visualization", "Beginner", "4h"),
     r("Power BI training", "Microsoft Learn", "Course", "https://learn.microsoft.com/en-us/training/powerplatform/power-bi", "Intermediate", "6h")],
    ["Recreate 3 charts from the news", "Build a one-page dashboard"], "Sales insights dashboard"),
  s("ml", "Machine Learning", "Intermediate", 20, ["python", "stats"], "Regression, classification, evaluation and feature engineering.", "ML is the foundation for every AI product.",
    [r("Intro to Machine Learning", "Kaggle Learn", "Course", "https://www.kaggle.com/learn/intro-to-machine-learning", "Beginner", "3h"),
     r("scikit-learn tutorials", "scikit-learn", "Documentation", "https://scikit-learn.org/stable/tutorial/index.html", "Intermediate", "6h")],
    ["Train and evaluate 3 models", "Do a Kaggle competition"], "House price predictor"),
  s("dl", "Deep Learning", "Advanced", 25, ["ml"], "Neural networks, PyTorch, CNNs and transformers.", "Deep learning powers vision, speech and language models.",
    [r("Practical Deep Learning", "fast.ai", "Course", "https://course.fast.ai/", "Intermediate", "20h"),
     r("PyTorch tutorials", "PyTorch", "Documentation", "https://pytorch.org/tutorials/", "Advanced", "8h")],
    ["Train an image classifier", "Fine-tune a pretrained model"], "Image classifier web demo"),
  s("llm", "LLMs & GenAI Apps", "Advanced", 12, ["dl"], "Transformers, prompting, embeddings and RAG pipelines.", "GenAI is the fastest-growing area of AI hiring.",
    [r("Hugging Face Learn", "Hugging Face", "Course", "https://huggingface.co/learn", "Intermediate", "10h")],
    ["Build a prompt evaluation set", "Embed and search documents"], "Chat-with-your-notes RAG app"),

  // ---------- Cloud / DevOps / Security ----------
  s("networking", "Networking Fundamentals", "Beginner", 8, [], "TCP/IP, DNS, HTTP, subnets and firewalls.", "Every system talks over a network — debugging starts here.",
    [r("Professor Messer Network+", "Professor Messer", "Video", "https://www.professormesser.com/", "Beginner", "10h"),
     r("NetworkChuck", "YouTube", "Video", "https://www.youtube.com/@NetworkChuck", "Beginner", "3h")],
    ["Trace a DNS lookup", "Subnet a /24 network"], "Home lab network diagram"),
  s("docker", "Docker & Containers", "Intermediate", 8, ["linux"], "Images, containers, volumes and compose.", "Containers are how modern software is packaged and shipped.",
    [r("Docker get started", "Docker", "Documentation", "https://docs.docker.com/get-started/", "Intermediate", "4h")],
    ["Containerize a Node app", "Write a docker-compose file"], "Containerized full-stack app"),
  s("k8s", "Kubernetes", "Advanced", 12, ["docker"], "Pods, deployments, services and scaling.", "Kubernetes runs production workloads at most large companies.",
    [r("Kubernetes basics", "kubernetes.io", "Course", "https://kubernetes.io/docs/tutorials/kubernetes-basics/", "Advanced", "5h")],
    ["Deploy an app to a local cluster", "Configure a rolling update"], "Auto-scaling microservice"),
  s("cicd", "CI/CD", "Intermediate", 5, ["git"], "Automated tests, builds and deploys with pipelines.", "Automated delivery is how teams ship many times a day safely.",
    [r("GitHub Actions docs", "GitHub Docs", "Documentation", "https://docs.github.com/en/actions", "Intermediate", "3h")],
    ["Run tests on every PR", "Auto-deploy main branch"], "CI pipeline for your portfolio"),
  s("aws", "Cloud Platforms (AWS)", "Intermediate", 15, ["networking", "linux"], "Compute, storage, IAM, networking and billing.", "Cloud skills are among the highest-paid in tech.",
    [r("AWS Skill Builder (free tier)", "AWS", "Course", "https://skillbuilder.aws/", "Intermediate", "10h")],
    ["Host a static site on S3", "Create least-privilege IAM roles"], "Serverless image uploader"),
  s("iac", "Infrastructure as Code", "Advanced", 8, ["aws"], "Terraform, state, modules and reproducible environments.", "IaC makes infrastructure reviewable, repeatable and safe.",
    [r("Terraform tutorials", "HashiCorp", "Course", "https://developer.hashicorp.com/terraform/tutorials", "Intermediate", "6h")],
    ["Provision a VM with Terraform", "Write a reusable module"], "One-command cloud environment"),
  s("seclabs", "Offensive Security Labs", "Intermediate", 20, ["networking", "linux"], "Recon, exploitation and defense in hands-on labs.", "Hands-on lab experience is what security hiring managers look for.",
    [r("TryHackMe", "TryHackMe", "Practice", "https://tryhackme.com/", "Beginner", "ongoing"),
     r("Security+ course", "Professor Messer", "Video", "https://www.professormesser.com/", "Intermediate", "20h")],
    ["Complete 10 beginner rooms", "Write up one CTF solution"], "Vulnerability assessment report"),

  // ---------- Design ----------
  s("design-basics", "Design Fundamentals", "Beginner", 8, [], "Typography, color, spacing, hierarchy and grids.", "Good fundamentals make every screen you design feel intentional.",
    [r("Learn design", "Figma", "Course", "https://www.figma.com/resources/learn-design/", "Beginner", "5h"),
     r("Laws of UX", "lawsofux.com", "Documentation", "https://lawsofux.com/", "Beginner", "2h")],
    ["Redesign a cluttered screen", "Build a type scale"], "Brand style guide"),
  s("figma", "Figma", "Beginner", 6, ["design-basics"], "Frames, auto layout, components and prototyping.", "Figma is the industry-standard design tool.",
    [r("Figma for beginners", "Figma", "Course", "https://help.figma.com/hc/en-us/sections/30880632542743-Figma-Design-for-beginners", "Beginner", "4h")],
    ["Build a button component set", "Prototype a 3-screen flow"], "Mobile app prototype"),
  s("research", "User Research", "Intermediate", 6, ["design-basics"], "Interviews, usability tests, personas and synthesis.", "Research is how designers prove decisions rather than guess.",
    [r("Laws of UX", "lawsofux.com", "Documentation", "https://lawsofux.com/", "Beginner", "2h")],
    ["Run 3 user interviews", "Write a usability test plan"], "UX case study"),
  s("design-systems", "Design Systems", "Advanced", 8, ["figma"], "Tokens, components, documentation and governance.", "Design systems let teams scale quality across products.",
    [r("Design systems 101", "Figma", "Documentation", "https://www.figma.com/blog/design-systems-101-what-is-a-design-system/", "Intermediate", "2h")],
    ["Define color and spacing tokens", "Document 5 components"], "Mini design system"),

  // ---------- Career ----------
  s("portfolio", "Portfolio", "Beginner", 6, [], "A polished site showcasing your best 3–4 projects.", "Your portfolio is proof — recruiters look at work before résumés.",
    [r("Frontend Mentor challenges", "Frontend Mentor", "Practice", "https://www.frontendmentor.io/challenges", "Beginner", "4h")],
    ["Write a case study for one project", "Get feedback from 3 people"], "Personal portfolio site", "career"),
  s("resume", "Resume", "Beginner", 3, [], "A one-page, impact-focused technical résumé.", "A strong résumé gets you past the 6-second screen.",
    [r("Resume guide", "Tech Interview Handbook", "Documentation", "https://www.techinterviewhandbook.org/resume/", "Beginner", "2h")],
    ["Rewrite bullets with metrics", "Tailor to one job post"], "Targeted résumé", "career"),
  s("github-profile", "GitHub Profile", "Beginner", 2, ["git"], "Pinned repos, READMEs and a profile README.", "Hiring managers check GitHub — make it tell your story.",
    [r("Managing your profile README", "GitHub Docs", "Documentation", "https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme", "Beginner", "1h")],
    ["Write READMEs for 3 repos", "Pin your best work"], "Profile README", "career"),
  s("interview", "Interview Preparation", "Intermediate", 10, [], "Behavioral stories, technical questions and mock interviews.", "Interviewing is a skill of its own — practice converts skills into offers.",
    [r("Tech Interview Handbook", "Tech Interview Handbook", "Documentation", TIH, "Intermediate", "6h"),
     r("LeetCode problem set", "LeetCode", "Practice", "https://leetcode.com/problemset/", "Intermediate", "ongoing")],
    ["Prepare 5 STAR stories", "Do 2 mock interviews"], "Interview prep doc", "career"),
];

export const SKILLS: Record<string, Skill> = Object.fromEntries(list.map((k) => [k.id, k]));
