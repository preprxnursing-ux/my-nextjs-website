type TopicCardTone = "default" | "emerald" | "rose" | "amber" | "sky";

type TopicCardProps = {
  title: string;
  subtitle?: string;
  value?: string | number;
  percentage?: number;
  tone?: TopicCardTone;
  className?: string;
};

export default function TopicCard({
  title,
  subtitle,
  value,
  percentage,
  tone = "default",
  className = "",
}: TopicCardProps) {
  const toneClasses: Record<TopicCardTone, string> = {
    default: "border-white/10 bg-white/5 text-white",
    emerald: "border-emerald-400/20 bg-emerald-500/10 text-emerald-100",
    rose: "border-rose-400/20 bg-rose-500/10 text-rose-100",
    amber: "border-amber-400/20 bg-amber-500/10 text-amber-100",
    sky: "border-sky-400/20 bg-sky-500/10 text-sky-100",
  };

  const progressColor =
    percentage === undefined
      ? "bg-white"
      : percentage >= 70
      ? "bg-emerald-400"
      : percentage >= 50
      ? "bg-amber-400"
      : "bg-rose-400";

  return (
    <div
      className={`rounded-[24px] border p-5 shadow-xl backdrop-blur ${toneClasses[tone]} ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold">{title}</h3>

          {subtitle && (
            <p className="mt-1 text-sm opacity-80">{subtitle}</p>
          )}
        </div>

        {value !== undefined && (
          <div className="text-sm font-semibold opacity-90">
            {value}
          </div>
        )}
      </div>

      {percentage !== undefined && (
        <div className="mt-4">
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className={`h-full rounded-full transition-all ${progressColor}`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          <p className="mt-2 text-xs opacity-70">
            {percentage}% mastery
          </p>
        </div>
      )}
    </div>
  );
}