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
  Button,
  Tooltip,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Center,
  FormControl,
  Textarea,
  Box,
} from "@chakra-ui/react";
import Moment from "moment";
import { useTramiteStore } from "@/store/tramiteStore";
import { useUsuarioStore } from "@/store/usuarioStore";
import { estiloTablas } from "../styles/estiloTablas";
import {
  FaSearch,
  FaExchangeAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import {
  PhoneIcon,
  AddIcon,
  WarningIcon,
  CheckCircleIcon,
} from "@chakra-ui/icons";

const MovimientosTramitesBM = () => {
  const zidtramite = useTramiteStore((state) => state.idTramite);
  const setIdTramite = useTramiteStore((state) => state.setIdTramite);
  const zdescusuario = useUsuarioStore((state) => state.descUsuario);
  const [movTramites, setMovTramites] = useState([]);
  const [observacionesEliminacion, setObservacionesEliminacion] = useState("");
  const [modalEliminarUltMov, setModalEliminarUltMov] = useState(false);
  const columns = [
    {
      name: "",
      selector: (row) =>
        row.borrado === true ? (
          <Tooltip label={row.observacionesEliminacion}>
            <WarningIcon color={"red.500"} />
          </Tooltip>
        ) : (
          <CheckCircleIcon color={"green.500"} />
        ),
      width: "30px",
    },
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
        console.log("Movimientos tramite", respuesta.data);
        setMovTramites(respuesta.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [zidtramite]);

  const eliminarUltimoMovimiento = () => {
    clienteAxios("/eliminarultimomovimiento", {
      method: "POST",
      data: {
        idTramite: zidtramite,
        observacionesEliminacion:
          observacionesEliminacion +
          " " +
          "\nEliminado por : " +
          zdescusuario +
          "\nEl dia :" +
          Moment(new Date()).format("DD-MM-YYYYTHH:mm"),
      },
    })
      .then((respuesta) => {
        console.log("Movimientos:", respuesta.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {movTramites.length > 0 ? (
        <>
          {" "}
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
            <Button
              colorScheme="red"
              size={"sm"}
              mt={3}
              onClick={() => {
                setModalEliminarUltMov(true);
              }}
            >
              ELIMINAR ULTIMO MOVIMIENTO
            </Button>
          </Stack>
        </>
      ) : null}

      <Modal
        isOpen={modalEliminarUltMov}
        onClose={() => {
          setModalEliminarUltMov(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Center>
              <Heading fontSize={18} mb={2} mt={1}>
                ELIMINAR ULTIMO MOVIMIENTO
              </Heading>
            </Center>
            <FormControl mt={2}>
              <Heading fontSize={12}>OBSERVACIONES DE ELIMINACION</Heading>
              <Textarea
                mt={1}
                name="observacioneseliminacion"
                id="observacioneseliminacion"
                value={observacionesEliminacion}
                onChange={(e) => {
                  setObservacionesEliminacion(e.target.value);
                }}
              ></Textarea>
            </FormControl>

            <Flex mt={2}>
              <Box p="1">
                <Button
                  size={"sm"}
                  colorScheme={"green"}
                  onClick={() => {
                    eliminarUltimoMovimiento();
                    setModalEliminarUltMov(false);
                  }}
                >
                  CONFIRMAR
                </Button>
              </Box>
              <Spacer />
              <Box p="1">
                <Button
                  size={"sm"}
                  colorScheme={"red"}
                  onClick={() => {
                    setModalEliminarUltMov(false);
                  }}
                >
                  CERRAR
                </Button>
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MovimientosTramitesBM;
