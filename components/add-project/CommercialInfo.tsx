"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useProjectStore } from "@/stores/projectStore";
import { ProjectUnit, GlobalCommercialInfo } from "@/types/project-type";
import { useState } from "react";

export default function CommercialInfo() {
  const { formData, addUnit, updateFormData } = useProjectStore();
  const [totalUnits, setTotalUnits] = useState<number>(0);
  const [profitMargin, setProfitMargin] = useState<number>(0);
  const [units, setUnits] = useState<ProjectUnit[]>([]);
  const [currentUnit, setCurrentUnit] = useState<ProjectUnit>({
    type: "COMMERCIAL",
    unit_number: "",
    floor: 0,
    surface: 0,
    price: 0,
    status: "AVAILABLE",
    sous_sol: 0,
    rez_de_chaussee: 0,
    mezzanine: 0,
  });

  const handleInputChangeFirstPart = (
    field: keyof GlobalCommercialInfo,
    value: GlobalCommercialInfo[keyof GlobalCommercialInfo]
  ) => {
    updateFormData("global_commercial_info", {
      ...formData.global_commercial_info,
      [field]: value,
    });
    if (field === "count") {
      setTotalUnits(value);
    } else if (field === "profit_margin") {
      setProfitMargin(value);
    }
  };

  const handleInputChangeSecondPart = (
    field: keyof ProjectUnit,
    value: number | string
  ) => {
    setCurrentUnit((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveUnit = (e: React.MouseEvent) => {
    e.preventDefault();
    setUnits((prev) => [...prev, currentUnit]);
    addUnit(currentUnit);
    setCurrentUnit({
      type: "COMMERCIAL",
      unit_number: "",
      floor: 0,
      surface: 0,
      price: 0,
      status: "AVAILABLE",
      sous_sol: 0,
      rez_de_chaussee: 0,
      mezzanine: 0,
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Ajouter nouveau projet:
        <span className="ml-2 font-light">
          Informations sur les unités commerciales
        </span>
      </h1>

      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2 w-[90%]">
          <Label className="text-sm">
            Nombre total d&apos;unités commerciales
          </Label>
          <Input
            type="number"
            placeholder="ex: 5"
            value={formData.global_commercial_info.count || ""}
            onChange={(e) =>
              handleInputChangeFirstPart("count", Number(e.target.value))
            }
          />
          <Label className="text-sm">Marge bénéficiaire</Label>
          <Input
            type="number"
            placeholder="ex: 15%"
            value={formData.global_commercial_info.profit_margin || ""}
            onChange={(e) =>
              handleInputChangeFirstPart(
                "profit_margin",
                Number(e.target.value)
              )
            }
          />
        </div>

        {totalUnits > 0 && profitMargin > 0 && (
          <div className="flex gap-8">
            <div className="w-[90%] space-y-3">
              <p className="text-sm text-blue-500 mb-2">
                Unités commerciales restantes à ajouter:{" "}
                {totalUnits - units.length}
              </p>

              <div className="flex flex-col gap-1">
                <Label className="text-sm">Numéro d&apos;unité</Label>
                <Input
                  type="text"
                  placeholder="ex: A101"
                  value={currentUnit.unit_number}
                  onChange={(e) =>
                    handleInputChangeSecondPart("unit_number", e.target.value)
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label className="text-sm">Surface totale</Label>
                <Input
                  type="number"
                  placeholder="ex: 100"
                  value={currentUnit.surface || ""}
                  onChange={(e) =>
                    handleInputChangeSecondPart(
                      "surface",
                      Number(e.target.value)
                    )
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label className="text-sm">Surface sous-sol</Label>
                <Input
                  type="number"
                  placeholder="ex: 100"
                  value={currentUnit.sous_sol || ""}
                  onChange={(e) =>
                    handleInputChangeSecondPart(
                      "sous_sol",
                      Number(e.target.value)
                    )
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label className="text-sm">Surface rez-de-chaussée</Label>
                <Input
                  type="number"
                  placeholder="ex: 100"
                  value={currentUnit.rez_de_chaussee || ""}
                  onChange={(e) =>
                    handleInputChangeSecondPart(
                      "rez_de_chaussee",
                      Number(e.target.value)
                    )
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label className="text-sm">Surface mezzanine</Label>
                <Input
                  type="number"
                  placeholder="ex: 100"
                  value={currentUnit.mezzanine || ""}
                  onChange={(e) =>
                    handleInputChangeSecondPart(
                      "mezzanine",
                      Number(e.target.value)
                    )
                  }
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label className="text-sm">Prix de l&apos;unité</Label>
                <Input
                  type="number"
                  placeholder="ex: 100"
                  value={currentUnit.price || ""}
                  onChange={(e) =>
                    handleInputChangeSecondPart("price", Number(e.target.value))
                  }
                />
              </div>

              <Button
                onClick={handleSaveUnit}
                className="w-fit mt-2 float-right"
                disabled={units.length >= totalUnits}
                size="sm"
              >
                Ajouter Unité Commerciale
              </Button>
            </div>

            {units.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Unités commerciales ajoutées:
                </p>
                <ul className="list-disc list-inside max-h-[400px] overflow-y-auto divide-y divide-gray-400">
                  {units.map((unit, index) => (
                    <li key={index} className="text-sm py-2">
                      <span className="font-bold">Numéro:</span>{" "}
                      {unit.unit_number},
                      <span className="font-bold"> Surface totale:</span>{" "}
                      {unit.surface}m²,
                      <span className="font-bold"> Sous-sol:</span>{" "}
                      {unit.sous_sol}m²,
                      <span className="font-bold"> RDC:</span>{" "}
                      {unit.rez_de_chaussee}m²,
                      <span className="font-bold"> Mezzanine:</span>{" "}
                      {unit.mezzanine}m²,
                      <span className="font-bold"> Prix:</span> {unit.price} Dh
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
