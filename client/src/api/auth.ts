/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axios, { AxiosResponse } from "axios";

interface User {
  id: string;
  uid: string;
  email: string | null;
  name: string | null;
  role: string | null;
  token: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isSignedup: boolean;
  signup: (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
  signin: (
    email: string,
    password: string
  ) => Promise<AxiosResponse<any, any> | undefined>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isSignedup: false,
  loading: false,
  error: null,

  signup: async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/signup",
        { name, email, password, confirmPassword }
      );
      set({ user: response.data.user, loading: false });
      sessionStorage.setItem("token", response.data.token);
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Signup failed",
        loading: false,
      });
    }
  },

  signin: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/signin",
        { email, password }
      );
      set({ user: response.data.user, loading: false });
      sessionStorage.setItem("token", response.data.token);
      return response;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Signin failed",
        loading: false,
      });
    }
  },

  update_profile: async (name: string, password: string, id: string) => {
    set({ loading: true, error: null });
    try {
      const token = sessionStorage.getItem("token")?.trim()?.toString();
      const response = await axios.post(
        `http://localhost:3000/api/v1/user/update/${id}`,
        { name, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ user: response.data.user, loading: false });
      return response;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "update failed",
        loading: false,
      });
    }
  },

  logout: () => {
    set({ user: null });
    sessionStorage.removeItem("token");
  },
}));
