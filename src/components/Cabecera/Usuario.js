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
  FormLabel,
  FormControl,
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
        setDescSector(respuesta.data[0].sectorDescripcion),
          setDatosSector(respuesta.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [zconectado]);

  return (
    <>
      <Flex minWidth="max-content" alignItems="center">
        <FormControl>
          <Heading color={"white"} size={10}>
            USUARIO
          </Heading>
          <FormLabel color={"green.200"}>{zdescusuario}</FormLabel>
        </FormControl>
        <Spacer />
        <FormControl>
          <Heading color={"white"} size={10}>
            SECTOR{" "}
          </Heading>
          <FormLabel color={"green.200"}>{zdescsector}</FormLabel>
        </FormControl>
        <Spacer />
        <ButtonGroup>
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
            CERRAR SESION
          </Button>
        </ButtonGroup>
      </Flex>
    </>
  );
};

export default withRouter(Usuario);
