import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "NCLEX Exam Studio",
  description: "A creative NCLEX practice and exam experience.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-white antialiased">
        
        <Navbar />

        <div>
  {children}
</div>

      </body>
    </html>
  );
}

