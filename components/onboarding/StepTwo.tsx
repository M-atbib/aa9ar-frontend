"use client";

import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "../ui/input";
import { useOnboardingStore } from "@/stores/onboardingStore";
import { FormEvent, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { useRouter } from "next/navigation";

export default function StepTwo() {
  const { setStep, finalizeOnboarding, isLoading } = useOnboardingStore();
  const [email, setEmail] = useState("");
  const [percentage, setPercentage] = useState("");
  const [hasPartner, setHasPartner] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (hasPartner) {
        await finalizeOnboarding(email, Number(percentage));
      }
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to save partner info", error);
    }
  };

  return (
    <div className="space-y-8">
      <Button
        variant="ghost"
        className="flex items-center gap-2"
        onClick={() => setStep(1)}
      >
        <IoMdArrowBack />
        Retour
      </Button>

      <h1 className="text-4xl tracking-wide font-bold">
        Configuration pour les partenaires de l&apos;entreprise
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4 w-[50%]">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="hasPartner"
            checked={hasPartner}
            onCheckedChange={(checked) => setHasPartner(checked as boolean)}
          />
          <label
            htmlFor="hasPartner"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Confirmer le partenaire existant
          </label>
        </div>

        <div>
          <Label className="text-sm">Adresse email</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Entrez l'adresse email du partenaire"
            disabled={!hasPartner}
          />
        </div>
        <div>
          <Label className="text-sm">Pourcentage de partenaire</Label>
          <Input
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            placeholder="Entrez le pourcentage"
            type="number"
            disabled={!hasPartner}
          />
        </div>

        <Button type="submit" className="float-right " disabled={isLoading}>
          {isLoading ? "Terminer l'intégration..." : "Terminer l'intégration"}
          {!isLoading && <IoMdArrowForward />}
        </Button>
      </form>
    </div>
  );
}
