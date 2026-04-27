import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import CartDrawer from "../components/CartDrawer";
import { CartProvider } from "@/lib/cartContext";
import SessionGuard from "../components/SessionGuard";
export const metadata: Metadata = {
  metadataBase: new URL("https://prenclex.com"),
  title: "Pre-NCLEX-Review | Pass NCLEX First Attempt",
  description: "Pre-NCLEX-Review — Adaptive NCLEX-RN, NCLEX-PN, CCRN and nursing exam preparation platform. Pass first attempt.",
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-950 text-white antialiased">
        <CartProvider>
          <div style={{ position: "sticky", top: 0, zIndex: 1000, width: "100%" }}>
            <Navbar />
          </div>
          <CartDrawer />
          <SessionGuard />
          <div style={{ maxWidth: "100vw", overflowX: "hidden" }}>
            {children}
          </div>
        </CartProvider>
      </body>
    </html>
  );
}

