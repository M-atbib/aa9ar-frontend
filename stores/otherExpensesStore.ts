import { create } from "zustand";
import { fetchData } from "@/utils/fetchData";
import { OtherExpenses } from "@/types/folders-type";

interface ExpensesStore {
  expenses: OtherExpenses[];
  createExpense: (data: Partial<OtherExpenses>) => Promise<OtherExpenses>;
  updateExpense: (
    expenseId: string,
    projectId: string,
    data: Partial<OtherExpenses>
  ) => Promise<OtherExpenses>;
  deleteExpense: (
    expenseId: string,
    projectId: string
  ) => Promise<OtherExpenses>;
  getExpensesRecap: (projectId: string) => Promise<OtherExpenses[]>;
}

export const useExpensesStore = create<ExpensesStore>((set) => ({
  expenses: [],

  getExpensesRecap: async (projectId: string) => {
    try {
      const response = await fetchData<OtherExpenses[]>(
        `/projects/expenses/${projectId}/recap`,
        {
          requiresAuth: true,
        }
      );
      set({ expenses: response.data });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createExpense: async (data: Partial<OtherExpenses>) => {
    try {
      const response = await fetchData<OtherExpenses>(
        `/projects/expenses/${data.project_id}`,
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

  updateExpense: async (
    expenseId: string,
    projectId: string,
    data: Partial<OtherExpenses>
  ) => {
    try {
      const response = await fetchData<OtherExpenses>(
        `/projects/expenses/${expenseId}/${projectId}`,
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

  deleteExpense: async (expenseId: string, projectId: string) => {
    try {
      const response = await fetchData<OtherExpenses>(
        `/projects/expenses/${expenseId}/${projectId}`,
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
