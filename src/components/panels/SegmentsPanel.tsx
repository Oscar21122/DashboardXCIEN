import { Card, CardContent } from "@/components/ui/card";
import { PanelHead } from "@/components/PanelHead";
import { Donut } from "@/components/Donut";
import type { ClientRow } from "@/types";

export function SegmentsPanel({ clients }: { clients: ClientRow[] }) {
  return (
    <Card>
      <PanelHead kicker="Base instalada" title="Clientes por segmento" />
      <CardContent>
        <Donut clients={clients} />
      </CardContent>
    </Card>
  );
}
