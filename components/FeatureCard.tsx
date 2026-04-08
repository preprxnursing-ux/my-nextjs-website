type FeatureCardProps = {
  title: string;
  text: string;
  icon?: React.ReactNode;
  className?: string;
};

export default function FeatureCard({
  title,
  text,
  icon,
  className = "",
}: FeatureCardProps) {
  return (
    <div
      className={`rounded-[24px] border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur transition hover:bg-white/10 ${className}`}
    >
      <div className="flex items-start gap-3">
        {icon && (
          <div className="text-xl opacity-80 mt-1">
            {icon}
          </div>
        )}

        <div>
          <h3 className="font-semibold text-white">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}



