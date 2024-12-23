"use client";

import Breadcrumb from "@/components/layout/Breadcrumb";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useUnitsStore } from "@/stores/unitsStore";
import { ApartmentUnit, CommercialUnit } from "@/types/units-type";
import UnitCardSkeleton from "@/components/units/UnitCardSkeleton";
import UnitCard from "@/components/units/UnitCard";

export default function Units() {
  const { id } = useParams();
  const { units, getUnits, isLoading } = useUnitsStore();

  useEffect(() => {
    getUnits(id as string);
  }, [getUnits, id]);

  return (
    <div className="space-y-8">
      <Breadcrumb
        items={[
          { link: `/project/${id}`, title: "Détails du projet" },
          { link: "", title: "Unités" },
        ]}
      />

      <h1 className="text-3xl font-bold">Unités</h1>

      <div className="space-y-4">
        <h2 className="text-2xl font-medium">Appartements</h2>
        <div className="flex flex-wrap gap-4">
          {isLoading ? (
            <>
              <UnitCardSkeleton />
              <UnitCardSkeleton />
              <UnitCardSkeleton />
            </>
          ) : (
            units.apartments.map((unit: ApartmentUnit) => (
              <UnitCard key={unit._id} id={id as string} unit={unit} />
            ))
          )}
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-medium">Commercial</h2>
        <div className="flex flex-wrap gap-4">
          {isLoading ? (
            <>
              <UnitCardSkeleton />
              <UnitCardSkeleton />
              <UnitCardSkeleton />
            </>
          ) : (
            units.commercial.map((unit: CommercialUnit) => (
              <UnitCard key={unit._id} id={id as string} unit={unit} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
