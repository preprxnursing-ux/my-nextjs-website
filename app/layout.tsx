import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "NCLEX Exam Studio",
  description: "A creative NCLEX practice and exam experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-white antialiased">
        <div className="relative min-h-screen overflow-hidden">
          <div className="pointer-events-none fixed inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,1),_rgba(30,41,59,1)_30%,_rgba(2,6,23,1)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px]" />
            <div className="absolute left-[-80px] top-[-50px] h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="absolute right-[-60px] top-24 h-80 w-80 rounded-full bg-violet-400/10 blur-3xl" />
            <div className="absolute bottom-[-40px] left-1/3 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
          </div>

          <Navbar />

          <div className="relative px-4 pb-8 md:px-6 lg:px-8">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}