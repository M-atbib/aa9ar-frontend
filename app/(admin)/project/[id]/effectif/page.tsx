"use client";

import { useParams } from "next/navigation";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MaterialEffectifTable from "@/components/project/MaterialEffectifTable";
import RecapTable from "@/components/project/RecapTable";
import AddMaterialEffectif from "@/components/project/AddMaterialEffectif";

export default function Effectif() {
  const { id } = useParams();
  const tabs = [
    {
      value: "Resumer",
      label: "Resumer",
      type: "recap",
    },
    {
      value: "Gros_oeuvre",
      label: "Gros oeuvre",
      type: "material",
    },
    {
      value: "Electricite",
      label: "Electricité",
      type: "material",
    },
    {
      value: "Plomberie",
      label: "Plomberie",
      type: "material",
    },
    {
      value: "Menuiserie_bois",
      label: "Menuiserie bois",
      type: "material",
    },
    {
      value: "Menuiserie_aluminium",
      label: "Menuiserie aluminium",
      type: "material",
    },
    {
      value: "Revetement",
      label: "Revetement",
      type: "material",
    },
    {
      value: "Fausse_plafond",
      label: "Fausse plafond",
      type: "material",
    },
    {
      value: "Peinture",
      label: "Peinture",
      type: "material",
    },
  ];

  return (
    <div>
      <Breadcrumb
        items={[
          { link: `/project/${id}`, title: "Détails du projet" },
          { link: "", title: "Effectifs" },
        ]}
      />

      <h1 className="text-3xl font-bold my-8">Effectifs</h1>

      <Tabs defaultValue="Resumer">
        <TabsList className="">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.type === "recap" ? (
              <RecapTable data={[]} />
            ) : (
              <div className="flex gap-4 items-start justify-between">
                <MaterialEffectifTable data={[]} />
                <AddMaterialEffectif type="effectif" onSubmit={() => {}} />
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
