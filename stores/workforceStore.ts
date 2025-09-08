import { create } from "zustand";
import { fetchData } from "@/utils/fetchData";
import { Recap, Workforce } from "@/types/folders-type";

interface WorkforceStore {
  workforce: Workforce[];
  recap: Recap[];
  createWorkforce: (data: Partial<Workforce>) => Promise<Workforce>;
  getWorkforceByCategory: (
    categoryId: string,
    projectId: string
  ) => Promise<Workforce[]>;
  updateWorkforce: (
    workforceId: string,
    projectId: string,
    data: Workforce
  ) => Promise<Workforce>;
  deleteWorkforce: (
    workforceId: string,
    projectId: string
  ) => Promise<Workforce>;
  getWorkforceRecap: (projectId: string) => Promise<Recap[]>;
}

export const useWorkforceStore = create<WorkforceStore>((set) => ({
  workforce: [],
  recap: [],

  getWorkforceRecap: async (projectId: string) => {
    try {
      const response = await fetchData<Recap[]>(
        `/projects/workforce/${projectId}/recap`,
        {
          requiresAuth: true,
        }
      );
      set({ recap: response.data });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getWorkforceByCategory: async (categoryId: string, projectId: string) => {
    try {
      const response = await fetchData<Workforce[]>(
        `/projects/workforce/${categoryId}/${projectId}/category`,
        {
          requiresAuth: true,
        }
      );
      set({ workforce: response.data });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createWorkforce: async (data: Partial<Workforce>) => {
    try {
      const response = await fetchData<Workforce>(
        `/projects/workforce/${data.project_id}`,
        {
          method: "POST",
          body: data,
          requiresAuth: true,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateWorkforce: async (
    workforceId: string,
    projectId: string,
    data: Workforce
  ) => {
    try {
      const response = await fetchData<Workforce>(
        `/projects/workforce/${workforceId}/${projectId}`,
        {
          method: "PUT",
          body: data,
          requiresAuth: true,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteWorkforce: async (workforceId: string, projectId: string) => {
    try {
      const response = await fetchData<Workforce>(
        `/projects/workforce/${workforceId}/${projectId}`,
        {
          method: "DELETE",
          requiresAuth: true,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
}));
