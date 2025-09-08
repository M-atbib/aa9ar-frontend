"use client";

import { FolderOpen } from "lucide-react";

interface NoDataProps {
  title?: string;
  inform?: string;
}

export default function NoData({
  title = "Aucune donnée disponible",
  inform = "Il n'y a aucune donnée à afficher pour le moment.",
}: NoDataProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground mt-2">{inform}</p>
    </div>
  );
}
