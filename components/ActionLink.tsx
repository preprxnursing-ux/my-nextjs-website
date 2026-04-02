import Link from "next/link";

type ActionLinkProps = {
  href: string;
  title: string;
  text?: string;
  className?: string;
  inverted?: boolean;
};

export default function ActionLink({
  href,
  title,
  text,
  className = "",
  inverted = false,
}: ActionLinkProps) {
  return (
    <Link
      href={href}
      className={`block rounded-2xl border p-4 transition ${
        inverted
          ? "border-white/15 bg-white text-slate-900 hover:opacity-90"
          : "border-white/10 bg-white/5 text-white hover:bg-white/10"
      } ${className}`}
    >
      <h3 className="font-semibold">{title}</h3>
      {text ? (
        <p
          className={`mt-2 text-sm leading-6 ${
            inverted ? "text-slate-700" : "text-slate-300"
          }`}
        >
          {text}
        </p>
      ) : null}
    </Link>
  );
}