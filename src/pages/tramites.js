import React, { useState, useEffect } from "react";
import AbmTramites from "@/components/Tramites/AbmTramites";
import TablaTramites from "@/components/Tramites/TablaTramites";
import { useRouter, withRouter } from "next/router";
import { useUsuarioStore } from "@/store/usuarioStore";

const Tramites = (props) => {
  const zconectado = useUsuarioStore((state) => state.conectado);
  const zsector = useUsuarioStore((state) => state.idSector);
  const router = useRouter();
  const [sector, setSector] = useState(0);

  // console.log("Desde tramites:", props.router.query.idSectorSeleccionado);
  useEffect(() => {
    setSector(props.router.query.idSectorSeleccionado);
  }, [props.router.query.idSectorSeleccionado]);

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

export default withRouter(Tramites);
