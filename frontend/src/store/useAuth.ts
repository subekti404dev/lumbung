/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axiosInstance from "../utils/axios";
import { authToken } from "../utils/token";

interface IAuthStore {
  user: IUser | null;
  partners: IUser[];
  loading: boolean;
  loadingChangeAvatar: boolean;
  loggingIn: boolean;
  login: (password: string) => Promise<any>;
  logout: () => Promise<any>;
  getProfile: () => Promise<any>;
  changeAvatar: (avatar: string) => Promise<any>;
  init: () => Promise<any>;
}
export interface IUser {
  collectionId: string;
  collectionName: string;
  created: string;
  deleted: boolean;
  email: string;
  hash_password: string;
  id: string;
  name: string;
  updated: string;
  workspace_id: string;
  iat: number;
  avatar: string;
}

const useAuthStore = create<IAuthStore>((set, get) => ({
  user: null,
  partners: [],
  loading: false,
  loadingChangeAvatar: false,
  loggingIn: false,
  login: async (password: string) => {
    try {
      set({ loggingIn: true });
      const { data } = await axiosInstance().post("/auth/login", {
        password,
      });

      if (data.token) {
        authToken.setToken(data.token);
        return get().init();
      }
      set({ loggingIn: false });
    } catch (error) {
      set({ loggingIn: false });
    }
  },
  logout: async () => {
    set({ user: null, partners: [] });
  },
  getProfile: async () => {
    try {
      if (get().loading) return;
      set({ loading: true });
      const { data } = await axiosInstance().get("/users/me");
      if (data.data) {
        set({ user: data.data, loading: false });
        return data.data;
      }
    } catch (error) {
      set({ loading: false });
    }
  },

  changeAvatar: async (avatar: string) => {
    try {
      if (get().loadingChangeAvatar) return;
      set({ loadingChangeAvatar: true });
      const { data } = await axiosInstance().put("/users/avatar", { avatar });
      if (data.success) {
        set({
          loadingChangeAvatar: false,
          user: { ...(get().user as IUser), avatar },
        });
        return data.success;
      }
    } catch (error) {
      console.log(error);
      set({ loadingChangeAvatar: false });
    }
  },
  init: async () => {
    if (authToken.getToken()) {
      const [profile] = await Promise.all([get().getProfile()]);
      return profile;
    }
  },
}));

export default useAuthStore;
