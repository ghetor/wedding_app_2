import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SelectedCompany {
  name: string;
  logo: string;
  category: string;
  percentage: number;
}

export interface Participant {
  nome: string;
  cognome: string;
}

interface GiftStoreState {
  amount: number;
  setAmount: (value: number) => void;

  participants: Participant[];
  setParticipants: (list: Participant[]) => void;

  message: string;
  setMessage: (value: string) => void;

  selectedCompanies: SelectedCompany[];
  setSelectedCompanies: (companies: SelectedCompany[]) => void;

  updateCompanyPercentage: (index: number, percentage: number) => void;
}

export const useGiftStore = create<GiftStoreState>()(
  persist(
    (set) => ({
      amount: 0,
      setAmount: (value) => set({ amount: value }),

      participants: [],
      setParticipants: (list) => set({ participants: list }),

      message: "",
      setMessage: (value) => set({ message: value }),

      selectedCompanies: [],
      setSelectedCompanies: (companies) => set({ selectedCompanies: companies }),

      updateCompanyPercentage: (index, percentage) =>
        set((state) => {
          const updated = [...state.selectedCompanies];
          updated[index].percentage = percentage;
          return { selectedCompanies: updated };
        }),
    }),
    { name: "gift-storage" }
  )
);
