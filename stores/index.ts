import { ValidationError } from "@/types/index-type";
import { create } from "zustand";

interface AppState {
  error: ValidationError | null;
  setError: (error: ValidationError | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  error: null,

  setError: (error: ValidationError | null) => {
    set({ error });
  },
}));
