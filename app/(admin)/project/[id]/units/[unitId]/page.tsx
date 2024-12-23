"use client";

import Breadcrumb from "@/components/layout/Breadcrumb";
import { useParams } from "next/navigation";

export default function Unit() {
  const { id } = useParams();

  return (
    <div className="space-y-8">
      <Breadcrumb
        items={[
          { link: `/project/${id}`, title: "Détails du projet" },
          { link: `/project/${id}/units`, title: "Unités" },
          { link: "", title: "Details d'unité" },
        ]}
      />

      <h1 className="text-3xl font-bold">Details d&apos;unité</h1>
    </div>
  );
}
