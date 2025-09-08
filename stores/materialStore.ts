import { create } from "zustand";
import { fetchData } from "@/utils/fetchData";
import { Material, Recap } from "@/types/folders-type";

interface MaterialStore {
  materials: Material[];
  recap: Recap[];
  createMaterial: (data: Material) => Promise<Material>;
  getMaterialsByCategory: (
    categoryId: string,
    projectId: string
  ) => Promise<Material[]>;
  updateMaterial: (
    materialId: string,
    projectId: string,
    data: Material
  ) => Promise<Material>;
  deleteMaterial: (materialId: string, projectId: string) => Promise<Material>;
  getMaterialRecap: (projectId: string) => Promise<Recap[]>;
}

export const useMaterialStore = create<MaterialStore>((set) => ({
  materials: [],
  recap: [],

  getMaterialsByCategory: async (categoryId: string, projectId: string) => {
    try {
      const response = await fetchData<Material[]>(
        `/projects/materials/${categoryId}/${projectId}/category`,
        {
          requiresAuth: true,
        }
      );
      set({ materials: response.data });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getMaterialRecap: async (projectId: string) => {
    try {
      const response = await fetchData<Recap[]>(
        `/projects/materials/${projectId}/recap`,
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

  createMaterial: async (data: Material) => {
    try {
      const response = await fetchData<Material>(
        `/projects/materials/${data.project_id}`,
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

  updateMaterial: async (
    materialId: string,
    projectId: string,
    data: Material
  ) => {
    try {
      const response = await fetchData<Material>(
        `/projects/materials/${materialId}/${projectId}`,
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

  deleteMaterial: async (materialId: string, projectId: string) => {
    try {
      const response = await fetchData<Material>(
        `/projects/materials/${materialId}/${projectId}`,
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
