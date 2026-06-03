import { Card, CardContent } from "@/components/ui/card";
import { PanelHead } from "@/components/PanelHead";
import { BarList } from "@/components/BarList";
import type { NodeRow, RingRow } from "@/types";

export function TransportPanels({ nodes, ring }: { nodes: NodeRow[]; ring: RingRow[] }) {
  const byNode = [...nodes].sort((a, b) => b.txPct - a.txPct).map((n) => ({ label: n.id, pct: n.txPct }));
  const byLink = [...ring].sort((a, b) => b.pct - a.pct).map((r) => ({ label: `${r.a} ↔ ${r.b}`, pct: r.pct }));
  return (
    <div className="grid grid-cols-12 gap-4 mb-4">
      <div className="col-span-6 max-[1180px]:col-span-12">
        <Card>
          <PanelHead kicker="Transporte · uplink" title="Saturación de transporte por nodo" />
          <CardContent>
            <BarList items={byNode} />
          </CardContent>
        </Card>
      </div>
      <div className="col-span-6 max-[1180px]:col-span-12">
        <Card>
          <PanelHead kicker="Transporte · anillo" title="Utilización por enlace (G.8032 / MPLS-IP)" />
          <CardContent>
            <BarList items={byLink} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
