import { SEG_COLORS } from "@/lib/levels";
import type { ClientRow } from "@/types";

const ORDER = ["Micro", "PyMe", "Empresarial", "Corporativo"];

export function Donut({ clients }: { clients: ClientRow[] }) {
  const counts: Record<string, number> = {};
  clients.forEach((c) => (counts[c.seg] = (counts[c.seg] ?? 0) + 1));
  const segs = ORDER.filter((s) => counts[s]);
  const total = clients.length || 1;
  const R = 70;
  const C = 2 * Math.PI * R;
  let off = 0;

  return (
    <div className="flex items-center gap-7">
      <svg viewBox="0 0 180 180" className="h-[178px] w-[178px] shrink-0">
        {segs.map((s) => {
          const v = counts[s];
          const len = (v / total) * C;
          const arc = (
            <circle
              key={s}
              r={R}
              cx={90}
              cy={90}
              fill="none"
              stroke={SEG_COLORS[s] ?? "#888"}
              strokeWidth={22}
              strokeDasharray={`${len} ${C - len}`}
              strokeDashoffset={-off}
              transform="rotate(-90 90 90)"
            />
          );
          off += len;
          return arc;
        })}
        <text x={90} y={88} textAnchor="middle" className="font-disp fill-txt" style={{ fontSize: 38, fontWeight: 600 }}>
          {clients.length}
        </text>
        <text x={90} y={106} textAnchor="middle" className="font-mono fill-dim" style={{ fontSize: 11, letterSpacing: "0.08em" }}>
          clientes
        </text>
      </svg>

      <ul className="flex-1 list-none m-0 p-0 flex flex-col gap-[11px]">
        {segs.length === 0 && <li className="text-dim">Sin datos</li>}
        {segs.map((s) => {
          const v = counts[s];
          return (
            <li key={s} className="flex items-center gap-2.5 text-[13px]">
              <i className="h-[11px] w-[11px] rounded-[3px] shrink-0" style={{ background: SEG_COLORS[s] ?? "#888" }} />
              <span className="flex-1">{s}</span>
              <b className="font-mono">{v}</b>
              <span className="text-dim font-mono ml-2">{Math.round((v / total) * 100)}%</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
