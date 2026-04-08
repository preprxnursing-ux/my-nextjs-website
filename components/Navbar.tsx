"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, ChevronDown, X, Menu, LogOut, User } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

const featuredLinks = [
  { href: "/courses",      label: "Courses" },
  { href: "/educators",    label: "For Educators" },
  { href: "/features",     label: "Our Features" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact",      label: "Contact Us" },
  { href: "/pricing",      label: "Pricing" },
];

const moreLinks = [
  { href: "#", label: "Private Tutors" },
  { href: "#", label: "Blog" },
  { href: "#", label: "FAQ" },
];

const appLinks = [
  { href: "/quiz",    label: "Quiz" },
  { href: "/results", label: "Results" },
  { href: "/review",  label: "Review" },
  { href: "/history", label: "History" },
];

const BTN_COLOR = "#708090";
const BTN_HOVER  = "#5a6a7a";
const BTN_ACTIVE = "#06b6d4";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname  = usePathname();
  const router    = useRouter();

  const [moreOpen,   setMoreOpen]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

  // Real user state
  const [user,     setUser]     = useState<any>(null);
  const [initials, setInitials] = useState("?");

  useEffect(() => {
    const supabase = createClient();

    // Get current session on load
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser(data.user);
        const name = data.user.user_metadata?.full_name ?? data.user.email ?? "";
        setInitials(getInitials(name));
      }
    });

    // Listen for login/logout changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        const name = session.user.user_metadata?.full_name ?? session.user.email ?? "";
        setInitials(getInitials(name));
      } else {
        setUser(null);
        setInitials("?");
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  function getInitials(name: string) {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "?";
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setAvatarOpen(false);
    router.push("/auth/login");
    router.refresh();
  }

  const btnStyle = (key: string, active: boolean): React.CSSProperties => ({
    backgroundColor: active ? BTN_ACTIVE : hoveredBtn === key ? BTN_HOVER : BTN_COLOR,
    transition: "background-color 0.15s",
    padding: "9px 18px",
    borderRadius: "9px",
    fontSize: "13px",
    fontWeight: 600,
    color: "#fff",
    border: "none",
    cursor: "pointer",
    whiteSpace: "nowrap" as const,
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    textDecoration: "none",
    flexShrink: 0,
  });

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-4 md:px-8">

        {/* LOGO */}
        <Link href="/" className="flex shrink-0 items-center transition opacity-90 hover:opacity-100">
          <Image
            src="/logo.png"
            alt="Pre-NCLEX Nursing"
            width={140}
            height={38}
            className="object-contain"
          />
        </Link>

        {/* ALL BUTTONS — desktop */}
        <div className="hidden md:flex items-center gap-2 flex-1 justify-end">

          {featuredLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                style={btnStyle(link.label, active)}
                onMouseEnter={() => setHoveredBtn(link.label)}
                onMouseLeave={() => setHoveredBtn(null)}
              >
                {link.label}
              </Link>
            );
          })}

          <span className="h-5 w-px bg-white/15 mx-1" />

          {appLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                style={btnStyle(link.label, active)}
                onMouseEnter={() => setHoveredBtn(link.label)}
                onMouseLeave={() => setHoveredBtn(null)}
              >
                {link.label}
              </Link>
            );
          })}

          <span className="h-5 w-px bg-white/15 mx-1" />

          {/* MORE DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              style={btnStyle("more", false)}
              onMouseEnter={() => setHoveredBtn("more")}
              onMouseLeave={() => setHoveredBtn(null)}
            >
              More
              <ChevronDown style={{ width: 14, height: 14, transition: "transform 0.2s", transform: moreOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
            </button>

            {moreOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMoreOpen(false)} />
                <div className="absolute right-0 top-full z-20 mt-2 w-52 rounded-2xl border border-white/10 bg-black p-2 shadow-2xl">
                  {moreLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMoreOpen(false)}
                      className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white transition"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* FAR RIGHT — Cart + Avatar */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">

          {/* CART */}
          <button
            style={btnStyle("cart", false)}
            onMouseEnter={() => setHoveredBtn("cart")}
            onMouseLeave={() => setHoveredBtn(null)}
          >
            <ShoppingCart style={{ width: 15, height: 15 }} />
            Cart
          </button>

          {/* AVATAR — shows login button if not logged in */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setAvatarOpen(!avatarOpen)}
                className="flex items-center gap-1.5 cursor-pointer"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500 text-sm font-semibold text-white">
                  {initials}
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </button>

              {avatarOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setAvatarOpen(false)} />
                  <div className="absolute right-0 top-full z-20 mt-2 w-52 rounded-2xl border border-white/10 bg-black p-2 shadow-2xl">
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="text-sm font-medium text-white truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setAvatarOpen(false)}
                      className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition mt-1"
                    >
                      <User className="w-4 h-4" />
                      My Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full rounded-xl px-4 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10 transition"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link
              href="/auth/login"
              style={btnStyle("login", false)}
              onMouseEnter={() => setHoveredBtn("login")}
              onMouseLeave={() => setHoveredBtn(null)}
            >
              Sign in
            </Link>
          )}
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          className="md:hidden ml-auto flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-slate-300"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="border-t border-white/5 bg-black md:hidden">
          <div className="mx-auto max-w-7xl space-y-2 px-6 py-4">

            <p className="px-2 pt-1 pb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">Featured</p>
            {featuredLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link key={link.label} href={link.href} onClick={() => setMobileOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-semibold text-white transition"
                  style={{ backgroundColor: active ? BTN_ACTIVE : BTN_COLOR }}>
                  {link.label}
                </Link>
              );
            })}

            <p className="px-2 pt-4 pb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">App</p>
            {appLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link key={link.label} href={link.href} onClick={() => setMobileOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-semibold text-white transition"
                  style={{ backgroundColor: active ? BTN_ACTIVE : BTN_COLOR }}>
                  {link.label}
                </Link>
              );
            })}

            <p className="px-2 pt-4 pb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">More</p>
            {moreLinks.map((link) => (
              <Link key={link.label} href={link.href} onClick={() => setMobileOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm text-slate-400 hover:bg-white/5 hover:text-white transition">
                {link.label}
              </Link>
            ))}

            <div className="flex items-center gap-3 px-2 pt-4 pb-2">
              <button className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white"
                style={{ backgroundColor: BTN_COLOR }}>
                <ShoppingCart className="h-4 w-4" />
                Cart
              </button>
              {user ? (
                <button onClick={handleLogout}
                  className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white"
                  style={{ backgroundColor: "#e11d48" }}>
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              ) : (
                <Link href="/auth/login" onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white"
                  style={{ backgroundColor: BTN_COLOR }}>
                  Sign in
                </Link>
              )}
            </div>

          </div>
        </div>
      )}
    </header>
  );
}