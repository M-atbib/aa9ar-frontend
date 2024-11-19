import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "aa9ar.ma",
  description: "aa9ar.ma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <SpeedInsights />
      <body>{children}</body>
    </html>
  );
}
