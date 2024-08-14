import React, { useState, useEffect } from "react";
import AbmTramites from "@/components/Tramites/AbmTramites";
import TablaTramites from "@/components/Tramites/TablaTramites";
import { useRouter, withRouter } from "next/router";

const Tramites = (props) => {
  const router = useRouter();
  const [sector, setSector] = useState(0);

  // console.log("Desde tramites:", props.router.query.idSectorSeleccionado);
  useEffect(() => {
    setSector(props.router.query.idSectorSeleccionado);
  }, [props.router.query.idSectorSeleccionado]);

  return (
    <>
      {sector === "1" ? <AbmTramites /> : null}
      <TablaTramites />
    </>
  );
};

export default withRouter(Tramites);
