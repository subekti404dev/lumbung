/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axiosInstance from "../utils/axios";
import wait from "wait";

interface ITokenStore {
  loading: boolean;
  tokens: IToken[];
  getTokens: () => Promise<any>;
  generateToken: (name: string, onAfter?: () => void) => Promise<any>;
  revokeToken: (token: string) => Promise<any>;
}
export interface IToken {
  token: string;
  name: string;
}

const useTokenStore = create<ITokenStore>((set, get) => ({
  loading: false,
  tokens: [],
  getTokens: async () => {
    try {
      if (get().loading) return;
      set({ loading: true });
      const { data } = await axiosInstance().get("/tokens");
      if (data.data) {
        set({ tokens: data.data, loading: false });
        return data.data;
      }
    } catch (error) {
      set({ loading: false });
    }
  },
  generateToken: async (name, onAfter) => {
    try {
      if (get().loading) return;
      set({ loading: true });
      const { data } = await axiosInstance().post("/tokens", {
        name,
      });
      if (data.success) {
        set({ loading: false });
        onAfter?.();
        await wait(500);
        get().getTokens();
        return data?.data;
      }
    } catch (error) {
      set({ loading: false });
    }
  },
  revokeToken: async (token) => {
    try {
      if (get().loading) return;
      set({ loading: true });
      const { data } = await axiosInstance().delete(`/tokens/${token}`);
      if (data.success) {
        set({ loading: false });
        await wait(500);
        return get().getTokens();
      }
    } catch (error) {
      set({ loading: false });
    }
  },
}));

export default useTokenStore;
