import { create } from "zustand";
import { fetchData } from "@/utils/fetchData";
import {
  LoginData,
  LoginResponse,
  RegisterResponse,
  User,
} from "@/types/auth-type";
import { RegisterData } from "@/types/auth-type";
import { toast } from "sonner";
import Cookies from "js-cookie";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isTokenExpired: boolean;
  isLoading: boolean;
  error: string | null;
  accessToken: string;
  expiresAt: number | null;
  refreshToken: string;
  register: (data: RegisterData) => Promise<void>;
  login: (data: LoginData) => Promise<LoginResponse>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<User>;
  refreshTokenHandler: () => Promise<string>;
  setIsTokenExpired: (value: boolean) => void;
  setToken: (accessToken: string, refreshToken: string) => void;
  setExpiresAt: (expiresAt: number) => void;
  clearToken: () => void;
  googleAuth: () => Promise<void>;
  googleCallback: () => Promise<void>;
  updateUser: (data: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
  }) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isTokenExpired: false,
  isLoading: false,
  error: null,
  accessToken: "",
  refreshToken: "",
  expiresAt: 7,

  setIsTokenExpired: (value: boolean) => {
    set({ isTokenExpired: value });
  },

  setExpiresAt: (expiresAt: number) => {
    set({ expiresAt });
  },

  setToken: (accessToken: string, refreshToken: string) => {
    Cookies.set("token", accessToken, { expires: 1 });
    Cookies.set("refreshToken", refreshToken, { expires: 30 });
    set({ accessToken, refreshToken });
  },

  clearToken: () => {
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    set({ accessToken: "", refreshToken: "" });
  },

  fetchUser: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetchData<User>("/me", {
        method: "GET",
        requiresAuth: true,
      });
      set({
        user: response.data,
        isAuthenticated: true,
        isLoading: false,
      });
      return response.data as User;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch user",
        isLoading: false,
      });
      throw error;
    }
  },

  updateUser: async (data: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
  }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetchData<User>("/user/update", {
        method: "POST",
        body: data,
        requiresAuth: true,
      });
      set({
        user: response.data,
        isLoading: false,
      });
      toast.success("Profile updated successfully");
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to update user",
        isLoading: false,
      });
      toast.error(
        error instanceof Error ? error.message : "Failed to update user"
      );
      throw error;
    }
  },

  refreshTokenHandler: async (): Promise<string> => {
    try {
      const currentRefreshToken = Cookies.get("refreshToken");
      const response = await fetchData<{ access_token: string }>(
        "/auth/refresh",
        {
          method: "POST",
          body: { refresh_token: currentRefreshToken },
        }
      );

      Cookies.set("token", response.data.access_token, { expires: 1 });
      set({ accessToken: response.data.access_token });

      return response.data.access_token;
    } catch (error) {
      useAuthStore.getState().clearToken();
      set({
        user: null,
        isAuthenticated: false,
        error: error instanceof Error ? error.message : "Token refresh failed",
        isLoading: false,
      });
      window.location.href = "/login";
      throw error;
    }
  },

  register: async (data: RegisterData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetchData("/auth/register", {
        method: "POST",
        body: data,
      });

      set({
        accessToken: (response.data as RegisterResponse).access_token,
        isAuthenticated: true,
        isLoading: false,
      });
      toast.success("Compte créé avec succès");
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Registration failed",
        isLoading: false,
      });
      toast.error(
        error instanceof Error ? error.message : "Registration failed"
      );
      throw error;
    }
  },

  login: async (data: LoginData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetchData("/auth/login", {
        method: "POST",
        body: data,
      });

      const { access_token, refresh_token } = response.data as LoginResponse;

      if (!access_token || !refresh_token) {
        throw new Error("Missing tokens in response");
      }

      useAuthStore.getState().setToken(access_token, refresh_token);

      set({
        isAuthenticated: true,
        isLoading: false,
      });
      toast.success("Connexion réussie");

      return response.data as LoginResponse;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Login failed",
        isLoading: false,
      });
      toast.error(error instanceof Error ? error.message : "Login failed");
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await fetchData("/logout", {
        method: "POST",
      });

      // Clear the token
      useAuthStore.getState().clearToken();
      window.location.href = "/";

      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      toast.success("Déconnexion réussie");
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Logout failed",
        isLoading: false,
      });
      toast.error(error instanceof Error ? error.message : "Logout failed");
      throw error;
    }
  },

  googleAuth: async () => {
    set({ isLoading: true, error: null });
    try {
      await fetchData("/google", {
        method: "GET",
      });
      set({ isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Google auth failed",
        isLoading: false,
      });
      throw error;
    }
  },

  googleCallback: async () => {
    set({ isLoading: true, error: null });
    try {
      await fetchData("/google/callback", {
        method: "GET",
      });
      set({ isLoading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Google callback failed",
        isLoading: false,
      });
      throw error;
    }
  },
}));
