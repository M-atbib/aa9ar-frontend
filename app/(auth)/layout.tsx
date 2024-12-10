import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "aa9ar.ma - Sign up",
  description: "aa9ar.ma - Sign up",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div lang="fr">
      <SpeedInsights />
      <div className="">{children}</div>
    </div>
  );
}
