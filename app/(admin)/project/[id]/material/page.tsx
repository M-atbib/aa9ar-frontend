"use client";

import { useParams } from "next/navigation";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MaterialEffectifTable from "@/components/project/MaterialTable";
import RecapTable from "@/components/project/RecapTable";
import AddMaterial from "@/components/project/AddMaterial";
import { useMaterialStore } from "@/stores/materialStore";
import { useEffect } from "react";
import { useCompanyStore } from "@/stores/companyStore";

export default function Material() {
  const { id } = useParams();
  const { getCategories, categories } = useCompanyStore();
  const { getMaterialsByCategory, getMaterialRecap, recap, materials } =
    useMaterialStore();
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

  useEffect(() => {
    if (id) {
      getCategories();
      getMaterialRecap(id as string);
    }
  }, [getCategories, getMaterialRecap, id]);

  const handleTabChange = (value: string) => {
    if (value !== "Resumer" && id && categories) {
      const category = categories.find(
        (cat) => cat.name.replace(/\s+/g, "_") === value
      );
      if (category) {
        getMaterialsByCategory(category.id, id as string);
      }
    }
  };

  return (
    <div>
      <Breadcrumb
        items={[
          { link: `/project/${id}`, title: "Détails du projet" },
          { link: "", title: "Materiaux" },
        ]}
      />

      <h1 className="text-3xl font-bold my-8">Materiaux</h1>

      <Tabs defaultValue="Resumer" onValueChange={handleTabChange}>
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
              <RecapTable data={recap} />
            ) : (
              <div className="flex gap-4 items-start justify-between">
                <MaterialEffectifTable data={materials || []} />
                <AddMaterial
                  categoryId={
                    categories?.find(
                      (cat) => cat.name.replace(/\s+/g, "_") === tab.value
                    )?.id
                  }
                />
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
