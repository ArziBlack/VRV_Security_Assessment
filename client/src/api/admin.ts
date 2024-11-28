/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axios from "axios";
import { IGetAllUsers, IVerifyUser } from "../interfaces/user";

interface AdminState {
  users: User[];
  loading: boolean;
  error: string | null;
  getAllUsers: () => Promise<IGetAllUsers>;
  getModAllUsers: () => Promise<IGetAllUsers>;
  verifyUser: (id: number) => Promise<IVerifyUser>;
}

interface User {
  id: string;
  email: string;
  role: string;
}

export const useAdminStore = create<AdminState>((set) => ({
  users: [],
  loading: false,
  error: null,

  getAllUsers: async () => {
    set({ loading: true, error: null });
    try {
      const token = sessionStorage.getItem("token")?.trim()?.toString();
      const response = await axios.get(
        "http://localhost:3000/api/v1/admin/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ users: response.data.data, loading: false });
      return response.data;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch users",
        loading: false,
      });
    }
  },
  getModAllUsers: async () => {
    set({ loading: true, error: null });
    try {
      const token = sessionStorage.getItem("token")?.trim()?.toString();
      const response = await axios.get(
        "http://localhost:3000/api/v1/admin/mod_all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ users: response.data.data, loading: false });
      return response.data;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch users",
        loading: false,
      });
    }
  },

  verifyUser: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const token = sessionStorage.getItem("token")?.trim()?.toString();
      const response = await axios.get(
        `http://localhost:3000/api/v1/admin/${id}/verify`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ users: response.data.data, loading: false });
      return response.data;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch users",
        loading: false,
      });
    }
  },
}));
