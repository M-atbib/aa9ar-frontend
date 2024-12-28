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
import { useInviteStore } from "@/stores/invitesStore";
import { useDocumentStore } from "@/stores/documentStore";
import { useRouter } from "next/navigation";

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
  const { inviteProjectPartner ,respondToProjectInvite} = useInviteStore();
  const { uploadProjectDocuments } = useDocumentStore();
  const router = useRouter();

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
      try {
        const projectId = await createProject(formData);
        console.log("Created Project ID:", projectId);

        if (formData.partners && formData.partners.length > 0) {
          console.log("Inviting partners...");
          const promises = formData.partners.map((partner) =>
            inviteProjectPartner(projectId, partner.email, partner.percentage).then(() => {
              console.log(`Invitation sent to ${partner.email}, auto-accepting...`);
              return respondToProjectInvite(partner.email, "accept");
            })
            .then(() => {
              console.log(`Invitation auto-accepted for ${partner.email}`);
            })
            .catch((error) => {
              console.error(`Error handling invite for ${partner.email}:`, error);
            })
          );
          await Promise.all(promises);
          console.log("All partners invited successfully!");
        }

        // Upload legal documents
        // if (formData.legalPapers && formData.legalPapers.length > 0) {
        //   console.log("Uploading legal documents...");
        //   console.log(formData.legalPapers);
        //   const uploadPromises = formData.legalPapers.map((legalPaper) =>
        //     uploadProjectDocuments(projectId, legalPaper, 'LEGAL').catch((err) => {
        //       console.error(`Error uploading document ${legalPaper.name}:`, err);
        //     })
        //   );
        //   await Promise.all(uploadPromises);
        //   console.log("All documents uploaded successfully!");
        // }

        alert("Project created successfully with all documents and partners!");
        router.push("/dashboard");


      } catch (error) {
        console.error("Error during project creation process:", error);
        alert("An error occurred while creating the project.");
      }
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
