"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
  shortLabel?: string;
};

const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/quiz", label: "Quiz" },
  { href: "/results", label: "Results", shortLabel: "Results" },
  { href: "/review", label: "Review", shortLabel: "Review" },
  { href: "/history", label: "History", shortLabel: "History" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3 rounded-2xl transition"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-sm font-bold text-white shadow-lg transition group-hover:bg-white/15">
            NS
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-[0.08em] text-white">
              NCLEX Exam Studio
            </p>
            <p className="truncate text-xs text-slate-400">
              Practice, review, results, history
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-2xl border px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "border-cyan-400/30 bg-cyan-500/20 text-cyan-100 shadow-sm"
                    : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-white/5 md:hidden">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded-2xl border px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "border-cyan-400/30 bg-cyan-500/20 text-cyan-100"
                    : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.shortLabel ?? item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}