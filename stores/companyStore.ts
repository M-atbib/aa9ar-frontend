import { create } from "zustand";
import { fetchData } from "@/utils/fetchData";
import { toast } from "sonner";
import { Company, CompanyKPI } from "@/types/company-type";
import Cookies from "js-cookie";

interface CompanyState {
  company: Company;
  isLoading: boolean;
  error: string | null;
  projectPartners: [];
  companyKpis: CompanyKPI[];
  getCompanies: () => Promise<Company>;
  updateCompany: (id: string, data: Partial<Company>) => Promise<void>;
  deleteCompany: (id: string) => Promise<void>;
  getProjectPartners: () => Promise<void>;
  getCompayKpis: () => Promise<void>;
}

export const useCompanyStore = create<CompanyState>((set) => ({
  company: {} as Company,
  projectPartners: [],
  isLoading: false,
  error: null,
  companyKpis: [],

  getCompanies: async () => {
  console.log('token getCompanies',Cookies.get("token"));

    set({ isLoading: true, error: null });
    try {
      const response = await fetchData<Company>("/companies", {
        method: "GET",
        requiresAuth: true,
      });
      set({ company: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch companies",
        isLoading: false,
      });
      toast.error(
        error instanceof Error ? error.message : "Failed to fetch companies"
      );
      throw error;
    }
  },

  getProjectPartners: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetchData<[]>("/projects/project-partners", {
        method: "GET",
        requiresAuth: true,
      });
      set({ projectPartners: response.data, isLoading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch project partners",
        isLoading: false,
      });
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to fetch project partners"
      );
      throw error;
    }
  },

  updateCompany: async (id: string, data: Partial<Company>) => {
    set({ isLoading: true, error: null });
    try {
      await fetchData(`/companies/${id}`, {
        method: "PUT",
        body: data,
        requiresAuth: true,
      });
      set((state) => ({
        company: state.company
          ? { ...state.company, ...data }
          : ({} as Company),
        isLoading: false,
      }));
      toast.success("Company updated successfully");
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to update company",
        isLoading: false,
      });
      toast.error(
        error instanceof Error ? error.message : "Failed to update company"
      );
      throw error;
    }
  },

  deleteCompany: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await fetchData(`/companies/${id}`, {
        method: "DELETE",
        requiresAuth: true,
      });
      set((state) => ({
        company: state.company ? ({} as Company) : ({} as Company),
        isLoading: false,
      }));
      toast.success("Company deleted successfully");
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to delete company",
        isLoading: false,
      });
      toast.error(
        error instanceof Error ? error.message : "Failed to delete company"
      );
      throw error;
    }
  },

  getCompayKpis: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetchData<CompanyKPI[]>("/companies/kpis", {
        method: "GET",
        requiresAuth: true,
      });
      set({ companyKpis: response.data, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch kpis",
        isLoading: false,
      });
      toast.error(
        error instanceof Error ? error.message : "Failed to fetch kpis"
      );
      throw error;
    }
  },
}));
