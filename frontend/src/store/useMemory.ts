/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { socket } from "../utils/socket";

export interface Data {
  memory: Memory;
  swap: Swap;
}

export interface Memory {
  total: number;
  used: number;
  free: number;
  shared: number;
  buff_cache: number;
  available: number;
  percentage: number;
}

export interface Swap {
  total: number;
  used: number;
  free: number;
}

interface IBookmarkStore {
  memory: Data | null;
  initialized: boolean;
  init: () => void;
}

const useMemoryStore = create<IBookmarkStore>((set, get) => ({
  memory: null,
  initialized: false,
  init: () => {
    if (!get().initialized) {
      set({ initialized: true });
      socket.on("memory_info", (v) => {
        const memory = JSON.parse(v);
        memory.memory.percentage =
          (memory.memory.used / memory.memory.total) * 100;
        set({ memory });
      });
    }
  },
}));

export default useMemoryStore;
