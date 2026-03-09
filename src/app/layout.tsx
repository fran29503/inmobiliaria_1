import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import PageLoader from "@/components/PageLoader";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata: Metadata = {
  title: "Bugs Properties — Exceptional Real Estate",
  description: "Curated luxury residences across Miami, Boca Raton, Los Angeles, and New York.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll />
        <ScrollProgress />
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
