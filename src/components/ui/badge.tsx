import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  style,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-[3px] text-[11.5px] font-medium",
        className
      )}
      style={style}
      {...props}
    />
  );
}
