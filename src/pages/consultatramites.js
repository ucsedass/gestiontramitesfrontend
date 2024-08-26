import React from "react";
import BuscarTramites from "@/components/Tramites/BuscarTramites";
import DatosTramites from "@/components/Tramites/DatosTramites";
import MovimientosTramites from "@/components/Tramites/MovimientosTramites";
import { useUsuarioStore } from "@/store/usuarioStore";

const consultaTramites = () => {
  const zconectado = useUsuarioStore((state) => state.conectado);
  return (
    <>
      {zconectado == true ? (
        <>
          <BuscarTramites />
          <DatosTramites />
          <MovimientosTramites />
        </>
      ) : (
        <p>inicie sesion</p>
      )}
    </>
  );
};

export default consultaTramites;
