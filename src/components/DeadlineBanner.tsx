import { useState } from "react";
import { AlertCircle, X } from "lucide-react";

const deadlines = [
  "TDS Deposit (April) — 7 May 2026",
  "GSTR-1 Monthly Filing — 11 May 2026",
  "GSTR-3B Filing — 20 May 2026",
  "Q1 Advance Tax — 15 June 2026",
];

export function DeadlineBanner() {
  const [show, setShow] = useState(true);
  if (!show) return null;
  return (
    <div className="bg-gold/15 border-b border-gold/30">
      <div className="mx-auto max-w-7xl px-6 py-2.5 flex items-center gap-4">
        <div className="flex items-center gap-2 flex-shrink-0">
          <AlertCircle className="h-4 w-4 text-navy" />
          <span className="text-xs font-semibold uppercase tracking-wider text-navy">Upcoming Deadlines</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="flex gap-8 animate-[scroll_40s_linear_infinite] whitespace-nowrap text-sm text-navy/85">
            {[...deadlines, ...deadlines].map((d, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-gold" />
                {d}
              </span>
            ))}
          </div>
        </div>
        <button onClick={() => setShow(false)} aria-label="Dismiss" className="text-navy/60 hover:text-navy">
          <X className="h-4 w-4" />
        </button>
      </div>
      <style>{`@keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}
