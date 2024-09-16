import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Heading,
  Grid,
  GridItem,
  Stack,
  HStack,
  Box,
  Flex,
} from "@chakra-ui/react";
import { FaListAlt } from "react-icons/fa";
import { useTramiteStore } from "@/store/tramiteStore";
import clienteAxios from "@/config/axios";
import Moment from "moment";
clienteAxios;
const DatosTramites = () => {
  const [datosTramite, setDatosTramite] = useState({});
  const zidtramite = useTramiteStore((state) => state.idTramite);

  useEffect(() => {
    clienteAxios("/traerdatostramite", {
      method: "POST",
      data: { idTramite: zidtramite },
    })
      .then((respuesta) => {
        console.log(respuesta.data);
        setDatosTramite(respuesta.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [zidtramite]);

  return (
    <>
      {datosTramite.length > 0 ? (
        <>
          <Heading color={"blue"} fontSize={16}>
            <Flex>
              <FaListAlt />
              <FormLabel ml={2}>DATOS TRAMITE</FormLabel>
            </Flex>
          </Heading>
          <Stack
            w="100%"
            mx="auto"
            spacing={2}
            border="solid 2px #F1F1F1"
            p={2}
            mt={2}
          >
            <HStack templateColumns="repeat(7, 4fr)" gap={2}>
              <Box w="100%">
                <FormControl>
                  <Heading color={"blue"} fontSize={10}>
                    TRAMITE
                  </Heading>
                  <FormLabel>
                    {datosTramite[0].tramiteNum}-{datosTramite[0].tramiteAño}
                  </FormLabel>
                </FormControl>
              </Box>
              <Box w="100%">
                <FormControl>
                  <Heading color={"blue"} fontSize={10}>
                    FECHA DE INGRESO
                  </Heading>
                  <FormLabel>
                    {Moment(datosTramite[0].tramiteFechaIng).format(
                      "DD-MM-YYYY HH:mm"
                    )}
                  </FormLabel>
                </FormControl>
              </Box>
              <Box w="100%">
                <FormControl>
                  <Heading color={"blue"} fontSize={10}>
                    FOLIOS
                  </Heading>
                  <FormLabel>{datosTramite[0].tramiteFolio}</FormLabel>
                </FormControl>
              </Box>
              <Box w="100%">
                <FormControl>
                  <Heading color={"blue"} fontSize={10}>
                    SECTOR ALTA TRAMITE
                  </Heading>
                  <FormLabel>{datosTramite[0].sectorAltaTramiteDesc}</FormLabel>
                </FormControl>
              </Box>
              <Box w="100%">
                <FormControl>
                  <Heading color={"blue"} fontSize={10}>
                    SECTOR ACTUAL
                  </Heading>
                  <FormLabel>
                    {datosTramite[0].sectorActualTramiteDesc}
                  </FormLabel>
                </FormControl>
              </Box>
            </HStack>
            <HStack templateColumns="repeat(7, 4fr)" gap={2}>
              <Box w="100%">
                <FormControl>
                  <Heading color={"blue"} fontSize={10}>
                    SECTOR ACTUAL
                  </Heading>
                  <FormLabel>
                    {datosTramite[0].sectorActualTramiteDesc}
                  </FormLabel>
                </FormControl>
              </Box>
            </HStack>
          </Stack>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default DatosTramites;
