import { useEffect, useRef, useState } from "react";
import { Sparkles, X, Send } from "lucide-react";
import { useStore } from "@/lib/store";
import { answer, SUGGESTIONS } from "@/lib/assistant";

interface Msg { role: "user" | "ai"; text: string }

function Rich({ text }: { text: string }) {
  return (
    <div className="space-y-1 whitespace-pre-wrap">
      {text.split("\n").map((line, i) => (
        <p key={i}>
          {line.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
            part.startsWith("**") ? <strong key={j}>{part.slice(2, -2)}</strong> : <span key={j}>{part}</span>,
          )}
        </p>
      ))}
    </div>
  );
}

export function Assistant() {
  const { profile, completed, projectsDone } = useStore();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => end.current?.scrollIntoView({ behavior: "smooth" }), [msgs, thinking]);

  const ask = (q: string) => {
    if (!q.trim()) return;
    setMsgs((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { role: "ai", text: answer(q, profile, completed, projectsDone) }]);
      setThinking(false);
    }, 550);
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open AI career assistant"
        className="btn btn-primary fixed bottom-24 right-4 z-50 h-14 w-14 !p-0 shadow-xl md:bottom-6 md:right-6"
      >
        {open ? <X className="h-5 w-5" /> : <Sparkles className="h-5 w-5 text-signal" />}
      </button>
      {open && (
        <div className="card-soft fade-up fixed bottom-40 right-4 z-50 flex h-[min(560px,70vh)] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden md:bottom-24 md:right-6">
          <div className="surface-ink flex items-center gap-3 px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-signal-soft">
              <Sparkles className="h-4 w-4 text-signal" />
            </div>
            <div>
              <div className="text-sm font-semibold">Career Assistant</div>
              <div className="text-xs text-ink-muted">Knows your {profile.careerTitle} roadmap</div>
            </div>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
            {msgs.length === 0 && (
              <div className="space-y-2">
                <p className="text-muted-foreground">Ask anything about your path. Try:</p>
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => ask(s)} className="block w-full rounded-xl border bg-background px-3 py-2 text-left text-sm transition hover:border-signal">
                    {s}
                  </button>
                ))}
              </div>
            )}
            {msgs.map((m, i) => (
              <div key={i} className={`fade-up max-w-[88%] rounded-2xl px-3 py-2 ${m.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-secondary"}`}>
                <Rich text={m.text} />
              </div>
            ))}
            {thinking && <div className="w-16 animate-pulse rounded-2xl bg-secondary px-3 py-2">···</div>}
            <div ref={end} />
          </div>
          <form onSubmit={(e) => { e.preventDefault(); ask(input); }} className="flex gap-2 border-t p-3">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about your roadmap…" className="flex-1 rounded-full border bg-background px-4 py-2 text-sm outline-none focus:border-signal" />
            <button className="btn btn-signal !p-2.5" aria-label="Send"><Send className="h-4 w-4" /></button>
          </form>
        </div>
      )}
    </>
  );
}
