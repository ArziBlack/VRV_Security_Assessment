/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axios, { AxiosResponse } from "axios";

interface AdminState {
  users: User[];
  loading: boolean;
  error: string | null;
  getAllUsers: () => Promise<AxiosResponse<any, any> | undefined>;
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
      return response;
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch users",
        loading: false,
      });
    }
  },
}));
