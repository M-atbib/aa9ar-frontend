"use client";

import Breadcrumb from "@/components/layout/Breadcrumb";
import ProjectKpis from "@/components/project/Kpis";
import { useProjectStore } from "@/stores/projectStore";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { FaPeopleGroup } from "react-icons/fa6";
import { BsFillBuildingsFill } from "react-icons/bs";
import { IoDocuments } from "react-icons/io5";
import { FaMoneyBillWave } from "react-icons/fa";
import { BsBricks } from "react-icons/bs";
import { MdArrowForward } from "react-icons/md";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectView() {
  const { currentProject, getProjectKpis, getProject } = useProjectStore();
  const { id } = useParams();

  const folders = [
    { name: "Materiaux", icon: <BsBricks />, link: `/project/${id}/material` },
    {
      name: "Effectifs",
      icon: <FaPeopleGroup />,
      link: `/project/${id}/effectif`,
    },
    {
      name: "Unites",
      icon: <BsFillBuildingsFill />,
      link: `/project/${id}/units`,
    },
    {
      name: "Documents administratifs",
      icon: <IoDocuments />,
      link: `/project/${id}/legal-paper`,
    },
    {
      name: "Autres depenses",
      icon: <FaMoneyBillWave />,
      link: `/project/${id}/other-expenses`,
    },
  ];

  useEffect(() => {
    if (id) {
      getProjectKpis(id as string);
      getProject(id as string);
    }
  }, [getProjectKpis, getProject, id]);

  return (
    <div className="min-h-[calc(100vh-10rem)]">
      <Breadcrumb items={[{ link: "", title: "Dossiers du projet" }]} />

      <div className="flex items-center justify-between gap-4 my-10">
        <h1 className="text-3xl font-bold">Détails du projet</h1>
        {currentProject?.name ? (
          <h1 className="text-3xl font-medium">{currentProject.name}</h1>
        ) : (
          <Skeleton className="h-10 w-56" />
        )}
      </div>

      <div className="space-y-8">
        <ProjectKpis />

        <div className="space-y-4">
          <h2 className="text-2xl font-medium">Dossiers</h2>
          <div className="flex items-center gap-4 flex-wrap">
            {folders.map((folder) => (
              <Link
                key={folder.name}
                href={folder.link}
                className="min-w-[20vw] flex items-center gap-3"
              >
                <div className="text-3xl bg-primaryDark text-white rounded-md p-4">
                  {folder.icon}
                </div>
                <p className="text-xl font-medium">{folder.name}</p>
                <MdArrowForward className="w-5 h-5 text-primaryDark" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
