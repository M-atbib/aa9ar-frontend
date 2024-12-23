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
import Breadcrumb from "@/components/layout/Breadcrumb";
import { useCompanyStore } from "@/stores/companyStore";
import { useEffect } from "react";

export default function ProjectAdd() {
  const {
    currentStep,
    paperReady,
    commercial,
    partnership,
    formData,
    isLoading,
    nextStep,
    previousStep,
    createProject,
    updateFormData,
  } = useProjectStore();

  const { getCompanies } = useCompanyStore();

  useEffect(() => {
    const fetchData = async () => {
      const companyId = await getCompanies();
      if (companyId) {
        updateFormData("company_id", companyId.id);
      }
    };
    fetchData();
  }, [getCompanies, updateFormData]);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <MainInfo />;
      case 1:
        return paperReady && <LegalPaper />;
      case 2:
        return <TerrainInfo />;
      case 3:
        return <AppartementInfo />;
      case 4:
        return commercial && <CommercialInfo />;
      case 5:
        return partnership && <ProjectPartner />;
      default:
        return null;
    }
  };

  const isLastStep = () => {
    if (!commercial && !partnership && currentStep === 3) return true;
    if (commercial && !partnership && currentStep === 4) return true;
    if (partnership && currentStep === 5) return true;
    return false;
  };

  const handlePreviousStep = () => {
    previousStep();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLastStep() && formData.company_id !== "") {
      console.log(isLastStep());
      await createProject(formData);
    }
  };

  return (
    <div className="container-md max-w-screen-md flex flex-col items-center gap-8 mx-auto my-10">
      <Image src="/logo/main.png" alt="logo" width={150} height={150} />

      <div className="w-[100%] space-y-6">
        <Breadcrumb items={[{ link: "", title: "Ajouter nouveau projet" }]} />

        <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
          {renderStep()}

          <div className="flex items-center justify-end gap-4">
            {currentStep > 0 && (
              <Button onClick={handlePreviousStep} variant="outline">
                Précédent
              </Button>
            )}
            {isLastStep() ? (
              <Button type="submit" variant="secondary">
                {isLoading ? "En cours..." : "Ajouter projet"}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  nextStep();
                }}
                variant="secondary"
              >
                Suivant
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
