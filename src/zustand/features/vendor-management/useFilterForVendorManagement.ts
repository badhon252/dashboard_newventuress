import { create } from "zustand";

type FilterState = {
  isVerified: boolean | undefined;
  searchQuery: string;
  setVerified: (value: boolean) => void;
  setSearchQuery: (query: string) => void;
};

export const useVendorManagementFilter = create<FilterState>((set) => ({
  isVerified: undefined, // Default value
  searchQuery: "",
  setVerified: (value) => set({ isVerified: value }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
