"use client";

import Breadcrumb from "@/components/layout/Breadcrumb";
import Folders from "@/components/project/Folders";
import ProjectKpis from "@/components/project/Kpis";
import { useProjectStore } from "@/stores/projectStore";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function ProjectView() {
  const { getProjectKpis } = useProjectStore();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getProjectKpis(id as string);
    }
  }, []);

  return (
    <div className="min-h-[calc(100vh-10rem)]">
      <Breadcrumb items={[{ link: "", title: "Détails du projet" }]} />

      <div className="flex items-center justify-between gap-4 my-10">
        <h1 className="text-3xl font-bold">Détails du projet</h1>
        <h1 className="text-3xl font-medium">
          Projet de construction de 100 logements
        </h1>
      </div>

      <div className="space-y-8">
        <ProjectKpis />

        <div className="space-y-4">
          <h2 className="text-2xl font-medium">Dossiers</h2>
          <Folders />
        </div>
      </div>
    </div>
  );
}
