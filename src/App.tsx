import { useMemo, useState } from "react";
import { useNetworkData } from "@/hooks/useNetworkData";
import { levelOf, LEVELS, type LevelKey } from "@/lib/levels";
import { Sidebar } from "@/components/Sidebar";
import { KpiRow } from "@/components/KpiRow";
import { AccessByNode } from "@/components/panels/AccessByNode";
import { TransportPanels } from "@/components/panels/TransportPanels";
import { CwdmRegions, CwdmHot } from "@/components/panels/CwdmPanels";
import { InternetPanel } from "@/components/panels/InternetPanel";
import { SegmentsPanel } from "@/components/panels/SegmentsPanel";
import type { NetworkData } from "@/types";

const ALL_LEVELS: LevelKey[] = ["green", "amber", "red"];

function toggle<T>(set: Set<T>, v: T): Set<T> {
  const next = new Set(set);
  next.has(v) ? next.delete(v) : next.add(v);
  return next;
}

function Dashboard({ data }: { data: NetworkData }) {
  const allRegions = useMemo(() => [...new Set(data.nodes.map((n) => n.region))], [data]);
  const allNodeIds = useMemo(() => new Set(data.nodes.map((n) => n.id)), [data]);

  const [selRegions, setSelRegions] = useState<Set<string>>(new Set(allRegions));
  const [selNodes, setSelNodes] = useState<Set<string>>(new Set(allNodeIds));
  const [selLevels, setSelLevels] = useState<Set<LevelKey>>(new Set(ALL_LEVELS));

  const onToggleRegion = (r: string) => {
    const regions = toggle(selRegions, r);
    // sincroniza nodos visibles: conserva los de regiones activas
    const nodes = new Set<string>();
    data.nodes.forEach((n) => {
      if (regions.has(n.region)) nodes.add(n.id);
    });
    setSelRegions(regions);
    setSelNodes(nodes);
  };
  const onToggleNode = (id: string) => setSelNodes((s) => toggle(s, id));
  const onToggleLevel = (l: LevelKey) => setSelLevels((s) => toggle(s, l));
  const onClear = () => {
    setSelRegions(new Set(allRegions));
    setSelNodes(new Set(allNodeIds));
    setSelLevels(new Set(ALL_LEVELS));
  };

  const isDefault =
    selRegions.size === allRegions.length &&
    selNodes.size === allNodeIds.size &&
    selLevels.size === 3;

  // datos filtrados
  const fNodes = data.nodes.filter(
    (n) => selRegions.has(n.region) && selNodes.has(n.id) && selLevels.has(levelOf(n.accPct))
  );
  const fOadms = data.oadms.filter(
    (o) => selRegions.has(o.region) && selNodes.has(o.node) && selLevels.has(levelOf(o.pct))
  );
  const fClients = data.clients.filter((c) => selRegions.has(c.region) && selNodes.has(c.node));
  const fRing = data.ring.filter((r) => [...selRegions].some((rg) => String(r.region).includes(rg)));

  // KPIs
  const txUsed = fNodes.reduce((s, n) => s + n.txUsed, 0);
  const txCap = fNodes.reduce((s, n) => s + n.txCap, 0);
  const txPct = txCap ? Math.round((txUsed / txCap) * 100) : 0;
  const egU = data.drp.reduce((s, d) => s + d.used, 0);
  const egC = data.drp.reduce((s, d) => s + d.cap, 0);
  const egPct = egC ? Math.round((egU / egC) * 100) : 0;
  const nRed = fNodes.filter((n) => levelOf(n.accPct) === "red").length;
  const nAmb = fNodes.filter((n) => levelOf(n.accPct) === "amber").length;

  return (
    <div className="flex min-h-screen">
      <Sidebar
        nodes={data.nodes}
        regions={allRegions}
        selRegions={selRegions}
        selNodes={selNodes}
        selLevels={selLevels}
        onToggleRegion={onToggleRegion}
        onToggleNode={onToggleNode}
        onToggleLevel={onToggleLevel}
        onClear={onClear}
        isDefault={isDefault}
        meta={`${data.nodes.length} nodos · ${data.clients.length} clientes`}
      />

      <main className="flex-1 min-w-0 px-7 py-[26px] max-w-[1600px]">
        {/* topbar */}
        <div className="flex items-start justify-between gap-6 mb-[22px] flex-wrap">
          <div>
            <h1 className="font-disp text-[26px] font-semibold -tracking-[0.02em] m-0">
              Capacidad de red metropolitana
            </h1>
            <p className="text-dim text-[13px] mt-1.5 m-0">
              Saltillo · Anillo de fibra CWDM/OADM · MPLS-IP — vista administrativa de saturación
            </p>
          </div>
          <div className="flex gap-4 text-[12px] text-dim">
            {ALL_LEVELS.map((k) => (
              <div key={k} className="flex items-center gap-1.5">
                <i className="w-[9px] h-[9px] rounded-full" style={{ background: LEVELS[k].color }} />
                {LEVELS[k].label}{" "}
                <em className="not-italic text-faint font-mono">
                  {k === "green" ? "< 60%" : k === "amber" ? "60–80%" : "> 80%"}
                </em>
              </div>
            ))}
          </div>
        </div>

        <KpiRow
          items={[
            { label: "Nodos / PoPs", value: fNodes.length, sub: "anillo metropolitano", accent: "#3DD63D" },
            { label: "Clientes activos", value: fClients.length, sub: "λ dedicadas asignadas", accent: "#2DA8FF" },
            {
              label: "Transporte usado",
              value: `${txPct}%`,
              sub: `${txUsed.toFixed(1)} / ${txCap.toFixed(0)} Gbps`,
              accent: LEVELS[levelOf(txPct)].color,
              meterPct: txPct,
            },
            {
              label: "Salida a Internet",
              value: `${egPct}%`,
              sub: `${egU.toFixed(1)} / ${egC.toFixed(0)} Gbps`,
              accent: LEVELS[levelOf(egPct)].color,
              meterPct: egPct,
            },
            {
              label: "Nodos en alerta",
              value: (
                <span>
                  <b style={{ color: LEVELS.red.color }}>{nRed}</b>
                  <span className="text-faint text-[15px] font-normal"> rojos · </span>
                  <b style={{ color: LEVELS.amber.color }}>{nAmb}</b>
                  <span className="text-faint text-[15px] font-normal"> ámbar</span>
                </span>
              ),
              sub: "requieren ampliación",
              accent: "#FF5A52",
              alert: true,
            },
          ]}
        />

        <div className="mb-4">
          <AccessByNode nodes={fNodes} />
        </div>

        <TransportPanels nodes={fNodes} ring={fRing} />

        <div className="grid grid-cols-12 gap-4 mb-4">
          <div className="col-span-5 max-[1180px]:col-span-12">
            <CwdmRegions oadms={fOadms} />
          </div>
          <div className="col-span-7 max-[1180px]:col-span-12">
            <CwdmHot oadms={fOadms} />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 mb-2">
          <div className="col-span-6 max-[1180px]:col-span-12">
            <InternetPanel drp={data.drp} egrReq={data.egrReq} />
          </div>
          <div className="col-span-6 max-[1180px]:col-span-12">
            <SegmentsPanel clients={fClients} />
          </div>
        </div>

        <p className="text-center text-faint font-mono text-[11.5px] mt-3">
          XCIEN · Conectividad Inteligente — tablero administrativo de capacidad. Fuente: BD_Capacidad_XCIEN.xlsx
        </p>
      </main>
    </div>
  );
}

export default function App() {
  const { data, loading, error } = useNetworkData();

  if (loading) {
    return (
      <div className="grid place-items-center min-h-screen text-dim font-mono text-sm">
        <div className="flex items-center gap-2.5">
          <i className="w-2.5 h-2.5 rounded-full bg-xgreen animate-pulse2" />
          Cargando datos de la red…
        </div>
      </div>
    );
  }
  if (error || !data) {
    return (
      <div className="grid place-items-center min-h-screen text-xred font-mono text-sm px-6 text-center">
        No se pudo cargar BD_Capacidad_XCIEN.xlsx
        <br />
        {error}
      </div>
    );
  }
  return <Dashboard data={data} />;
}
