import { create } from "zustand";

interface ShowIndustryState {
  show: string;
  setShow: (value: string) => void;
}

export const useIndustryShow = create<ShowIndustryState>((set) => ({
  show: "industry",
  setShow: (value) => set({ show: value }),
}));
