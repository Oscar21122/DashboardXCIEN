export function PanelHead({
  kicker,
  title,
  hint,
}: {
  kicker: string;
  title: string;
  hint?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 px-[18px] pt-4 pb-[13px] border-b border-line">
      <div>
        <div className="font-disp text-[10.5px] tracking-[0.16em] uppercase text-xgreen font-semibold mb-1.5 leading-[1.5]">
          {kicker}
        </div>
        <h2 className="font-disp text-base font-semibold m-0 -tracking-[0.01em]">{title}</h2>
      </div>
      {hint && <div className="font-mono text-[11.5px] text-faint text-right">{hint}</div>}
    </div>
  );
}
