import React from "react";
import AbmTramites from "@/components/Tramites/AbmTramites";
import TablaTramites from "@/components/Tramites/TablaTramites";

import { useUsuarioStore } from "@/store/usuarioStore";

const Tramites = () => {
  const zconectado = useUsuarioStore((state) => state.conectado);
  const zsector = useUsuarioStore((state) => state.idSector);

  return (
    <>
      {zconectado == true ? (
        <>
          {zsector === 1 ? (
            <AbmTramites />
          ) : (
            <p>tiene que ser de mesa de entrada</p>
          )}

          <TablaTramites />
        </>
      ) : (
        <p>inicie sesion</p>
      )}
    </>
  );
};

export default Tramites;
