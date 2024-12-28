import { create } from "zustand";
import { fetchData } from "@/utils/fetchData";
import { CompanyInvite } from "@/types/invites-type";

interface InviteState {
  isLoading: boolean;
  error: string | null;
  invitations?: CompanyInvite[];
  sendInvitation: (email: string, percentage: number) => Promise<void>;
  respondToInvitation: (
    token: string,
    action: "accept" | "reject"
  ) => Promise<void>;
  inviteProjectPartner: (
    projectId: string,
    email: string,
    percentage: number
  ) => Promise<void>;
  respondToProjectInvite: (
    email: string,
    action: "accept" | "reject"
  ) => Promise<void>;
  getInvitation: (id: string) => Promise<void>;
  getCompanyInvitations: (companyId: string) => Promise<void>;
  deleteInvitation: (invitationId: string) => Promise<void>;
  checkInvitationExists: (token: string) => Promise<void>;
}

export const useInviteStore = create<InviteState>((set) => ({
  isLoading: false,
  error: null,
  invitations: [], // Initialize invitations in the state

  // doesnt exist in the backend
  getInvitation: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      await fetchData(`/invitations/${id}`, {
        method: "GET",
        requiresAuth: true,
      });
      set({ isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "An error occurred",
      });
      throw error;
    }
  },

  getCompanyInvitations: async (companyId: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await fetchData(`/companies/${companyId}/invitations`, {
        method: "GET",
        requiresAuth: true,
      });
      set({
        isLoading: false,
        invitations: response.data as CompanyInvite[],
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "An error occurred",
        invitations: [],
      });
      throw error;
    }
  },

  deleteInvitation: async (invitationId: string) => {
    try {
      set({ isLoading: true, error: null });
      await fetchData(`/invitations/${invitationId}`, {
        method: "DELETE",
        requiresAuth: true,
      });
      set({ isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "An error occurred",
      });
      throw error;
    }
  },

  checkInvitationExists: async (token: string) => {
    try {
      set({ isLoading: true, error: null });
      await fetchData(`/invitations/check/${token}`, {
        method: "GET",
        requiresAuth: true,
      });
      set({ isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "An error occurred",
      });
      throw error;
    }
  },

  sendInvitation: async (email: string, percentage: number) => {
    try {
      set({ isLoading: true, error: null });
      await fetchData("/invitations/send", {
        method: "POST",
        body: { email, percentage },
        requiresAuth: true,
      });
      set({ isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "An error occurred",
      });
      throw error;
    }
  },

  respondToInvitation: async (token: string, action: "accept" | "reject") => {
    try {
      set({ isLoading: true, error: null });
      await fetchData(`/invitations/respond/${token}/${action}`, {
        method: "POST",
        requiresAuth: true,
      });
      set({ isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "An error occurred",
      });
      throw error;
    }
  },

  inviteProjectPartner: async (
    projectId: string,
    email: string,
    percentage: number
  ) => {
    try {
      set({ isLoading: true, error: null });
      await fetchData(`/projects/${projectId}/partners/invite`, {
        method: "POST",
        body: { email, percentage },
        requiresAuth: true,
      });
      set({ isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "An error occurred",
      });
      throw error;
    }
  },

  respondToProjectInvite: async (
    email: string,
    action: "accept" | "reject"
  ) => {
    try {
      set({ isLoading: true, error: null });
      await fetchData(`/project-partners/respond/${email}/${action}`, {
        method: "POST",
        requiresAuth: true,
      });
      set({ isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "An error occurred",
      });
      throw error;
    }
  },
}));
