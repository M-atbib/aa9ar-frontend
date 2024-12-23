import { ProjectUnits } from "@/types/units-type";
import { fetchData } from "@/utils/fetchData";
import { create } from "zustand";

interface UnitsState {
  units: ProjectUnits;
  error: string | null;
  isLoading: boolean;
  getUnits: (projectId: string) => Promise<void>;
}

export const useUnitsStore = create<UnitsState>((set) => ({
  units: { apartments: [], commercial: [] } as ProjectUnits,
  error: null,
  isLoading: false,

  getUnits: async (projectId: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await fetchData<ProjectUnits>(
        `/projects/${projectId}/units`,
        {
          method: "GET",
          requiresAuth: true,
        }
      );
      set({ units: response.data, isLoading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch project",
        isLoading: false,
      });
    }
  },
}));
