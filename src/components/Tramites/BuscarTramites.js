import React, { useState, useEffect } from "react";
import clienteAxios from "@/config/axios";
import { useTramiteStore } from "@/store/tramiteStore";
import {
  Box,
  Flex,
  Input,
  Stack,
  FormControl,
  Heading,
  Button,
} from "@chakra-ui/react";
const BuscarTramites = () => {
  const zsetidtramite = useTramiteStore((state) => state.setIdTramite);
  const [tramiteNum, setTramiteNum] = useState(0);
  const [tramiteAño, setTramiteAño] = useState(0);

  const buscarTramite = () => {
    console.log("Buscar tramite", { tramiteNum, tramiteAño });

    clienteAxios("/buscartramite", {
      method: "POST",
      data: {
        tramiteNum: parseInt(tramiteNum),
        tramiteAño: parseInt(tramiteAño),
      },
    })
      .then((respuesta) => {
        console.log("Res busqueda tramite", respuesta.data);
        zsetidtramite(respuesta.data[0].idTramite);
      })
      .catch((error) => {
        zsetidtramite([]);
        console.log(error);
      });
  };

  return (
    <>
      <Stack
        direction={{ base: "column", sm: "column", lg: "row" }}
        mx="auto"
        spacing={2}
        border="solid 2px #F1F1F1"
        p={2}
        mt={2}
      >
        <FormControl>
          <Heading fontSize={14}> Numero</Heading>
          <Input
            id="tramiteNum"
            name="tramiteNum"
            size={"sm"}
            value={tramiteNum}
            onChange={(e) => setTramiteNum(e.target.value)}
          ></Input>
        </FormControl>
        <FormControl>
          <Heading fontSize={14}> Año</Heading>
          <Input
            id="tramiteAño"
            name="tramiteAño"
            value={tramiteAño}
            size={"sm"}
            onChange={(e) => setTramiteAño(e.target.value)}
          ></Input>
        </FormControl>
        <Box>
          <Button
            size={"sm"}
            mt={4}
            colorScheme={"orange"}
            onClick={() => buscarTramite()}
          >
            BUSCAR
          </Button>
        </Box>
      </Stack>
    </>
  );
};

export default BuscarTramites;
