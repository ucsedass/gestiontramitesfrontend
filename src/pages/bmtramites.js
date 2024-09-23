import React from "react";
import BuscarTramites from "@/components/Tramites/BuscarTramites";
import MovimientosTramitesBM from "@/components/Tramites/MovimientosTramitesBM";
import { Stack } from "@chakra-ui/react";
import { useUsuarioStore } from "@/store/usuarioStore";
import BmTramites from "@/components/Tramites/BmTramites";

const abmtramites = () => {
  const zconectado = useUsuarioStore((state) => state.conectado);
  return (
    <>
      {zconectado == true ? (
        <>
          <Stack w="80%" mx="auto" spacing={2} p={2} mt={2} mb={4}>
            <BuscarTramites />
            <BmTramites />
            <MovimientosTramitesBM />
          </Stack>
        </>
      ) : (
        <p>inicie sesion</p>
      )}
    </>
  );
};

export default abmtramites;
