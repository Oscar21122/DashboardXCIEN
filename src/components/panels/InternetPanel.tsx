import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { PanelHead } from "@/components/PanelHead";
import { LEVELS, levelOf } from "@/lib/levels";
import type { DrpRow } from "@/types";

export function InternetPanel({ drp, egrReq }: { drp: DrpRow[]; egrReq: number | null }) {
  const used = drp.reduce((s, d) => s + d.used, 0);
  const cap = drp.reduce((s, d) => s + d.cap, 0);
  const pct = cap ? Math.round((used / cap) * 100) : 0;

  return (
    <Card>
      <PanelHead kicker="Salida a Internet · DRP" title="Salidas a Internet" />
      <CardContent>
        <Table className="[&_td]:px-[11px] [&_td]:py-2.5 [&_th]:px-[11px] [&_th]:py-2">
          <TableHeader>
            <TableRow>
              <TableHead>Salida</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead className="text-right">Cap.</TableHead>
              <TableHead className="text-right">Uso</TableHead>
              <TableHead>Ocupación</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {drp.map((d) => {
              const color = LEVELS[levelOf(d.pct)].color;
              return (
                <TableRow key={d.id}>
                  <TableCell className="font-semibold font-mono">{d.id}</TableCell>
                  <TableCell className="text-dim">{d.type}</TableCell>
                  <TableCell className="text-right font-mono">{d.cap}G</TableCell>
                  <TableCell className="text-right font-mono">{d.used}G</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <div className="relative flex-1 h-[7px] rounded bg-white/[0.06] overflow-hidden min-w-[80px]">
                        <span className="absolute left-0 top-0 h-full rounded" style={{ width: `${d.pct}%`, background: color }} />
                        <span className="absolute left-[70%] -top-0.5 -bottom-0.5 w-px thr-line" />
                      </div>
                      <b className="font-mono text-[12.5px] w-9 text-right" style={{ color }}>
                        {d.pct}%
                      </b>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <div className="flex items-baseline gap-3 mt-3.5 px-3.5 py-3 bg-panel-2 border border-line rounded-[10px]">
          <span className="font-disp text-[11px] tracking-[0.08em] uppercase text-dim font-semibold whitespace-nowrap">
            Total salida
          </span>
          <b className="font-mono text-sm whitespace-nowrap">
            {used.toFixed(1)} / {cap.toFixed(0)} Gbps
          </b>
          <span className="ml-auto font-mono text-[11.5px] text-faint text-right">
            {cap}G instalados · {pct}% de uso
            {egrReq != null ? ` · requerido ≈ ${egrReq.toFixed(1)}G` : ""}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
