"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserInfo from "@/components/profile/UserInfo";
import CompanyInfo from "@/components/profile/CompanyInfo";
import PartnerInfo from "@/components/profile/PartnerInfo";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useCompanyStore } from "@/stores/companyStore";
import Breadcrumb from "@/components/layout/Breadcrumb";

export default function Profile() {
  const { fetchUser } = useAuthStore();
  const { getCompanies, getProjectPartners } = useCompanyStore();

  useEffect(() => {
    const loadData = async () => {
      await fetchUser();
      await getCompanies();
      await getProjectPartners();
    };
    loadData();
  }, [fetchUser, getCompanies, getProjectPartners]);
  
  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ link: "", title: "Profile" }]} />

      <h1 className="text-2xl font-bold">Informations sur le profil</h1>

      <Tabs defaultValue="user" className="w-fit ">
        <TabsList className="grid w-full grid-cols-3 mb-5">
          <TabsTrigger value="user">
            Informations de l&apos;utilisateur
          </TabsTrigger>
          <TabsTrigger value="company">
            Informations de l&apos;entreprise
          </TabsTrigger>
          <TabsTrigger value="partner">Informations du partenaire</TabsTrigger>
        </TabsList>

        <TabsContent value="user" className="w-full ">
          <UserInfo />
        </TabsContent>
        <TabsContent value="company" className="w-full ">
          <CompanyInfo />
        </TabsContent>
        <TabsContent value="partner" className="w-full ">
          <PartnerInfo />
        </TabsContent>
      </Tabs>
    </div>
  );
}
