import { LEVELS, levelOf, TH_GROW } from "@/lib/levels";

export interface BarItem {
  label: string;
  pct: number;
}

/** Barras horizontales con código de color y línea de umbral (70%). */
export function BarList({ items }: { items: BarItem[] }) {
  return (
    <div className="relative pt-5">
      {/* rejilla 0/25/50/75/100 */}
      <div className="pointer-events-none absolute left-[96px] right-[42px] top-0 bottom-0">
        {[0, 25, 50, 75, 100].map((g) => (
          <div key={g} className="absolute top-[18px] bottom-2 w-px bg-white/[0.05]" style={{ left: `${g}%` }}>
            <em className="absolute -top-[17px] left-1/2 -translate-x-1/2 font-mono text-[10px] not-italic text-faint">
              {g}
            </em>
          </div>
        ))}
      </div>

      <div className="relative flex flex-col gap-[9px]">
        {/* umbral 70% */}
        <div
          className="absolute top-1.5 bottom-2 w-0 border-l-[1.5px] border-dashed border-white/50 z-[2]"
          style={{ left: `calc(96px + ${TH_GROW / 100} * (100% - 146px))` }}
        >
          <em className="absolute -top-0.5 left-1.5 font-mono text-[10px] not-italic text-white/65 whitespace-nowrap bg-panel px-[3px]">
            {TH_GROW}% · umbral
          </em>
        </div>

        {items.length === 0 && (
          <div className="text-center text-faint py-6 italic">Sin datos para los filtros.</div>
        )}

        {items.map((it) => {
          const L = LEVELS[levelOf(it.pct)];
          return (
            <div
              key={it.label}
              className="grid items-center gap-2 py-0.5"
              style={{ gridTemplateColumns: "88px 1fr 42px" }}
            >
              <div className="font-mono text-xs text-dim text-right truncate" title={it.label}>
                {it.label}
              </div>
              <div className="h-[18px] rounded-[5px] bg-white/[0.05] overflow-hidden">
                <span
                  className="block h-full rounded-[5px] transition-[width] duration-500"
                  style={{ width: `${it.pct}%`, background: L.color }}
                />
              </div>
              <div className="font-mono text-[12.5px] font-semibold text-right" style={{ color: L.color }}>
                {it.pct}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
