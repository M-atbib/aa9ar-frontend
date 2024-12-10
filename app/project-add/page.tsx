"use client";

import { useProjectStore } from "@/stores/projectStore";
import MainInfo from "@/components/add-project/MainInfo";
import LegalPaper from "@/components/add-project/LegalPaper";
import TerrainInfo from "@/components/add-project/TerrainInfo";
import AppartementInfo from "@/components/add-project/AppartementInfo";
import CommercialInfo from "@/components/add-project/CommercialInfo";
import ProjectPartner from "@/components/add-project/ProjectPartner";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function ProjectAdd() {
  const { currentStep, formData, nextStep, previousStep } = useProjectStore();

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <MainInfo />;
      case 1:
        return formData.mainInfo.paperReady && <LegalPaper />;
      case 2:
        return <TerrainInfo />;
      case 3:
        return <AppartementInfo />;
      case 4:
        return formData.terrainInfo.commercial && <CommercialInfo />;
      case 5:
        return formData.mainInfo.partnership && <ProjectPartner />;
      default:
        return null;
    }
  };

  const handleNextStep = () => {
    nextStep();
  };

  const handlePreviousStep = () => {
    previousStep();
  };

  return (
    <div className="w-[50%] flex flex-col items-center gap-8 mx-auto my-10">
      <Image src="/logo/main.png" alt="logo" width={150} height={150} />

      <div className="w-[80%] space-y-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Tableau de bord</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>Ajouter nouveau projet</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {renderStep()}

        <div className="flex items-center justify-end gap-4">
          {currentStep > 0 && (
            <Button onClick={handlePreviousStep} variant="outline">
              Précédent
            </Button>
          )}
          <Button onClick={handleNextStep} variant="secondary">
            Suivant
          </Button>
        </div>
      </div>
    </div>
  );
}
