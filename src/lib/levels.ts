/* Umbrales y colores de saturación (coinciden con la hoja "Parametros"). */
export const TH_AMBER = 60;
export const TH_GROW = 70; // disparo de crecimiento bajo demanda
export const TH_RED = 80;

export type LevelKey = "green" | "amber" | "red";

export const LEVELS: Record<LevelKey, { label: string; color: string; soft: string }> = {
  green: { label: "Verde", color: "#3DD63D", soft: "rgba(61,214,61,0.14)" },
  amber: { label: "Ámbar", color: "#FBBF24", soft: "rgba(251,191,36,0.15)" },
  red: { label: "Rojo", color: "#FF5A52", soft: "rgba(255,90,82,0.16)" },
};

export const SEG_COLORS: Record<string, string> = {
  Micro: "#2DA8FF",
  PyMe: "#3DD63D",
  Empresarial: "#FBBF24",
  Corporativo: "#A78BFA",
};

export function levelOf(pct: number): LevelKey {
  if (pct >= TH_RED) return "red";
  if (pct >= TH_AMBER) return "amber";
  return "green";
}

/** Convierte fracciones (0–1) o enteros (0–100) a porcentaje entero. */
export function pctNum(v: unknown): number {
  if (v == null || v === "") return 0;
  const n = Number(v);
  if (Number.isNaN(n)) return 0;
  return Math.abs(n) <= 1.5 ? Math.round(n * 100) : Math.round(n);
}

export function num(v: unknown): number {
  if (v == null || v === "") return 0;
  const n = Number(v);
  return Number.isNaN(n) ? 0 : n;
}
