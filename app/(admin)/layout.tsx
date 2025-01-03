import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@/styles/globals.css";
import AdminNavbar from "@/components/layout/AdminNavbar";
import Footer from "@/components/layout/Footer";
import ErrorAlert from "@/components/layout/ErrorAlert";

export const metadata: Metadata = {
  title: "aa9ar.ma - Admin",
  description: "aa9ar.ma - Admin",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div lang="fr">
      <SpeedInsights />
      <ErrorAlert />
      <div className="">
        <AdminNavbar />
        <div className="w-[90%] min-h-[calc(100vh-150px)] mx-auto text-darkText space-y-4">
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
}
