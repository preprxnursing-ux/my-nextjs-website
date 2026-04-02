import { ReactNode } from "react";

type PageBadgeTone = "default" | "emerald" | "rose" | "amber" | "sky";

type PageBadgeProps = {
  children: ReactNode;
  className?: string;
  tone?: PageBadgeTone;
  icon?: ReactNode;
};

export default function PageBadge({
  children,
  className = "",
  tone = "default",
  icon,
}: PageBadgeProps) {
  const toneClasses: Record<PageBadgeTone, string> = {
    default: "border-white/10 bg-white/10 text-slate-200",
    emerald: "border-emerald-400/20 bg-emerald-500/15 text-emerald-100",
    rose: "border-rose-400/20 bg-rose-500/15 text-rose-100",
    amber: "border-amber-400/20 bg-amber-500/15 text-amber-100",
    sky: "border-sky-400/20 bg-sky-500/15 text-sky-100",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur ${toneClasses[tone]} ${className}`}
    >
      {icon && <span className="text-sm">{icon}</span>}
      {children}
    </span>
  );
}