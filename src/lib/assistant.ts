import { buildRoadmap, computeStats, todaysPlan, type Profile } from "./careers";

/**
 * Local roadmap-aware assistant. Answers from the user's real roadmap + progress.
 * Structured so a server-side AI model can replace `answer()` later.
 */
export function answer(q: string, profile: Profile, completed: string[], projectsDone: string[]): string {
  const text = q.toLowerCase();
  const { items, career } = buildRoadmap(profile, completed);
  const stats = computeStats(profile, completed, projectsDone);
  const next = stats.next;
  const mentioned = items.find((i) => text.includes(i.name.toLowerCase().split(" ")[0].toLowerCase()) && i.name.length > 2);

  if (/why/.test(text) && mentioned) {
    const status = mentioned.status === "done" || mentioned.status === "skipped" ? "You've already covered it ✓" : `It's step ${mentioned.index} on your roadmap (${mentioned.stage}).`;
    return `**Why ${mentioned.name}?**\n${mentioned.why}\n\n${status} Expect about ${mentioned.hours}h. Start with "${mentioned.resources[0]?.name}" on ${mentioned.resources[0]?.platform}.`;
  }

  const timeMatch = text.match(/(\d+(?:\.\d+)?)\s*(hour|hr|h\b|min)/);
  if (timeMatch) {
    const n = parseFloat(timeMatch[1]);
    const minutes = timeMatch[2].startsWith("min") ? n : n * 60;
    const plan = todaysPlan({ ...profile, minutesPerDay: minutes }, next);
    return `Here's a focused ${minutes}-minute session:\n\n${plan.map((p) => `• ${p.minutes} min — ${p.label}`).join("\n")}\n\nThat keeps your streak alive and moves ${next?.name ?? "your portfolio"} forward.`;
  }

  if (/project|build/.test(text)) {
    const doneIds = new Set(items.filter((i) => i.status === "done" || i.status === "skipped").map((i) => i.id));
    const fit = career.projects
      .filter((p) => !projectsDone.includes(p.id))
      .map((p) => ({ p, ready: p.skills.filter((s) => doneIds.has(s)).length / p.skills.length }))
      .sort((a, b) => b.ready - a.ready)[0];
    if (!fit) return "You've completed every recommended project 🎉 Consider contributing to open source next.";
    return `Try **${fit.p.title}** (${fit.p.difficulty}, ~${fit.p.hours}h). You already have ${Math.round(fit.ready * 100)}% of the skills it needs.\n\n${fit.p.problem}\n\nKey features: ${fit.p.features.slice(0, 3).join(", ")}.`;
  }

  if (/intern|ready|job|hire/.test(text)) {
    const verdict = stats.readiness >= 75 ? "Yes — you're in a strong position to apply." : stats.readiness >= 50 ? "You're close. Start applying to internships while you finish the next few skills." : "Not quite yet — focus on fundamentals and one solid project first.";
    const weakest = [...stats.breakdown].sort((a, b) => a.value - b.value)[0];
    return `Your ${career.title} readiness is **${stats.readiness}/100**. ${verdict}\n\nWeakest area: ${weakest.label} (${weakest.value}%). Biggest boost: ${stats.boosts[0]?.label ?? "keep going"} (+${stats.boosts[0]?.gain ?? 0}%).`;
  }

  if (/next|learn|start|what should/.test(text) || !mentioned) {
    if (!next) return "You've finished your roadmap! Polish your portfolio and start applying.";
    const after = items.filter((i) => i.status === "upcoming").slice(0, 2).map((i) => i.name);
    return `Next up: **${next.name}** (${next.difficulty}, ~${next.hours}h).\n\n${next.why}\n\nLearn → ${next.resources[0]?.name}\nPractice → ${next.practice[0]}\nBuild → ${next.build}\n\nAfter that: ${after.join(" → ") || "career prep"}.`;
  }

  return `${mentioned.name}: ${mentioned.desc} ${mentioned.why}`;
}

export const SUGGESTIONS = [
  "What should I learn next?",
  "Why do I need React?",
  "I have only 1 hour today. What should I study?",
  "Suggest a project based on my skills.",
  "Am I ready for an internship?",
];
