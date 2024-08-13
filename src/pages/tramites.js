import React from "react";
import AbmTramites from "@/components/Tramites/AbmTramites";
import TablaTramites from "@/components/Tramites/TablaTramites";
import { useRouter, withRouter } from "next/router";

const Tramites = (props) => {
  const router = useRouter();
  console.log("Desde tramites:", props.router.query.idSectorSeleccionado);
  return (
    <>
      {parseInt((props.router.query.idSectorSeleccionado = 1)) ? (
        <AbmTramites />
      ) : (
        <p>no es 1</p>
      )}

      <TablaTramites />
    </>
  );
};

export default withRouter(Tramites);
