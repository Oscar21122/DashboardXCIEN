export interface NodeRow {
  id: string;
  region: string;
  oadms: number;
  lambdaCap: number;
  clients: number;
  accPct: number;
  txPct: number;
  txCap: number;
  txUsed: number;
}

export interface OadmRow {
  id: string;
  node: string;
  region: string;
  cap: number;
  used: number;
  pct: number;
}

export interface RingRow {
  a: string;
  b: string;
  region: string;
  cap: number;
  used: number;
  pct: number;
}

export interface DrpRow {
  id: string;
  type: string;
  cap: number;
  used: number;
  pct: number;
}

export interface ClientRow {
  seg: string;
  region: string;
  node: string;
}

export interface NetworkData {
  nodes: NodeRow[];
  oadms: OadmRow[];
  ring: RingRow[];
  drp: DrpRow[];
  clients: ClientRow[];
  egrReq: number | null;
}
