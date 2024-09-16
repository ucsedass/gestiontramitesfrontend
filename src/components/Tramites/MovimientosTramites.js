import React, { useState, useEffect } from "react";
import Movimientos from "react-data-table-component";
import clienteAxios from "@/config/axios";
import {
  Stack,
  Badge,
  Icon,
  Heading,
  Flex,
  FormLabel,
  Spacer,
} from "@chakra-ui/react";
import Moment from "moment";
import { useTramiteStore } from "@/store/tramiteStore";
import { estiloTablas } from "../styles/estiloTablas";
import { FaSearch, FaExchangeAlt } from "react-icons/fa";

const MovimientosTramites = () => {
  const zidtramite = useTramiteStore((state) => state.idTramite);
  const setIdTramite = useTramiteStore((state) => state.setIdTramite);
  const [movTramites, setMovTramites] = useState([]);

  const columns = [
    {
      name: "Fecha pase",
      selector: (row) =>
        Moment(row.fechaRealizaPaseTramite).format("DD-MM-YYYY HH:mm"),
    },
    {
      name: "Sector pase",
      selector: (row) => row.sectorRealizaPaseDesc,
    },
    {
      name: "Usuario pase",
      selector: (row) => row.usuarioRealizaPaseDesc,
    },
    {
      name: "Fecha acepta pase",
      selector: (row) =>
        row.fechaAceptaPaseTramite === null ? (
          <Badge colorScheme={"red"}> NO ACEPTADO</Badge>
        ) : (
          Moment(row.fechaAceptaPaseTramite).format("DD-MM-YYYY HH:mm")
        ),
    },
    {
      name: "Sector acepta pase",
      selector: (row) => row.sectorAceptaPaseDesc,
    },
    {
      name: "Usuario acepta pase",
      selector: (row) =>
        row.usuarioAceptaPaseDesc === null ? (
          <Badge colorScheme={"red"}>NO ACEPTADO </Badge>
        ) : (
          row.usuarioAceptaPaseDesc
        ),
    },
    {
      name: "observaciones",
      selector: (row) => row.observaciones,
    },
    {
      cell: () => <Icon as={FaSearch} />,
      center: "true",
    },
  ];

  useEffect(() => {
    setIdTramite(0);
  }, []);
  useEffect(() => {
    clienteAxios("/buscarmovimientostramites", {
      method: "POST",
      data: { idTramite: zidtramite },
    })
      .then((respuesta) => {
        console.log("Movimientos:", respuesta.data);
        setMovTramites(respuesta.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [zidtramite]);

  return (
    <>
      <Heading mt={2} color={"blue"} fontSize={16}>
        <Flex>
          <FaExchangeAlt />

          <FormLabel ml={2}>MOVIMIENTOS</FormLabel>
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
        <Movimientos
          data={movTramites}
          columns={columns}
          noDataComponent={<>Sin movimientos</>}
          customStyles={estiloTablas}
        />
      </Stack>
    </>
  );
};

export default MovimientosTramites;
