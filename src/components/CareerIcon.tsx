import { Layout, Server, Layers, Brain, BarChart3, Shield, PenTool, Cloud, Workflow, Sparkles } from "lucide-react";

const map = { Layout, Server, Layers, Brain, BarChart3, Shield, PenTool, Cloud, Workflow };

export function CareerIcon({ name, className }: { name: string; className?: string }) {
  const I = map[name as keyof typeof map] ?? Sparkles;
  return <I className={className} />;
}
