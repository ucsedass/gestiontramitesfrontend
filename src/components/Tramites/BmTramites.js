import React, { useEffect, useState } from "react";
import clienteAxios from "@/config/axios";
import {
  Box,
  Center,
  FormLabel,
  FormControl,
  Stack,
  Heading,
  Input,
  Select,
  Textarea,
  Button,
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  HStack,
  Text,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spacer,
} from "@chakra-ui/react";
import Moment from "moment";
import { useUsuarioStore } from "@/store/usuarioStore";
import { useTramiteStore } from "@/store/tramiteStore";

const BmTramites = () => {
  const zidtramite = useTramiteStore((state) => state.idTramite);
  const zusuario = useUsuarioStore((state) => state.idUsuario);
  const zdescusuario = useUsuarioStore((state) => state.descUsuario);
  const zsector = useUsuarioStore((state) => state.idSector);
  const zactualizar = useUsuarioStore((state) => state.actualizar);
  const setActualizar = useUsuarioStore((state) => state.setActualizar);
  /**************************************************************/
  const [observacionesEliminacion, setObservacionesEliminacion] = useState("");
  const [modalEliminarTramite, setModalEliminatTramite] = useState(false);
  const [datosTramite, setDatosTramite] = useState({});
  const [clasesTramites, setClasesTramites] = useState({});
  const [tiposTramites, setTiposTramites] = useState({});
  const [solicitantesTramites, setSolicitantesTramites] = useState({});

  /********************************************************/
  const [idTipoTramite, setIdtipoTramite] = useState(0);
  const [idClaseTramite, setIdClaseTramite] = useState(0);
  const [tramiteFechaIng, setTramiteFechaing] = useState(
    Moment(new Date()).format("YYYY-MM-DDTHH:mm")
  );
  const [tramiteFolio, setTramiteFolio] = useState(0);
  const [idTipoSolicitanteTramite, setIdTipoSolicitanteTramite] = useState(1);
  const [descTramSolicitanteExterno, setDescTramSolicitanteExterno] =
    useState("");
  const [dniSolicitanteAlumno, setDniSolicitanteAlumno] = useState(0);
  const [observaciones, setObservaciones] = useState("");
  const [gatillo, setGatillo] = useState(false);

  useEffect(() => {
    clienteAxios("/traerclasestramites", {
      method: "POST",
    })
      .then((respuesta) => {
        setClasesTramites(respuesta.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // useEffect(() => {
  //   tiposTramites.length > 0
  //     ? setIdtipoTramite(tiposTramites[0].idTipoTramite)
  //     : null;
  // }, [tiposTramites]);

  useEffect(() => {
    clienteAxios("/traerdatostramite", {
      method: "POST",
      data: { idTramite: zidtramite },
    })
      .then((respuesta) => {
        setDatosTramite(respuesta.data);
        if (respuesta.data.length > 0) {
          setIdtipoTramite(respuesta.data[0].idTipoTramite);
          setIdClaseTramite(respuesta.data[0].idClaseTramite);
          setTramiteFechaing(
            Moment(respuesta.data[0].tramiteFechaIng).format("YYYY-MM-DDTHH:mm")
          );
          setTramiteFolio(respuesta.data[0].tramiteFolio);
          setIdTipoSolicitanteTramite(
            respuesta.data[0].idTipoSolicitanteTramite
          );
          setDescTramSolicitanteExterno(
            respuesta.data[0].descTramSolicitanteExterno
          );
          setDniSolicitanteAlumno(respuesta.data[0].dniSolicitanteAlumno);
          setObservaciones(respuesta.data[0].observaciones);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [zidtramite]);

  useEffect(() => {
    clienteAxios("/traertipossolicitantes", {
      method: "POST",
    })
      .then((respuesta) => {
        setSolicitantesTramites(respuesta.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    cargarTiposTramites(idClaseTramite);
  }, [idClaseTramite]);

  const cargarTiposTramites = (id) => {
    clienteAxios("/traertipostramites", {
      method: "POST",
      data: { idClaseTramite: id },
    })
      .then((respuesta) => {
        setTiposTramites(respuesta.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    tiposTramites.length > 0
      ? setIdtipoTramite(tiposTramites[0].idTipoTramite)
      : null;
  }, [tiposTramites]);

  const actualizarDatos = () => {
    console.log("ACTUALIZAR DATOS");
    let objTramite = {
      idTramite: parseInt(zidtramite),
      idTipoTramite: parseInt(idTipoTramite),
      tramiteFechaIng: tramiteFechaIng,
      tramiteFolio: parseInt(tramiteFolio),
      idTipoSolicitanteTramite: parseInt(idTipoSolicitanteTramite),
      descTramSolicitanteExterno: descTramSolicitanteExterno,
      dniSolicitanteAlumno: parseInt(dniSolicitanteAlumno),
      observaciones: observaciones,
      idUsuarioAltaTramite: zusuario,
      idSectorAltaTramite: zsector,
    };
    clienteAxios("/actualizardatostramite", {
      method: "POST",
      data: objTramite,
    })
      .then((respuesta) => {
        console.log(respuesta);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const eliminarTramite = () => {
    let objTramite = {
      idTramite: parseInt(zidtramite),
      observacionesEliminacion:
        observacionesEliminacion +
        " " +
        "\nEliminado por : " +
        zdescusuario +
        "\nEl dia :" +
        Moment(new Date()).format("DD-MM-YYYYTHH:mm"),
    };
    clienteAxios("/eliminartramite", {
      method: "POST",
      data: objTramite,
    })
      .then((respuesta) => {
        console.log(respuesta);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {datosTramite.length > 0 ? (
        <Box w="100%" mx="auto" mt={4}>
          <Center>
            <Text mb="0px" as="b">
              MODIFICAR TRAMITE
            </Text>
          </Center>

          <Stack
            direction={{ base: "row", sm: "column", lg: "row" }}
            w="100%"
            mx="auto"
            spacing={2}
            border="solid 2px #F1F1F1"
            p={2}
            mt={5}
          >
            <FormControl>
              <Heading fontSize={12}>Clase trámite {idClaseTramite}</Heading>
              <Select
                value={idClaseTramite}
                size={"sm"}
                name="idClaseTramite"
                id="idClaseTramite"
                onChange={(e) => {
                  setIdClaseTramite(e.target.value);
                  setGatillo(!gatillo);
                }}
              >
                {clasesTramites.length > 0
                  ? clasesTramites.map(
                      ({ idClaseTramite, claseTramiteDescripcion }) => (
                        <option key={idClaseTramite} value={idClaseTramite}>
                          {" "}
                          {idClaseTramite + "|" + claseTramiteDescripcion}
                        </option>
                      )
                    )
                  : null}
              </Select>
            </FormControl>
            <FormControl>
              <Heading fontSize={12}>Tipo trámite {idTipoTramite}</Heading>
              <Select
                size={"sm"}
                id="idTipoTramite"
                name="idTipoTramite"
                value={idTipoTramite}
                onChange={(e) => {
                  setIdtipoTramite(e.target.value);
                }}
              >
                {tiposTramites.length > 0
                  ? tiposTramites.map(
                      ({ idTipoTramite, tramiteDescripcion }) => (
                        <option key={idTipoTramite} value={idTipoTramite}>
                          {" "}
                          {idTipoTramite + "|" + tramiteDescripcion}
                        </option>
                      )
                    )
                  : null}
              </Select>
            </FormControl>
            <FormControl>
              <Heading fontSize={12}>Fecha ingreso</Heading>
              <Input
                name="tramiteFechaIng"
                id="tramiteFechaIng"
                value={tramiteFechaIng}
                size={"sm"}
                onChange={(e) => {
                  setTramiteFechaing(e.target.value);
                }}
                type="datetime-local"
              ></Input>
            </FormControl>
            <FormControl>
              <Heading fontSize={12}>Folios</Heading>
              <Input
                name="tramiteFolio"
                id="tramiteFolio"
                value={tramiteFolio}
                size={"sm"}
                onChange={(e) => {
                  setTramiteFolio(e.target.value);
                }}
              ></Input>
            </FormControl>
          </Stack>

          <Stack
            direction={{ base: "row", sm: "column", lg: "row" }}
            w="100%"
            mx="auto"
            spacing={2}
            border="solid 2px #F1F1F1"
            p={2}
            mt={1}
          >
            <FormControl>
              <Heading fontSize={12}>Solicitante</Heading>
              <Select
                id="idTipoSolicitanteTramite"
                name="idTipoSolicitanteTramite"
                value={idTipoSolicitanteTramite}
                size={"sm"}
                onChange={(e) => {
                  setIdTipoSolicitanteTramite(e.target.value);
                }}
              >
                {solicitantesTramites.length > 0
                  ? solicitantesTramites.map(
                      ({
                        idTipoSolicitanteTramite,
                        tipoSolicitanteTramiteDescripcion,
                      }) => (
                        <option
                          key={idTipoSolicitanteTramite}
                          value={idTipoSolicitanteTramite}
                        >
                          {" "}
                          {idTipoSolicitanteTramite +
                            "|" +
                            tipoSolicitanteTramiteDescripcion}
                        </option>
                      )
                    )
                  : null}
              </Select>
            </FormControl>

            {idTipoSolicitanteTramite == 1 ? (
              <>
                <FormControl>
                  <Heading fontSize={12}>DNI</Heading>
                  <Flex>
                    {" "}
                    <Input
                      name="dniSolicitanteAlumno"
                      id="dniSolicitanteAlumno"
                      value={dniSolicitanteAlumno}
                      onChange={(e) => {
                        setDniSolicitanteAlumno(e.target.value);
                      }}
                      size={"sm"}
                    ></Input>
                    <Button
                      ml={2}
                      my={"auto"}
                      size={"xs"}
                      colorScheme={"orange"}
                    >
                      BUSCAR
                    </Button>
                  </Flex>
                </FormControl>
                <FormControl>
                  <Heading fontSize={12}>Nombre alumno</Heading>
                  <FormLabel size={"sm"} my={"auto"}>
                    listo para llamar SP por dni_alumno
                  </FormLabel>
                </FormControl>
              </>
            ) : (
              <>
                <FormControl>
                  <Heading fontSize={12}>
                    Descripcion solicitante externo
                  </Heading>
                  <Input
                    value={descTramSolicitanteExterno}
                    onChange={(e) => {
                      setDescTramSolicitanteExterno(e.target.value);
                    }}
                  ></Input>
                </FormControl>
              </>
            )}
            <FormControl></FormControl>
          </Stack>
          <Stack
            direction={{ base: "row", sm: "column", lg: "row" }}
            w="100%"
            mx="auto"
            spacing={2}
            border="solid 2px #F1F1F1"
            p={2}
            mt={1}
          >
            {" "}
            <FormControl>
              <Heading fontSize={12}>Requisitos:</Heading>
              <FormLabel fontSize={12} color={"blue"}>
                Aqui aparecerian los datos a tener en cuenta en las
                observaciones, dependiendo de la clase y el tipo de tramite
              </FormLabel>
            </FormControl>
          </Stack>
          <Stack
            direction={{ base: "row", sm: "column", lg: "row" }}
            w="100%"
            mx="auto"
            spacing={2}
            border="solid 2px #F1F1F1"
            p={2}
            mt={1}
          >
            <FormControl>
              <Heading fontSize={12}>Observaciones</Heading>
              <Textarea
                value={observaciones}
                name="observaciones"
                id="observaciones"
                onChange={(e) => {
                  setObservaciones(e.target.value);
                }}
              ></Textarea>
            </FormControl>
          </Stack>
          <HStack>
            <Button
              mt={2}
              colorScheme={"purple"}
              w={"100%"}
              size={"sm"}
              onClick={() => {
                actualizarDatos();
              }}
            >
              GUARDAR CAMBIOS
            </Button>
            <Button
              mt={2}
              colorScheme={"red"}
              w={"100%"}
              size={"sm"}
              onClick={() => {
                //  eliminarTramite();
                setModalEliminatTramite(true);
              }}
            >
              ELIMINAR TRAMITE
            </Button>
          </HStack>

          {/* <Alert mt={3} mb={3} status="success">
    <AlertIcon />
    El trámite numero <b> 124 </b> se guardó correctamente
  </Alert> */}

          {/* <Alert status="error">
    <AlertIcon />
    <AlertTitle>Error al guardar trámite</AlertTitle>
    <AlertDescription>Revisar datos.</AlertDescription>
  </Alert> */}
        </Box>
      ) : (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>No existe trámite.</AlertTitle>
          <AlertDescription>Revisar datos.</AlertDescription>
        </Alert>
      )}

      <Modal
        isOpen={modalEliminarTramite}
        onClose={() => {
          setModalEliminatTramite(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Center>
              <Heading fontSize={18} mb={2} mt={1}>
                ELIMINAR TRAMITE
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
                    eliminarTramite();
                    setModalEliminatTramite(false);
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
                    setModalEliminatTramite(false);
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

export default BmTramites;
