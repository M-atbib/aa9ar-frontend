"use client";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useProjectStore } from "@/stores/projectStore";
import { CreateProjectPayload } from "@/types/project-type";

export default function MainInfo() {
  const { formData, paperReady, partnership, setCheckbox, updateFormData } =
    useProjectStore();

  const handleInputChange = (
    field: keyof CreateProjectPayload,
    value: CreateProjectPayload[keyof CreateProjectPayload]
  ) => {
    updateFormData(field, value);
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
            value={formData.name || ""}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-sm">Adresse</Label>
          <Input
            type="text"
            placeholder="ex: 123 Avenue Mohammed V"
            value={formData.address || ""}
            onChange={(e) => handleInputChange("address", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-sm">Ville</Label>
          <Input
            type="text"
            placeholder="ex: Casablanca"
            value={formData.city || ""}
            onChange={(e) => handleInputChange("city", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-sm">Budget</Label>
          <Input
            type="number"
            placeholder="ex: 5000000"
            value={formData.total_budget || ""}
            onChange={(e) =>
              handleInputChange("total_budget", Number(e.target.value))
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-sm">Date de début</Label>
          <Input
            type="date"
            placeholder="ex: 5000000"
            value={formData.start_date || ""}
            onChange={(e) => handleInputChange("start_date", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-sm">Date de fin</Label>
          <Input
            type="date"
            placeholder="ex: 5000000"
            value={formData.end_date || ""}
            onChange={(e) => handleInputChange("end_date", e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            checked={paperReady || false}
            onCheckedChange={(checked) => setCheckbox("paperReady", !!checked)}
          />
          <Label className="text-sm">
            La documentation du projet est complète
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            checked={partnership || false}
            onCheckedChange={(checked) => setCheckbox("partnership", !!checked)}
          />
          <Label className="text-sm">
            Ce projet est en partenariat avec une autre entreprise
          </Label>
        </div>
      </div>
    </div>
  );
}
