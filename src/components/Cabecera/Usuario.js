import React, { useState, useEffect } from "react";
import { useRouter, withRouter } from "next/router";
import clienteAxios from "@/config/axios";
import {
  Flex,
  Box,
  Spacer,
  Button,
  ButtonGroup,
  Heading,
  Select,
  Link,
} from "@chakra-ui/react";

const Usuario = (props) => {
  const router = useRouter();
  const [datosUsuario, setDatosUsuario] = useState({});
  const [datosSector, setDatosSector] = useState({});
  const [logeado, setLogado] = useState(true);

  useEffect(() => {
    clienteAxios("/traerdatosusuario", {
      method: "POST",
      data: { idUsuario: parseInt(props.router.query.idUsuario) },
    })
      .then((respuesta) => {
        console.log("Datos de usuario:", respuesta.data);
        setDatosUsuario(respuesta.data);
      })
      .catch((error) => {
        console.log(error);
      });

    clienteAxios("/traerdatossector", {
      method: "POST",
      data: { idSector: parseInt(props.router.query.idSectorSeleccionado) },
    })
      .then((respuesta) => {
        console.log("Datos de sector:", respuesta.data);
        setDatosSector(respuesta.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.router.query.idUsuario]);

  return (
    <>
      {console.log("Props:", props.router.query)}
      {props.router.query.estado == "conectado" ? (
        <Flex minWidth="max-content" alignItems="center" gap="2">
          <Box p="2">
            {datosUsuario.length > 0 ? (
              <Heading size="sm">{datosUsuario[0].nombre}</Heading>
            ) : null}
          </Box>
          <Spacer />
          <Box>
            {datosSector.length > 0 ? (
              <Heading size={"sm"}>{datosSector[0].sectorDescripcion} </Heading>
            ) : null}
          </Box>
          <Spacer />
          <ButtonGroup gap="2">
            <Button
              size={"sm"}
              colorScheme="red"
              onClick={() => {
                router.push(
                  {
                    pathname: "/login",
                    query: { estado: "desconectado" },
                  },
                  "./login"
                );
              }}
            >
              cerrar sesion
            </Button>
          </ButtonGroup>
        </Flex>
      ) : (
        <></>
      )}
    </>
  );
};

export default withRouter(Usuario);
