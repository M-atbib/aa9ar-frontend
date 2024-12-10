"use client";

import Folders from "@/components/project/Folders";
import ProjectKpis from "@/components/project/Kpis";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function ProjectView() {
  return (
    <div className="min-h-[calc(100vh-10rem)]">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Tableau de bord</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Détails du projet</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

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
