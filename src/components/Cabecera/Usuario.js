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

import { useUsuarioStore } from "../../store/usuarioStore";

const Usuario = (props) => {
  const router = useRouter();
  const [datosUsuario, setDatosUsuario] = useState({});
  const [datosSector, setDatosSector] = useState({});
  const [logeado, setLogado] = useState(true);
  const zusuario = useUsuarioStore((state) => state.idUsuario);
  const zsector = useUsuarioStore((state) => state.idSector);
  const zdescusuario = useUsuarioStore((state) => state.descUsuario);
  const zdescsector = useUsuarioStore((state) => state.descSector);
  const zconectado = useUsuarioStore((state) => state.conectado);
  const setUsuarioLogueado = useUsuarioStore(
    (state) => state.setUsuarioLogueado
  );
  const setSectorLogueado = useUsuarioStore((state) => state.setSectorLogueado);
  const setDescUsuario = useUsuarioStore((state) => state.setDescUsuario);
  const setDescSector = useUsuarioStore((state) => state.setDescSector);
  const setConectado = useUsuarioStore((state) => state.setConectado);
  useEffect(() => {
    clienteAxios("/traerdatosusuario", {
      method: "POST",
      data: { idUsuario: parseInt(zusuario) },
    })
      .then((respuesta) => {
        setDatosUsuario(respuesta.data);
        console.log("ressppp", respuesta.data[0].nombre);
        setDescUsuario(respuesta.data[0].nombre);
      })
      .catch((error) => {
        console.log(error);
      });

    clienteAxios("/traerdatossector", {
      method: "POST",
      data: { idSector: parseInt(zsector) },
    })
      .then((respuesta) => {
        console.log("Datos de sector:", respuesta.data);
        setDescSector(respuesta.data[0].sectorDescripcion),
          setDatosSector(respuesta.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [zconectado]);
  {
    console.log("ESTE ES EL EL ZUSUARIO (usuario):", zusuario);
    console.log("ESTE ES EL EL ZSECTOR (usuario):", zsector);
    console.log("ESTE ES LA DESCRIPCION  ZUSUARIO (usuario):", zdescusuario);
    console.log("ESTE ES LA DESCRIPCION ZSECTOR (usuario):", zdescsector);
    console.log("ESTE ES LA DESCRIPCION ZSECTOR (usuario):", zconectado);
    console.log("datos usuario", datosUsuario);
  }
  return (
    <>
      {console.log("Props:", props.router.query)}
      {zconectado == true ? (
        <Flex minWidth="max-content" alignItems="center" gap="2">
          <Box p="2">
            <Heading size="sm">{zdescusuario}</Heading>
          </Box>
          <Spacer />
          <Box>
            <Heading size={"sm"}>{zdescsector} </Heading>
          </Box>
          <Spacer />
          <ButtonGroup gap="2">
            <Button
              size={"sm"}
              colorScheme="red"
              onClick={() => {
                setConectado(false);
                setUsuarioLogueado(0);
                setSectorLogueado(0);
                setDescUsuario("");
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
