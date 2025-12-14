import { create } from "zustand";

interface GlobalSelectIdStore {
  activeId: number;
  setActiveId: (y: number) => void;
}

/**
 * Used only for implement global active selection option
 * @description : This state will be reset when the page get refreshed
 */
export const useGlobalSelectIdStore = create<GlobalSelectIdStore>()((set) => ({
  activeId: -1,
  setActiveId: (id) => set({ activeId: id }),
}));
