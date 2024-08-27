import React from "react";
import BuscarTramites from "@/components/Tramites/BuscarTramites";
import DatosTramites from "@/components/Tramites/DatosTramites";
import MovimientosTramites from "@/components/Tramites/MovimientosTramites";
import { useUsuarioStore } from "@/store/usuarioStore";
import { Stack } from "@chakra-ui/react";

const consultaTramites = () => {
  const zconectado = useUsuarioStore((state) => state.conectado);
  return (
    <>
      {zconectado == true ? (
        <>
          <Stack w="80%" mx="auto" spacing={2} p={2} mt={2}>
            <BuscarTramites />
            <DatosTramites />
            <MovimientosTramites />
          </Stack>
        </>
      ) : (
        <p>inicie sesion</p>
      )}
    </>
  );
};

export default consultaTramites;
