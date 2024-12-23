"use client";

import { Button } from "../ui/button";

export default function StepThree() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl tracking-wide font-semibold">
        Vous avez été invité(e) à rejoindre l&apos;entreprise par <br />
        <span className="font-bold">{/*partnerName*/}</span>
      </h1>

      <div className="flex justify-center gap-4">
        <Button>Accepter l&apos;invitation</Button>
        <Button className="bg-red-500 text-white">
          Refuser l&apos;invitation
        </Button>
      </div>
    </div>
  );
}
