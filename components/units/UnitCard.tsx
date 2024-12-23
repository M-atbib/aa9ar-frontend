import { ApartmentUnit, CommercialUnit } from "@/types/units-type";
import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import Link from "next/link";

export default function UnitCard({
  id,
  unit,
}: {
  id: string;
  unit: ApartmentUnit | CommercialUnit;
}) {
  const formatPrice = (price: number) => {
    if (price >= 1000000000) {
      return `${(price / 1000000000).toFixed(1)}Mrd`;
    } else if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)}M`;
    } else if (price >= 1000) {
      return `${(price / 1000).toFixed(1)}K`;
    }
    return price.toString();
  };

  return (
    <div className="bg-primaryDark w-fit min-w-[250px] p-4 rounded-lg text-white font-extralight space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          {unit.type === "APARTMENT" ? "Appt" : "Com"} {unit.unit_number}
        </h3>
        <p className="text-sm text-secondary font-light">{unit.status}</p>
      </div>
      <div className="space-y-1">
        <p>
          <span className="font-medium">Surface :</span> {unit.surface} m2
        </p>
        <p>
          <span className="font-medium">Prix :</span> {formatPrice(unit.price)}{" "}
          Dh
        </p>
      </div>

      <Link href={`/project/${id}/units/${unit._id}`} className="block">
        <Button className="w-full">
          <EyeIcon className="h-4 w-4" />
          Voir
        </Button>
      </Link>
    </div>
  );
}
