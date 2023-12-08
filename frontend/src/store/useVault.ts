/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axiosInstance from "../utils/axios";
import wait from "wait";

interface IVaultStore {
  loading: boolean;
  vaults: IVault[];
  getVaults: () => Promise<any>;
  addVault: (name: string, data: any, onAfter?: () => void) => Promise<any>;
  updateVault: (
    id: string,
    name: string,
    data: any,
    onAfter?: () => void
  ) => Promise<any>;
  deleteVault: (id: string) => Promise<any>;
}
export interface IVault {
  id: number;
  name: string;
  data: any;
  created_at: string;
  updated_at: string;
}

const useVaultStore = create<IVaultStore>((set, get) => ({
  loading: false,
  vaults: [],
  getVaults: async () => {
    try {
      if (get().loading) return;
      set({ loading: true });
      const { data } = await axiosInstance().get("/vaults");
      if (data.data) {
        set({ vaults: data.data, loading: false });
        return data.data;
      }
    } catch (error) {
      set({ loading: false });
    }
  },
  addVault: async (name, payload, onAfter) => {
    try {
      if (get().loading) return;
      set({ loading: true });
      const { data } = await axiosInstance().post("/vaults", {
        name,
        data: JSON.parse(payload),
      });
      if (data.success) {
        set({ loading: false });
        onAfter?.();
        await wait(500);
        return get().getVaults();
      }
    } catch (error) {
      set({ loading: false });
    }
  },
  updateVault: async (id, name, payload, onAfter) => {
    try {
      if (get().loading) return;
      set({ loading: true });
      const { data } = await axiosInstance().put(`/vaults/${id}`, {
        name,
        data: JSON.parse(payload),
      });
      if (data.success) {
        set({ loading: false });
        onAfter?.();
        await wait(500);
        return get().getVaults();
      }
    } catch (error) {
      set({ loading: false });
    }
  },
  deleteVault: async (id) => {
    try {
      if (get().loading) return;
      set({ loading: true });
      const { data } = await axiosInstance().delete(`/vaults/${id}`);
      if (data.success) {
        set({ loading: false });
        await wait(500);
        return get().getVaults();
      }
    } catch (error) {
      set({ loading: false });
    }
  },
}));

export default useVaultStore;
