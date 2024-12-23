"use client";

import { useParams } from "next/navigation";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OtherExpenseTable from "@/components/project/OtherExpenseTable";
import AddOtherExpenses from "@/components/project/AddOtherExpenses";

export default function OtherExpenses() {
  const { id } = useParams();
  const tabs = [
    {
      value: "Achat_terrain",
      label: "Achat Terrain",
      type: "achat_terrain",
    },
    {
      value: "frais-etudes",
      label: "Frais d' etudes",
      type: "frais_etudes",
    },
    {
      value: "ascenseur",
      label: "Ascenseur",
      type: "ascenseur",
    },
    {
      value: "frais-divers",
      label: "Frais divers",
      type: "frais_divers",
    },
  ];

  return (
    <div>
      <Breadcrumb
        items={[
          { link: `/project/${id}`, title: "Détails du projet" },
          { link: "", title: "Autres dépenses" },
        ]}
      />

      <h1 className="text-3xl font-bold my-8">Autres Dépenses</h1>

      <Tabs defaultValue={tabs[0].value}>
        <TabsList className="">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <div className="flex gap-4 items-start justify-between">
              <OtherExpenseTable data={[]} />
              <AddOtherExpenses onSubmit={() => {}} />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
