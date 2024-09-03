import React from "react";
import { useUsuarioStore } from "@/store/usuarioStore";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import Usuario from "./Usuario";
import Menu from "./Menu";
const Cabecera = () => {
  const zconectado = useUsuarioStore((state) => state.conectado);
  return (
    <>
      {zconectado == true ? (
        <Box bgGradient="linear(to-r, blue.400, blue.300)">
          <Grid templateColumns="repeat(5, 1fr)" w="80%" mx={"auto"}>
            <GridItem colSpan={2}>
              <Menu />
            </GridItem>
            <GridItem colStart={4} colEnd={6}>
              <Usuario />
            </GridItem>
          </Grid>
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};

export default Cabecera;
