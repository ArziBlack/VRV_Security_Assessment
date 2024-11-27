/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axios, { AxiosResponse } from "axios";
import { ISignupResponse } from "../interfaces/auth";

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
  ) => Promise<ISignupResponse>;
  signin: (
    email: string,
    password: string
  ) => Promise<AxiosResponse<any, any> | undefined>;
  update_profile: (
    field: object,
    id: string
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
      set({ user: response.data.data, loading: false });
      sessionStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Signup failed",
        loading: false,
      });
      console.log(error.response?.data);
      return error.response?.data;
    }
  },

  signin: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/signin",
        { email, password }
      );
      set({ user: response.data.data, loading: false, isAuthenticated: true });
      sessionStorage.setItem("token", response.data.data.token);
      return response;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Signin failed",
        loading: false,
      });
    }
  },

  update_profile: async (field: object, id: string) => {
    set({ loading: true, error: null });
    try {
      const token = sessionStorage.getItem("token")?.trim()?.toString();
      console.log(token);
      const response = await axios.put(
        `http://localhost:3000/api/v1/user/update/${id}`,
        field,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ user: response.data.data, loading: false });
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
