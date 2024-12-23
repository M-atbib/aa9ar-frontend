"use client";

import Breadcrumb from "@/components/layout/Breadcrumb";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { IoMdDocument } from "react-icons/io";

export default function LegalPaper() {
  const { id } = useParams();
  return (
    <div>
      <Breadcrumb
        items={[
          { link: `/project/${id}`, title: "Détails du projet" },
          { link: "", title: "Papier Juridique" },
        ]}
      />
      <div className="flex items-center justify-between gap-4 my-10">
        <h1 className="text-3xl font-bold">Documents Juridiques</h1>
        <Button>
          <PlusIcon className="h-4 w-4" />
          Ajouter un document
        </Button>
      </div>

      <div className="flex flex-wrap gap-16">
        {["Document 1", "Document 2", "Document 3"].map((doc, index) => {
          return (
            <div
              className="flex flex-col items-center gap-2 text-primaryDark"
              key={index}
            >
              <IoMdDocument className="h-12 w-12" />
              <h2 className="text-lg font-bold">{doc}</h2>
              <Button variant="outline" size="sm">
                Inspecter
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
