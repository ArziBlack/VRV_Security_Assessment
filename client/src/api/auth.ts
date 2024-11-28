/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axios, { AxiosResponse } from "axios";
import { ISignupResponse, ISigninResponse } from "../interfaces/auth";

interface User {
  id: string;
  uid: string;
  email: string | null;
  name: string | null;
  role: string | null;
  token: string;
  country: string;
  phone: string;
  homeAddress: string;
  state: string;
  city: string;
  isVerified: boolean;
  organisation: string;
  suspended: boolean;
  zipCode: string;
  profileImage: string;
  techUsed: string;
  certifications: string[];
  areasOfFocus: string[];
  achievements: string[];
  createdAt: string;
  updatedAt: string;
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
    confirmPassword: string,
    country: string,
    phone: string,
    state: string,
    homeAddress: string
  ) => Promise<ISignupResponse>;
  signin: (email: string, password: string) => Promise<ISigninResponse>;
  update_profile: (
    field: object,
    id: string
  ) => Promise<AxiosResponse<any, any> | undefined>;
  logout: () => void;
}

const user = JSON.parse(sessionStorage.getItem("user") || "null") as User;

export const useAuthStore = create<AuthState>((set) => ({
  user: user || null,
  isAuthenticated: false,
  isSignedup: false,
  loading: false,
  error: null,

  signup: async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    country: string,
    phone: string,
    state: string,
    homeAddress: string
  ): Promise<ISignupResponse> => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/signup",
        {
          name,
          email,
          password,
          confirmPassword,
          country,
          phone,
          state,
          homeAddress,
        }
      );
      if (response.data)
        set({ user: response.data.data, loading: false, isSignedup: true });
      sessionStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Signup failed",
        loading: false,
      });
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
      sessionStorage.setItem("user", JSON.stringify(response.data.data));
      return response.data;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Signin failed",
        loading: false,
      });
      return error.response?.data;
    }
  },

  update_profile: async (field: object, id: string) => {
    set({ loading: true, error: null });
    try {
      const token = sessionStorage.getItem("token")?.trim()?.toString();
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
    set({ user: null, isSignedup: false, isAuthenticated: false });
    sessionStorage.removeItem("token");
  },
}));
