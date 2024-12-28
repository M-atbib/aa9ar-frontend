import { create } from "zustand";
import { fetchData } from "@/utils/fetchData";
import {
  Project,
  CreateProjectPayload,
  ProjectKpis,
  ProjectUnit,
} from "@/types/project-type";

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  partnershipProjects: Project[];
  isLoading: boolean;
  error: string | null;
  formData: CreateProjectPayload;
  currentStep: number;
  paperReady: boolean;
  commercial: boolean;
  partnership: boolean;
  projectKpis: ProjectKpis;
  updateFormData: <K extends keyof CreateProjectPayload>(
    field: K,
    value: CreateProjectPayload[K]
  ) => void;
  nextStep: () => void;
  previousStep: () => void;
  resetForm: () => void;
  createProject: (projectData: CreateProjectPayload) => Promise<string>;
  getProject: (id: string) => Promise<void>;
  getCompanyProjects: (companyId: string) => Promise<void>;
  getProjectKpis: (id: string) => Promise<void>;
  getPartnershipProjects: () => Promise<void>;
  setCheckbox: (checkbox: string, value: boolean) => void;
  addUnit: (unit: ProjectUnit) => void;
}

const initialFormData: CreateProjectPayload = {
  company_id: "",
  name: "",
  address: "",
  city: "",
  status: "PLANNING",
  total_budget: 0,
  current_expenses: 0,
  start_date: "",
  end_date: "",
  terrain: {
    surface: 0,
    price: 0,
    borders: 0,
    number_of_floors: 0,
  },
  global_apartments_info: {
    count: 0,
    profit_margin: 0,
  },
  global_commercial_info: {
    count: 0,
    profit_margin: 0,
  },
  units: [],
  legalPapers:[],
  partners:[],
  number_of_partners:0
};

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  partners: [], 
  legalPapers: [], 
  number_of_partners:0,
  currentProject: null,
  partnershipProjects: [],
  isLoading: false,
  error: null,
  formData: initialFormData,
  currentStep: 0,
  paperReady: false,
  commercial: false,
  partnership: false,
  projectKpis: {} as ProjectKpis,

  updateFormData: (field, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    })),

  setCheckbox: (checkbox, value) =>
    set(() => ({
      [checkbox]: value,
    })),

  nextStep: () =>
    set((state) => {
      if (state.currentStep === 0 && !state.paperReady) {
        return { currentStep: state.currentStep + 2 };
      }
      if (state.currentStep === 3 && !state.commercial) {
        return { currentStep: state.currentStep + 2 };
      }
      if (state.currentStep === 4 && !state.partnership) {
        return { currentStep: state.currentStep + 2 };
      }
      return {
        currentStep: state.currentStep + 1,
      };
    }),

  previousStep: () =>
    set((state) => {
      if (state.currentStep === 2 && !state.paperReady) {
        return {
          currentStep: Math.max(0, state.currentStep - 2),
        };
      }
      if (state.currentStep === 5 && !state.commercial) {
        return {
          currentStep: Math.max(0, state.currentStep - 2),
        };
      }
      if (state.currentStep === 4 && !state.partnership) {
        return { currentStep: state.currentStep + 2 };
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

  createProject: async (projectData: CreateProjectPayload) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetchData<Project>("/projects", {
        method: "POST",
        body: projectData,
        requiresAuth: true,
      });
      
      const newProject = response.data;

    set((state) => ({
      projects: [...state.projects, newProject],
      isLoading: false,
    }));

    return newProject.id; 
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to create project",
        isLoading: false,
      });
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
      throw error;
    }
  },

  getProjectKpis: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetchData<ProjectKpis>(`/projects/${id}/kpis`, {
        method: "GET",
        requiresAuth: true,
      });
      set({
        projectKpis: response.data,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch project kpis",
        isLoading: false,
      });

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
      throw error;
    }
  },

  addUnit: (unit: ProjectUnit) =>
    set((state) => ({
      formData: {
        ...state.formData,
        units: [...state.formData.units, unit],
      },
    })),
}));
