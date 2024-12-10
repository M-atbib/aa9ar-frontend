"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserInfo from "@/components/profile/UserInfo";
import CompanyInfo from "@/components/profile/CompanyInfo";
import PartnerInfo from "@/components/profile/PartnerInfo";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/authStore";
import { useCompanyStore } from "@/stores/companyStore";

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
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Tableau de bord</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Profile</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

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

        <TabsContent value="user" className="w-full min-h-[calc(100vh-300px)]">
          <UserInfo />
        </TabsContent>
        <TabsContent
          value="company"
          className="w-full min-h-[calc(100vh-300px)]"
        >
          <CompanyInfo />
        </TabsContent>
        <TabsContent
          value="partner"
          className="w-full min-h-[calc(100vh-300px)]"
        >
          <PartnerInfo />
        </TabsContent>
      </Tabs>
    </div>
  );
}
