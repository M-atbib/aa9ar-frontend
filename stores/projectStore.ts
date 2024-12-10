import { create } from "zustand";
import { fetchData } from "@/utils/fetchData";
import { toast } from "sonner";
import {
  Project,
  MainInfoForm,
  LegalPaperForm,
  TerrainInfoForm,
  AppartementInfoForm,
  CommercialInfoForm,
  ProjectPartnerForm,
} from "@/types/project-type";

export interface ProjectFormData {
  mainInfo: MainInfoForm;
  legalPaper: LegalPaperForm[];
  terrainInfo: TerrainInfoForm;
  appartementInfo?: AppartementInfoForm;
  commercialInfo?: CommercialInfoForm;
  partner?: ProjectPartnerForm;
}

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  partnershipProjects: Project[];
  isLoading: boolean;
  error: string | null;
  formData: ProjectFormData;
  currentStep: number;
  createProject: (projectData: Omit<Project, "_id">) => Promise<void>;
  getProject: (id: string) => Promise<void>;
  getCompanyProjects: (companyId: string) => Promise<void>;
  getPartnershipProjects: () => Promise<void>;
  updateFormData: (
    step: keyof ProjectFormData,
    data: ProjectFormData[keyof ProjectFormData]
  ) => void;
  nextStep: () => void;
  previousStep: () => void;
  resetForm: () => void;
}

const initialFormData: ProjectFormData = {
  mainInfo: {} as MainInfoForm,
  legalPaper: [] as LegalPaperForm[],
  terrainInfo: {} as TerrainInfoForm,
};

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  currentProject: null,
  partnershipProjects: [],
  isLoading: false,
  error: null,
  formData: initialFormData,
  currentStep: 0,

  updateFormData: (step, data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [step]: data,
      },
    })),

  nextStep: () =>
    set((state) => {
      if (state.currentStep === 0 && !state.formData.mainInfo.paperReady) {
        return { currentStep: state.currentStep + 2 };
      }
      if (state.currentStep === 3 && !state.formData.terrainInfo.commercial) {
        return { currentStep: state.currentStep + 2 };
      }
      if (state.currentStep === 4 && !state.formData.mainInfo.partnership) {
        return { currentStep: state.currentStep + 2 };
      }
      return {
        currentStep: state.currentStep + 1,
      };
    }),

  previousStep: () =>
    set((state) => {
      if (state.currentStep === 2 && !state.formData.mainInfo.paperReady) {
        return {
          currentStep: Math.max(0, state.currentStep - 2),
        };
      }
      if (state.currentStep === 5 && !state.formData.terrainInfo.commercial) {
        return {
          currentStep: Math.max(0, state.currentStep - 2),
        };
      }
      if (state.currentStep === 6 && !state.formData.mainInfo.partnership) {
        return {
          currentStep: Math.max(0, state.currentStep - 2),
        };
      }
      return {
        currentStep: Math.max(0, state.currentStep - 1),
      };
    }),

  resetForm: () =>
    set({
      formData: initialFormData,
      currentStep: 0,
    }),

  createProject: async (projectData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetchData<Project>("/projects", {
        method: "POST",
        body: projectData,
        requiresAuth: true,
      });
      set((state) => ({
        projects: [...state.projects, response.data],
        isLoading: false,
      }));
      toast.success("Project created successfully");
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to create project",
        isLoading: false,
      });
      toast.error(
        error instanceof Error ? error.message : "Failed to create project"
      );
      throw error;
    }
  },

  getProject: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetchData<Project>(`/projects/info/${id}`, {
        method: "GET",
        requiresAuth: true,
      });
      set({
        currentProject: response.data,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch project",
        isLoading: false,
      });
      toast.error(
        error instanceof Error ? error.message : "Failed to fetch project"
      );
      throw error;
    }
  },

  getCompanyProjects: async (companyId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetchData<Project[]>(
        `/projects/company/${companyId}`,
        {
          method: "GET",
          requiresAuth: true,
        }
      );
      set({
        projects: response.data,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch company projects",
        isLoading: false,
      });
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to fetch company projects"
      );
      throw error;
    }
  },

  getPartnershipProjects: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetchData<Project[]>("/projects/partnership", {
        method: "GET",
        requiresAuth: true,
      });
      set({
        partnershipProjects: response.data,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch partnership projects",
        isLoading: false,
      });
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to fetch partnership projects"
      );
      throw error;
    }
  },
}));
