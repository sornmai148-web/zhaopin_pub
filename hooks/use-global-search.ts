import { create } from "zustand";

interface GlobalSearchStore {
  search: string;
  setSearch: (y: string) => void;
}

/*
 * @description : This used for store search value across component
 */
export const useGlobalSearchStore = create<GlobalSearchStore>()((set) => ({
  search: "",
  setSearch: (value: string) => set({ search: value }),
}));
