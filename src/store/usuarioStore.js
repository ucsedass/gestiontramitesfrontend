import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUsuarioStore = create(
  persist(
    (set) => ({
      idUsuario: 0,
      idSector: 0,
      descUsuario: "",
      descSector: "",
      conectado: false,
      actualizar: false,
      setUsuarioLogueado: (value) => set({ idUsuario: value }),
      setSectorLogueado: (value) => set({ idSector: value }),
      setDescUsuario: (value) => set({ descUsuario: value }),
      setDescSector: (value) => set({ descSector: value }),
      setConectado: (value) => set({ conectado: value }),
      setActualizar: (value) => set({ actualizar: value }),
    }),
    { name: "usuario-storage" }
  )
);
