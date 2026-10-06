import { Link } from "@tanstack/react-router";
import { Home, Map, Hammer, TrendingUp, User, Compass, Route as RouteIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Assistant } from "./Assistant";

export function Logo({ ink = false }: { ink?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-signal text-signal-foreground">
        <RouteIcon className="h-4 w-4" />
      </span>
      <span className={ink ? "text-ink-foreground" : ""}>
        SkillPath <span className="text-signal">AI</span>
      </span>
    </Link>
  );
}

const appLinks = [
  { to: "/dashboard", label: "Today", icon: Home },
  { to: "/roadmap", label: "Roadmap", icon: Map },
  { to: "/projects", label: "Projects", icon: Hammer },
  { to: "/progress", label: "Progress", icon: TrendingUp },
  { to: "/careers", label: "Careers", icon: Compass },
] as const;

const mobileLinks = [
  { to: "/dashboard", label: "Home", icon: Home },
  { to: "/roadmap", label: "Roadmap", icon: Map },
  { to: "/projects", label: "Projects", icon: Hammer },
  { to: "/progress", label: "Progress", icon: TrendingUp },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen pb-24 md:pb-10">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Logo />
          <nav className="hidden items-center gap-1 md:flex">
            {appLinks.map((l) => (
              <Link key={l.to} to={l.to} className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition hover:text-foreground" activeProps={{ className: "!text-foreground bg-secondary" }}>
                {l.label}
              </Link>
            ))}
          </nav>
          <Link to="/profile" aria-label="Profile" className="flex h-9 w-9 items-center justify-center rounded-full border bg-card transition hover:border-signal">
            <User className="h-4 w-4" />
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 pt-8 fade-up">{children}</main>
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t bg-card/95 backdrop-blur-xl md:hidden">
        <div className="grid grid-cols-5">
          {mobileLinks.map((l) => (
            <Link key={l.to} to={l.to} className="flex flex-col items-center gap-1 py-2.5 text-[11px] text-muted-foreground" activeProps={{ className: "!text-foreground" }}>
              <l.icon className="h-5 w-5" />
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
      <Assistant />
    </div>
  );
}

export function PageHeader({ eyebrow, title, desc, action }: { eyebrow: string; title: ReactNode; desc?: string; action?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <div className="eyebrow mb-2">{eyebrow}</div>
        <h1 className="display text-4xl md:text-5xl">{title}</h1>
        {desc && <p className="mt-2 max-w-xl text-muted-foreground">{desc}</p>}
      </div>
      {action}
    </div>
  );
}
