/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

enum EMode {
  View = "view",
  Edit = "edit",
}

interface IModeStore {
  mode: EMode;
  toggleMode: () => void;
  isViewMode: () => boolean;
}

const useModeStore = create<IModeStore>((set, get) => ({
  mode: EMode.View,
  toggleMode: () => {
    set({ mode: get().isViewMode() ? EMode.Edit : EMode.View });
  },
  isViewMode: () => get().mode === EMode.View,
}));

export default useModeStore;
