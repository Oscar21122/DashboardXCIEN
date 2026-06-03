import * as XLSX from "xlsx";
import { num, pctNum } from "./levels";
import type { NetworkData } from "@/types";
// El .xlsx se importa como asset de Vite (se incluye en el build).
import xlsxUrl from "@/data/BD_Capacidad_XCIEN.xlsx?url";

type Row = Record<string, unknown>;

/** Lee una hoja: fila 1 = título combinado, encabezados en fila 2 (range:1). */
function rows(wb: XLSX.WorkBook, sheet: string): Row[] {
  const ws = wb.Sheets[sheet];
  if (!ws) return [];
  return XLSX.utils.sheet_to_json<Row>(ws, { range: 1, defval: null });
}

function parseBook(wb: XLSX.WorkBook): NetworkData {
  const nodos = rows(wb, "Nodos").filter((r) => r["Hostname"]);
  const oadms = rows(wb, "OADMs").filter((r) => r["OADM_ID"]);
  const enlaces = rows(wb, "Enlaces").filter((r) => r["Nodo A"]);
  const salidas = rows(wb, "Salidas_Internet").filter(
    (r) => r["Salida"] && String(r["Salida"]).toUpperCase() !== "TOTAL"
  );
  const clientes = rows(wb, "Clientes").filter((r) => r["Cliente_ID"]);

  // "Salida a Internet requerida" desde Parametros
  let egrReq: number | null = null;
  const ws = wb.Sheets["Parametros"];
  if (ws) {
    const pr = XLSX.utils.sheet_to_json<unknown[]>(ws, { header: 1, defval: null });
    for (const r of pr) {
      if (typeof r[0] === "string" && r[0].toLowerCase().includes("requerida") && r[1] != null) {
        egrReq = Number(r[1]);
      }
    }
  }

  return {
    nodes: nodos.map((r) => ({
      id: String(r["Hostname"]),
      region: String(r["Región"]),
      oadms: num(r["OADMs"]),
      lambdaCap: num(r["λ Capacidad"]),
      clients: num(r["Clientes / λ Usadas"]),
      accPct: pctNum(r["% Ocup. Acceso"]),
      txPct: pctNum(r["% Sat. Transporte"]),
      txCap: num(r["Cap. Uplink Transp. (Gbps)"]),
      txUsed: num(r["Tráfico Comprom. (Gbps)"]),
    })),
    oadms: oadms.map((r) => ({
      id: String(r["OADM_ID"]),
      node: String(r["Nodo Hub"]),
      region: String(r["Región"]),
      cap: num(r["λ Capacidad"]),
      used: num(r["λ / Clientes Usados"]),
      pct: pctNum(r["% Ocupación"]),
    })),
    ring: enlaces.map((r) => ({
      a: String(r["Nodo A"]),
      b: String(r["Nodo B"]),
      region: String(r["Región"]),
      cap: num(r["Capacidad (Gbps)"]),
      used: num(r["Tráfico (Gbps)"]),
      pct: pctNum(r["% Utilización"]),
    })),
    drp: salidas.map((r) => ({
      id: String(r["Salida"]),
      type: String(r["Tipo"] ?? ""),
      cap: num(r["Capacidad (Gbps)"]),
      used: num(r["Tráfico (Gbps)"]),
      pct: pctNum(r["% Utilización"]),
    })),
    clients: clientes.map((r) => ({
      seg: String(r["Segmento"]),
      region: String(r["Región"]),
      node: String(r["Nodo Hub"]),
    })),
    egrReq,
  };
}

export async function loadNetworkData(): Promise<NetworkData> {
  const res = await fetch(xlsxUrl);
  const buf = await res.arrayBuffer();
  const wb = XLSX.read(new Uint8Array(buf), { type: "array" });
  return parseBook(wb);
}
