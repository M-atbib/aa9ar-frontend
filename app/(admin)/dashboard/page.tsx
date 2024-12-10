"use client";

import DashboardKpis from "@/components/dashboard/Kpis";
import ProjectList from "@/components/dashboard/ProjectList";
import { useCompanyStore } from "@/stores/companyStore";
import { useProjectStore } from "@/stores/projectStore";
import { useEffect } from "react";

export default function Dashboard() {
  const { getCompayKpis, getCompanies } = useCompanyStore();
  const { getCompanyProjects } = useProjectStore();

  useEffect(() => {
    const fetchData = async () => {
      const companyId = await getCompanies();
      await getCompayKpis();
      if (companyId) {
        await getCompanyProjects(companyId.id);
      }
    };
    fetchData();
  }, [getCompayKpis, getCompanies, getCompanyProjects]);

  return (
    <div className="space-y-8 min-h-[calc(100vh-150px)]">
      <div className="space-y-4">
        <h1 className="text-3xl tracking-wide font-bold">Tableau de bord</h1>
        <DashboardKpis />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Liste des projets</h2>
        <ProjectList />
      </div>
    </div>
  );
}