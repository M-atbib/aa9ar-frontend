"use client";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useProjectStore } from "@/stores/projectStore";

export default function MainInfo() {
  const { formData, updateFormData } = useProjectStore();

  const handleInputChange = (
    field: string,
    value: string | number | boolean
  ) => {
    updateFormData("mainInfo", {
      ...formData.mainInfo,
      [field]: value,
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Ajouter nouveau projet:
        <span className="ml-2 font-light">Informations générales</span>
      </h1>

      <div className="w-[80%] flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label className="text-sm">Titre du projet</Label>
          <Input
            type="text"
            placeholder="ex: Résidence Les Oliviers"
            value={formData.mainInfo.title || ""}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-sm">Adresse</Label>
          <Input
            type="text"
            placeholder="ex: 123 Avenue Mohammed V"
            value={formData.mainInfo.address || ""}
            onChange={(e) => handleInputChange("address", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-sm">Ville</Label>
          <Input
            type="text"
            placeholder="ex: Casablanca"
            value={formData.mainInfo.city || ""}
            onChange={(e) => handleInputChange("city", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-sm">Budget</Label>
          <Input
            type="number"
            placeholder="ex: 5000000"
            value={formData.mainInfo.budget || ""}
            onChange={(e) =>
              handleInputChange("budget", Number(e.target.value))
            }
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            checked={formData.mainInfo.paperReady || false}
            onCheckedChange={(checked) =>
              handleInputChange("paperReady", !!checked)
            }
          />
          <Label className="text-sm">
            La documentation du projet est complète
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            checked={formData.mainInfo.partnership || false}
            onCheckedChange={(checked) =>
              handleInputChange("partnership", !!checked)
            }
          />
          <Label className="text-sm">
            Ce projet est en partenariat avec une autre entreprise
          </Label>
        </div>
      </div>
    </div>
  );
}
