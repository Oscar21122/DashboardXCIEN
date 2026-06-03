import { Card } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { PanelHead } from "@/components/PanelHead";
import { BarList } from "@/components/BarList";
import { LevelPill } from "@/components/LevelPill";
import { LEVELS, levelOf } from "@/lib/levels";
import type { NodeRow } from "@/types";

export function AccessByNode({ nodes }: { nodes: NodeRow[] }) {
  const sorted = [...nodes].sort((a, b) => b.accPct - a.accPct);
  return (
    <Card>
      <PanelHead
        kicker="Acceso · λ por nodo"
        title="Saturación de acceso por nodo"
        hint="Ordenado por ocupación · línea punteada = umbral 70%"
      />
      <div className="p-[18px]">
        <div className="grid gap-[22px] items-start grid-cols-[minmax(290px,0.7fr)_minmax(500px,1.4fr)] max-[1180px]:grid-cols-1">
          <BarList items={sorted.map((n) => ({ label: n.id, pct: n.accPct }))} />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nodo</TableHead>
                <TableHead>Región</TableHead>
                <TableHead className="text-right">OADMs</TableHead>
                <TableHead className="text-right">λ cap.</TableHead>
                <TableHead className="text-right">Clientes</TableHead>
                <TableHead className="text-right">% ocup.</TableHead>
                <TableHead>Nivel</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-faint italic py-6">
                    Sin nodos para los filtros.
                  </TableCell>
                </TableRow>
              ) : (
                sorted.map((n) => {
                  const lv = levelOf(n.accPct);
                  return (
                    <TableRow key={n.id}>
                      <TableCell className="font-semibold">{n.id}</TableCell>
                      <TableCell className="text-dim">{n.region}</TableCell>
                      <TableCell className="text-right font-mono">{n.oadms}</TableCell>
                      <TableCell className="text-right font-mono">
                        {n.clients}/{n.lambdaCap}
                      </TableCell>
                      <TableCell className="text-right font-mono">{n.clients}</TableCell>
                      <TableCell className="text-right font-mono font-semibold" style={{ color: LEVELS[lv].color }}>
                        {n.accPct}%
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
        </div>
      </div>
    </Card>
  );
}
