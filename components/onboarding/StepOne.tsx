"use client";

import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IoMdArrowForward } from "react-icons/io";
import { useOnboardingStore } from "@/stores/onboardingStore";
import { FormEvent, useState } from "react";

export default function StepOne() {
  const { setStep, createCompany, isLoading } = useOnboardingStore();
  const [companyName, setCompanyName] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createCompany(companyName, city);
    } catch (error) {
      console.error("Failed to create company", error);
    }
    setStep(2);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl tracking-wide font-bold">
        Configuration des informations sur l&apos;entreprise
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4 w-[50%]">
        <div>
          <Label className="text-sm">Nom de l&apos;entreprise</Label>
          <Input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Entrez le nom de l'entreprise"
          />
        </div>
        <div>
          <Label className="text-sm">Emplacement</Label>
          <Input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Entrez l'emplacement de l'entreprise"
          />
        </div>

        <Button
          type="submit"
          variant="ghost"
          className="float-right text-primary font-semibold"
          disabled={isLoading}
        >
          {isLoading ? "Suivant..." : "Suivant"}
          {!isLoading && <IoMdArrowForward />}
        </Button>
      </form>
    </div>
  );
}
