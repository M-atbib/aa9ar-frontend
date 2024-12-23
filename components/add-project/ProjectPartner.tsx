"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
// import { useProjectStore } from "@/stores/projectStore";
import { useState } from "react";
import { toast } from "sonner";
import { Partner } from "@/types/project-type";

export default function ProjectPartner() {
  // const { updateFormData } = useProjectStore();
  const [numberOfPartners, setNumberOfPartners] = useState<number>(0);
  const [currentPartner, setCurrentPartner] = useState<Partner>({
    email: "",
    percentage: 0,
  });
  const [partners, setPartners] = useState<Partner[]>([]);

  const handleSavePartner = () => {
    if (!currentPartner.email || !currentPartner.percentage) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    if (currentPartner.percentage <= 0 || currentPartner.percentage >= 100) {
      toast.error("Le pourcentage doit être entre 0 et 100");
      return;
    }

    if (partners.length >= numberOfPartners) {
      toast.error(`Vous ne pouvez ajouter que ${numberOfPartners} partenaires`);
      return;
    }

    const updatedPartners = [...partners, currentPartner];
    setPartners(updatedPartners);

    // Update form data with all partners
    // updateFormData("partner", {
    //   number_of_partners: numberOfPartners,
    //   partners: updatedPartners,
    // });

    // Reset current partner
    setCurrentPartner({
      email: "",
      percentage: 0,
    });
    toast.success("Partenaire ajouté avec succès");
  };

  const remainingPartners = numberOfPartners - partners.length;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Ajouter nouveau projet:
        <span className="ml-2 font-light">
          Informations sur les partenaires
        </span>
      </h1>

      <div className="w-[80%] flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label className="text-sm">Nombre de partenaires</Label>
          <Input
            type="number"
            placeholder="ex: 2"
            value={numberOfPartners || ""}
            onChange={(e) => setNumberOfPartners(Number(e.target.value))}
            disabled={partners.length > 0}
          />
        </div>

        {numberOfPartners > 0 && (
          <>
            <p className="text-sm text-blue-500">
              Partenaires restants à ajouter: {remainingPartners}
            </p>

            <div className="flex flex-col gap-2">
              <Label className="text-sm">Email du partenaire</Label>
              <Input
                type="email"
                placeholder="ex: partner@company.com"
                value={currentPartner.email}
                onChange={(e) =>
                  setCurrentPartner({
                    ...currentPartner,
                    email: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-sm">Pourcentage de participation</Label>
              <Input
                type="number"
                placeholder="ex: 25"
                value={currentPartner.percentage || ""}
                onChange={(e) =>
                  setCurrentPartner({
                    ...currentPartner,
                    percentage: Number(e.target.value),
                  })
                }
              />
            </div>

            <Button
              onClick={handleSavePartner}
              className="w-fit mt-2"
              disabled={partners.length >= numberOfPartners}
            >
              Ajouter Partenaire
            </Button>

            {partners.length > 0 && (
              <div className="mt-2 max-h-[200px] overflow-y-auto">
                <p className="text-sm text-gray-500">Partenaires ajoutés:</p>
                <ul className="list-disc list-inside">
                  {partners.map((partner, index) => (
                    <li key={index} className="text-sm">
                      Email: {partner.email}, Participation:{" "}
                      {partner.percentage}%
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
