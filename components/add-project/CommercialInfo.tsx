"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useProjectStore } from "@/stores/projectStore";
import { useState } from "react";
import { toast } from "sonner";
import { CommercialInfoForm, UnitInfo } from "@/types/project-type";

export default function CommercialInfo() {
  const { updateFormData } = useProjectStore();
  const [totalUnits, setTotalUnits] = useState<number>(0);
  const [currentUnit, setCurrentUnit] = useState<UnitInfo>({
    floor: 0,
    surface: 0,
    profit_margin: 0,
  });
  const [units, setUnits] = useState<CommercialInfoForm[]>([]);

  const handleSaveUnit = () => {
    if (!currentUnit.surface || !currentUnit.profit_margin) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    if (units.length >= totalUnits) {
      toast.error(
        `Vous ne pouvez ajouter que ${totalUnits} unités commerciales`
      );
      return;
    }

    const newUnit: CommercialInfoForm = {
      unit_number: `C${units.length + 1}`,
      unit: currentUnit,
    };

    const updatedUnits = [...units, newUnit];
    setUnits(updatedUnits);

    // Update form data with the current unit
    updateFormData("commercialInfo", newUnit);

    // Reset inputs
    setCurrentUnit({
      floor: 0,
      surface: 0,
      profit_margin: 0,
    });
    toast.success("Unité commerciale ajoutée avec succès");
  };

  const handleTotalUnitsChange = (value: string) => {
    const numValue = Number(value);
    if (numValue > 0) {
      setTotalUnits(numValue);
    }
  };

  const remainingUnits = totalUnits - units.length;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Ajouter nouveau projet:
        <span className="ml-2 font-light">
          Informations sur les unités commerciales
        </span>
      </h1>

      <div className="w-[80%] flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label className="text-sm">
            Nombre total d&apos;unités commerciales
          </Label>
          <Input
            type="number"
            placeholder="ex: 5"
            value={totalUnits || ""}
            onChange={(e) => handleTotalUnitsChange(e.target.value)}
            disabled={units.length > 0}
          />
        </div>

        {totalUnits > 0 && (
          <>
            <p className="text-sm text-blue-500">
              Unités commerciales restantes à ajouter: {remainingUnits}
            </p>

            <div className="flex flex-col gap-2">
              <Label className="text-sm">
                Surface de l&apos;unité commerciale
              </Label>
              <Input
                type="number"
                placeholder="ex: 100"
                value={currentUnit.surface || ""}
                onChange={(e) =>
                  setCurrentUnit({
                    ...currentUnit,
                    surface: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-sm">Marge bénéficiaire</Label>
              <Input
                type="number"
                placeholder="ex: 15"
                value={currentUnit.profit_margin || ""}
                onChange={(e) =>
                  setCurrentUnit({
                    ...currentUnit,
                    profit_margin: Number(e.target.value),
                  })
                }
              />
            </div>

            <Button
              onClick={handleSaveUnit}
              className="w-fit mt-2"
              disabled={units.length >= totalUnits}
            >
              Ajouter Unité Commerciale
            </Button>

            {units.length > 0 && (
              <div className="mt-2 max-h-[200px] overflow-y-auto">
                <p className="text-sm text-gray-500">
                  Unités commerciales ajoutées:
                </p>
                <ul className="list-disc list-inside">
                  {units.map((unit, index) => (
                    <li key={index} className="text-sm">
                      Unité {unit.unit_number} - Surface: {unit.unit.surface}m²,
                      Marge: {unit.unit.profit_margin}%
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
