import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { PanelHead } from "@/components/PanelHead";
import { LevelPill } from "@/components/LevelPill";
import { LEVELS, levelOf } from "@/lib/levels";
import type { OadmRow } from "@/types";

function RegionCard({ name, oadms, used, cap }: { name: string; oadms: number; used: number; cap: number }) {
  const pct = cap ? Math.round((used / cap) * 100) : 0;
  const color = LEVELS[levelOf(pct)].color;
  return (
    <div className="bg-panel-2 border border-line rounded-[10px] px-3.5 py-[13px]">
      <div className="flex justify-between items-baseline mb-[9px]">
        <span className="font-disp text-sm font-semibold">{name}</span>
        <span className="font-mono text-[15px] font-semibold" style={{ color }}>{pct}%</span>
      </div>
      <div className="relative h-[7px] rounded bg-white/[0.06] overflow-hidden">
        <span className="absolute left-0 top-0 h-full rounded" style={{ width: `${pct}%`, background: color }} />
        <span className="absolute left-[70%] -top-0.5 -bottom-0.5 w-px thr-line" />
      </div>
      <div className="flex justify-between mt-[9px] font-mono text-[11.5px] text-faint">
        <span>{oadms} OADMs</span>
        <span>{used}/{cap} λ</span>
      </div>
    </div>
  );
}

export function CwdmRegions({ oadms }: { oadms: OadmRow[] }) {
  const regs: Record<string, { oadms: number; used: number; cap: number }> = {};
  oadms.forEach((o) => {
    const r = (regs[o.region] = regs[o.region] ?? { oadms: 0, used: 0, cap: 0 });
    r.oadms++;
    r.used += o.used;
    r.cap += o.cap;
  });
  const totU = oadms.reduce((s, o) => s + o.used, 0);
  const totC = oadms.reduce((s, o) => s + o.cap, 0);
  const totP = totC ? Math.round((totU / totC) * 100) : 0;

  return (
    <Card>
      <PanelHead kicker="Acceso CWDM · resumen" title="Ocupación de λ por región" />
      <CardContent>
        <div className="grid grid-cols-2 gap-[11px]">
          {Object.entries(regs).map(([name, d]) => (
            <RegionCard key={name} name={name} {...d} />
          ))}
        </div>
        {oadms.length > 0 && (
          <div className="flex items-baseline gap-3 mt-3.5 px-3.5 py-3 bg-panel-2 border border-line rounded-[10px]">
            <span className="font-disp text-[11px] tracking-[0.08em] uppercase text-dim font-semibold whitespace-nowrap">
              Total red
            </span>
            <b className="font-mono text-sm whitespace-nowrap">
              {totU} / {totC} λ · {totP}%
            </b>
            <span className="ml-auto font-mono text-[11.5px] text-faint text-right">
              {oadms.length} OADMs · máx 9 λ por hilo
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function CwdmHot({ oadms }: { oadms: OadmRow[] }) {
  const hot = oadms.filter((o) => levelOf(o.pct) !== "green").sort((a, b) => b.pct - a.pct);
  return (
    <Card>
      <PanelHead
        kicker="Acceso CWDM · prioridad de crecimiento"
        title="OADMs en rojo / ámbar"
        hint={`${hot.length} de ${oadms.length}`}
      />
      <CardContent>
        <Table className="[&_td]:px-[11px] [&_td]:py-2 [&_th]:px-[11px] [&_th]:py-2">
          <TableHeader>
            <TableRow>
              <TableHead>OADM</TableHead>
              <TableHead>Nodo</TableHead>
              <TableHead>Región</TableHead>
              <TableHead className="text-right">λ uso</TableHead>
              <TableHead className="text-right">% ocup.</TableHead>
              <TableHead>Nivel</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hot.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-faint italic py-6">
                  Ningún OADM supera 60% con los filtros.
                </TableCell>
              </TableRow>
            ) : (
              hot.map((o) => {
                const lv = levelOf(o.pct);
                return (
                  <TableRow key={o.id}>
                    <TableCell className="font-semibold font-mono">{o.id}</TableCell>
                    <TableCell className="font-mono">{o.node}</TableCell>
                    <TableCell className="text-dim">{o.region}</TableCell>
                    <TableCell className="text-right font-mono">
                      {o.used}/{o.cap}
                    </TableCell>
                    <TableCell className="text-right font-mono font-semibold" style={{ color: LEVELS[lv].color }}>
                      {o.pct}%
                    </TableCell>
                    <TableCell>
                      <LevelPill level={lv} />
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
