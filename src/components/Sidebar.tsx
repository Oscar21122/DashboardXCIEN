import { LEVELS, type LevelKey } from "@/lib/levels";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { NodeRow } from "@/types";

interface SidebarProps {
  nodes: NodeRow[];
  regions: string[];
  selRegions: Set<string>;
  selNodes: Set<string>;
  selLevels: Set<LevelKey>;
  onToggleRegion: (r: string) => void;
  onToggleNode: (id: string) => void;
  onToggleLevel: (l: LevelKey) => void;
  onClear: () => void;
  isDefault: boolean;
  meta: string;
}

const LEVEL_HINT: Record<LevelKey, string> = { green: "< 60%", amber: "60–80%", red: "> 80%" };

export function Sidebar(props: SidebarProps) {
  const availNodes = props.nodes.filter((n) => props.selRegions.has(n.region));
  const selectedVisible = availNodes.filter((n) => props.selNodes.has(n.id)).length;

  return (
    <aside className="w-[272px] flex-[0_0_272px] bg-gradient-to-b from-[#0C1210] to-[#0A0E0D] border-r border-line flex flex-col sticky top-0 h-screen">
      {/* marca */}
      <div className="flex items-center gap-3 px-[22px] pt-[22px] pb-[18px] border-b border-line">
        <div className="w-[34px] h-[34px] rounded-[9px] flex-[0_0_34px] grid place-items-center border border-xgreen/35 shadow-[0_0_22px_rgba(61,214,61,0.18)]"
             style={{ background: "radial-gradient(120% 120% at 30% 20%,#1b3a26,#0c1a12)" }}>
          <span className="w-[13px] h-[13px] rounded-full bg-xgreen shadow-[0_0_12px_#3DD63D]" />
        </div>
        <div>
          <strong className="font-disp text-[17px] tracking-[0.02em] block leading-none">XCIEN</strong>
          <em className="not-italic text-dim text-xs tracking-[0.04em]">Capacidad</em>
        </div>
      </div>

      {/* scroll de filtros */}
      <div className="flex-1 overflow-y-auto px-[18px] pt-[18px] pb-2.5">
        {/* Región */}
        <div className="mb-6">
          <div className="flex justify-between items-baseline mb-[11px]">
            <span className="font-disp text-[11px] font-semibold tracking-[0.14em] uppercase text-dim">Región</span>
          </div>
          <div className="flex flex-wrap gap-[7px]">
            {props.regions.map((r) => {
              const on = props.selRegions.has(r);
              return (
                <button
                  key={r}
                  onClick={() => props.onToggleRegion(r)}
                  className={
                    "font-medium text-[12.5px] leading-none rounded-[7px] px-[13px] py-2 border transition-colors " +
                    (on
                      ? "bg-xgreen/[0.12] border-xgreen/50 text-[#bdf5bd]"
                      : "bg-panel-2 border-line text-dim hover:text-txt hover:border-line-2")
                  }
                >
                  {r}
                </button>
              );
            })}
          </div>
        </div>

        {/* Nodo */}
        <div className="mb-6">
          <div className="flex justify-between items-baseline mb-[11px]">
            <span className="font-disp text-[11px] font-semibold tracking-[0.14em] uppercase text-dim">Nodo</span>
            <em className="not-italic text-[11px] text-faint font-mono">
              {selectedVisible === props.nodes.length ? "todos" : `${selectedVisible} sel.`}
            </em>
          </div>
          <div className="flex flex-col gap-0.5 max-h-[235px] overflow-y-auto -mx-1.5 px-1.5">
            {availNodes.map((n) => {
              const on = props.selNodes.has(n.id);
              return (
                <label
                  key={n.id}
                  className="flex items-center gap-2.5 px-2 py-[7px] rounded-[7px] cursor-pointer hover:bg-panel-2 transition-colors"
                >
                  <Checkbox checked={on} onCheckedChange={() => props.onToggleNode(n.id)} />
                  <span className={"font-mono text-[12.5px] " + (on ? "text-txt" : "text-dim")}>{n.id}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Nivel de saturación */}
        <div className="mb-6">
          <div className="flex justify-between items-baseline mb-[11px]">
            <span className="font-disp text-[11px] font-semibold tracking-[0.14em] uppercase text-dim">
              Nivel de saturación
            </span>
          </div>
          <div className="flex flex-col gap-[7px]">
            {(Object.keys(LEVELS) as LevelKey[]).map((k) => {
              const L = LEVELS[k];
              const on = props.selLevels.has(k);
              return (
                <button
                  key={k}
                  onClick={() => props.onToggleLevel(k)}
                  className="flex items-center gap-2.5 w-full rounded-lg px-3 py-[9px] border text-left transition-colors"
                  style={{
                    background: on ? L.soft : undefined,
                    borderColor: on ? L.color : "rgba(255,255,255,0.07)",
                  }}
                >
                  <i className="w-[9px] h-[9px] rounded-full flex-[0_0_9px]" style={{ background: L.color }} />
                  <span className="text-[13px] font-medium text-txt">{L.label}</span>
                  <em className="not-italic ml-auto font-mono text-[11.5px]" style={{ color: on ? L.color : "#646E68" }}>
                    {LEVEL_HINT[k]}
                  </em>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* pie */}
      <div className="px-[18px] pt-3.5 pb-[18px] border-t border-line">
        <Button variant="outline" className="w-full" disabled={props.isDefault} onClick={props.onClear}>
          Limpiar filtros
        </Button>
        <div className="mt-[13px] text-[11px] text-faint font-mono flex items-center gap-[7px]">
          <i className="w-[7px] h-[7px] rounded-full bg-xgreen shadow-[0_0_8px_#3DD63D] animate-pulse2" />
          <span>{props.meta}</span>
        </div>
      </div>
    </aside>
  );
}
