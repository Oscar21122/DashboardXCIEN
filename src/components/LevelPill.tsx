import { LEVELS, type LevelKey } from "@/lib/levels";
import { Badge } from "@/components/ui/badge";

export function LevelPill({ level }: { level: LevelKey }) {
  const L = LEVELS[level];
  return (
    <Badge style={{ borderColor: L.color, color: L.color, background: L.soft }}>
      <i className="h-[7px] w-[7px] rounded-full" style={{ background: L.color }} />
      {L.label}
    </Badge>
  );
}
