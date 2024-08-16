import React, { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import { useUsuarioStore } from "@/store/usuarioStore";
const AbmTramites = () => {
  const zusuario = useUsuarioStore((state) => state.idUsuario);
  const zsector = useUsuarioStore((state) => state.idSector);
  /**************************************************************/
  const [clasesTramites, setClasesTramites] = useState({});
  const [tiposTramites, setTiposTramites] = useState({});
  const [solicitantesTramites, setSolicitantesTramites] = useState({});
  /********************************************************/
  const [idTipoTramite, setIdtipoTramite] = useState(0);
  const [tramiteFechaIng, setTramiteFechaing] = useState("");
  const [tramiteFolio, setTramiteFolio] = useState(0);
  const [idTipoSolicitanteTramite, setIdTipoSolicitanteTramite] = useState(1);
  const [descTramSolicitanteExterno, setDescTramSolicitanteExterno] =
    useState("");
  const [dniSolicitanteAlumno, setDniSolicitanteAlumno] = useState(0);
  const [observaciones, setObservaciones] = useState("");

  useEffect(() => {
    clienteAxios("/traerclasestramites", {
      method: "POST",
    })
      .then((respuesta) => {
        setClasesTramites(respuesta.data);
        cargarTiposTramites(respuesta.data[0].idClaseTramite);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    tiposTramites.length > 0
      ? setIdtipoTramite(tiposTramites[0].idTipoTramite)
      : null;
  }, [tiposTramites]);

  useEffect(() => {
    clienteAxios("/traertipossolicitantes", {
      method: "POST",
    })
      .then((respuesta) => {
        console.log("solicitante:", respuesta.data);
        setSolicitantesTramites(respuesta.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
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
  const enviarNuevoTramite = () => {
    let objTramite = {
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
    console.log("Este es el objeto para enviar:", objTramite);
    clienteAxios("/nuevotramite", {
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
      <Box w="80%" mx="auto" mt={4}>
        <Center>
          <FormLabel mb="0px">NUEVO TRAMITE</FormLabel>
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
            <Heading fontSize={12}>Clase trámite</Heading>
            <Select
              size={"sm"}
              name="idClaseTramie"
              id="idClaseTramite"
              onChange={(e) => {
                cargarTiposTramites(e.target.value);
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
            <Heading fontSize={12}>Tipo trámite</Heading>
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
                ? tiposTramites.map(({ idTipoTramite, tramiteDescripcion }) => (
                    <option key={idTipoTramite} value={idTipoTramite}>
                      {" "}
                      {idTipoTramite + "|" + tramiteDescripcion}
                    </option>
                  ))
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
          mt={5}
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
                    onChange={(e) => {
                      setDniSolicitanteAlumno(e.target.value);
                    }}
                    size={"sm"}
                  ></Input>
                  <Button mx="2" size={"sm"} colorScheme={"orange"}>
                    Buscar
                  </Button>
                </Flex>
              </FormControl>
              <FormControl>
                <Heading fontSize={12}>Nombre alumno</Heading>
                <FormLabel size={"sm"}>RODRIGO JOAQUIN GUZMAN</FormLabel>
              </FormControl>
            </>
          ) : (
            <>
              <FormControl>
                <Heading fontSize={12}>Descripcion solicitante externo</Heading>
                <Input
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
          mt={5}
        >
          {" "}
          <FormControl>
            <Heading fontSize={12}>Requisitos:</Heading>
            <FormLabel fontSize={12} color={"blue"}>
              Aqui aparecerian los datos a tener en cuenta en las observaciones,
              dependiendo de la clase y el tipo de tramite
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
          mt={5}
        >
          <FormControl>
            <Heading fontSize={12}>Observaciones</Heading>
            <Textarea
              name="observaciones"
              id="observaciones"
              onChange={(e) => {
                setObservaciones(e.target.value);
              }}
            ></Textarea>
          </FormControl>
        </Stack>

        <Button
          mt={2}
          colorScheme={"green"}
          w={"100%"}
          size={"sm"}
          onClick={() => {
            enviarNuevoTramite();
          }}
        >
          Guardar
        </Button>

        <Alert mt={3} mb={3} status="success">
          <AlertIcon />
          El trámite numero <b> 124 </b> se guardó correctamente
        </Alert>
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Error al guardar trámite</AlertTitle>
          <AlertDescription>Revisar datos.</AlertDescription>
        </Alert>
      </Box>
    </>
  );
};
export default AbmTramites;
