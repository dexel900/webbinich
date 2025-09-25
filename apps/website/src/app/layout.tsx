import { Outfit, Open_Sans } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SideScroller from "@/components/SideScroller"; // ← nur hier importieren

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap", weight: ["300","400","500","600","700","800"] });
const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-opensans", display: "swap", weight: ["300","400","600","700"] });

export const metadata: Metadata = {
  title: "webbinich.agency",
  description: "Moderne Webentwicklung ohne Ballast.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={`${outfit.variable} ${openSans.variable} font-opensans antialiased text-neutral-100 bg-black`}>
        <Header />
        <SideScroller />
        {/* ⬇️ Genau EIN main */}
        <main className="mx-auto max-w-6xl px-4 pb-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
