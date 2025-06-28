import { create } from "zustand";

interface ModalState {
  isAnyModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isAnyModalOpen: false,
  openModal: () => set({ isAnyModalOpen: true }),
  closeModal: () => set({ isAnyModalOpen: false }),
}));
