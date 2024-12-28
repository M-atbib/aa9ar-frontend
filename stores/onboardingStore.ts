import { create } from "zustand";
import { fetchData } from "@/utils/fetchData";
import { Company } from "@/types/company-type";
import { useInviteStore } from "./invitesStore";

interface OnboardingStore {
  step: number;
  isLoading: boolean;
  error: string | null;
  setStep: (step: number) => void;
  createCompany: (name: string, city: string) => Promise<void>;
  finalizeOnboarding: (
    partnerEmail: string,
    percentage: number
  ) => Promise<void>;
}

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  step: 1,
  isLoading: false,
  error: null,

  setStep: (step: number) => set({ step }),

  finalizeOnboarding: async (partnerEmail: string, percentage: number) => {
    try {
      set({ isLoading: true, error: null });

      // Send invitation to partner
      const { sendInvitation } = useInviteStore.getState();
      await sendInvitation(partnerEmail, percentage);
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "An error occurred",
      });
      throw error;
    }
  },

  createCompany: async (name: string, city: string) => {
    try {
      set({ isLoading: true, error: null });

      await fetchData<Company>("/companies", {
        method: "POST",
        body: {
          name,
          city,
          associates: [],
        },
        requiresAuth: true,
      });

      set({ isLoading: false });
      // toast.success(response.message);
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "An error occurred",
      });
    }
  },
}));
