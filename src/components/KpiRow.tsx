import { LEVELS, levelOf, type LevelKey } from "@/lib/levels";

interface Kpi {
  label: string;
  value: React.ReactNode;
  sub?: React.ReactNode;
  accent?: string;
  meterPct?: number;
  alert?: boolean;
}

function Meter({ pct }: { pct: number }) {
  const color = LEVELS[levelOf(pct)].color;
  return (
    <div className="relative h-1.5 rounded mt-[11px] bg-white/[0.07] overflow-hidden">
      <span className="absolute left-0 top-0 h-full rounded" style={{ width: `${pct}%`, background: color }} />
      <span className="absolute left-[70%] -top-0.5 -bottom-0.5 w-px thr-line" />
    </div>
  );
}

export function KpiRow({ items }: { items: Kpi[] }) {
  return (
    <div className="grid grid-cols-5 gap-3.5 mb-[18px] max-[1180px]:grid-cols-3">
      {items.map((k) => (
        <div
          key={k.label}
          className="rounded-xl border bg-gradient-to-b from-panel-2 to-panel p-[16px_17px] relative overflow-hidden"
          style={{ borderColor: k.alert ? "rgba(255,90,82,.28)" : undefined, borderLeft: `3px solid ${k.accent ?? "#3DD63D"}` }}
        >
          <div className="font-disp text-[11.5px] tracking-[0.1em] uppercase text-dim font-semibold">{k.label}</div>
          <div className="font-disp text-[30px] font-semibold -tracking-[0.02em] mt-[9px] mb-0.5 leading-[1.05]">
            {k.value}
          </div>
          {k.sub && <div className="text-xs text-faint font-mono">{k.sub}</div>}
          {k.meterPct != null && <Meter pct={k.meterPct} />}
        </div>
      ))}
    </div>
  );
}

export type { LevelKey };
