type SummaryTileProps = {
  title: string;
  value: string | number;
  text: string;
  className?: string;
};

export default function SummaryTile({
  title,
  value,
  text,
  className = "",
}: SummaryTileProps) {
  return (
    <div
      className={`rounded-[24px] border border-white/10 bg-black/10 p-5 ${className}`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
        {title}
      </p>
      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
    </div>
  );
}