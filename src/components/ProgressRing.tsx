import { useEffect, useState } from "react";

export function ProgressRing({ value, size = 180, stroke = 12, label, sub, tone = "light" }: { value: number; size?: number; stroke?: number; label?: string; sub?: string; tone?: "light" | "ink" }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setV(value), 60);
    return () => clearTimeout(t);
  }, [value]);
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" role="img" aria-label={`${value}%`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} className={tone === "ink" ? "stroke-ink-border" : "stroke-secondary"} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          className="stroke-signal"
          strokeDasharray={c}
          strokeDashoffset={c - (c * v) / 100}
          style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(.2,.8,.2,1)" }}
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-4xl font-semibold tracking-tight tabular-nums" style={{ fontSize: size / 4.5 }}>
          {Math.round(v)}
          <span className="text-lg opacity-60">%</span>
        </div>
        {label && <div className={`text-xs ${tone === "ink" ? "text-ink-muted" : "text-muted-foreground"}`}>{label}</div>}
        {sub && <div className="text-[11px] opacity-60">{sub}</div>}
      </div>
    </div>
  );
}
