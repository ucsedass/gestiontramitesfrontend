import { create } from "zustand";
export const useTramiteStore = create((set) => ({
  idTramite: 0,
  actualizarTramite: false,
  setIdTramite: (value) => set({ idTramite: value }),
  setActualizarTramite: (value) => set({ actualizarTramite: value }),
}));
