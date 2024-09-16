import React from "react";
import NuevoTramite from "@/components/Tramites/NuevoTramite";
import TablaTramites from "@/components/Tramites/TablaTramites";

import { useUsuarioStore } from "@/store/usuarioStore";

const Tramites = () => {
  const zconectado = useUsuarioStore((state) => state.conectado);
  const zsector = useUsuarioStore((state) => state.idSector);

  return (
    <>
      {zconectado == true ? (
        <>
          {zsector === 1 ? <NuevoTramite /> : <></>}

          <TablaTramites />
        </>
      ) : (
        <p>inicie sesion</p>
      )}
    </>
  );
};

export default Tramites;
