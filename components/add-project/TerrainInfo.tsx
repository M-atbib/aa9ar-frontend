"use client";

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useProjectStore } from "@/stores/projectStore";

export default function TerrainInfo() {
  const { formData, updateFormData } = useProjectStore();

  const handleInputChange = (
    field: string,
    value: string | number | boolean
  ) => {
    updateFormData("terrainInfo", {
      ...formData.terrainInfo,
      [field]: value,
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Ajouter nouveau projet:
        <span className="ml-2 font-light">Informations sur le terrain</span>
      </h1>

      <div className="w-[80%] flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label className="text-sm">Surface du terrain</Label>
          <Input
            type="number"
            placeholder="ex: 1000"
            value={formData.terrainInfo.surface || ""}
            onChange={(e) =>
              handleInputChange("surface", Number(e.target.value))
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-sm">Prix du terrain</Label>
          <Input
            type="number"
            placeholder="ex: 1000000"
            value={formData.terrainInfo.price || ""}
            onChange={(e) => handleInputChange("price", Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-sm">Les côtés du terrain</Label>
          <Input
            type="number"
            placeholder="ex: 4"
            value={formData.terrainInfo.borders || ""}
            onChange={(e) =>
              handleInputChange("borders", Number(e.target.value))
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-sm">Nombre de niveaux</Label>
          <Input
            type="number"
            placeholder="ex: 5"
            value={formData.terrainInfo.number_of_floors || ""}
            onChange={(e) =>
              handleInputChange("number_of_floors", Number(e.target.value))
            }
          />
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            checked={formData.terrainInfo.commercial || false}
            onCheckedChange={(checked) =>
              handleInputChange("commercial", !!checked)
            }
          />
          <Label className="text-sm">
            Ce terrain contient des unités commerciales
          </Label>
        </div>
      </div>
    </div>
  );
}
