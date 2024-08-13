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
  const [logeado, setLogado] = useState(true);

  useEffect(() => {
    clienteAxios("/traerdatosusuario", {
      method: "POST",
      data: { idUsuario: parseInt(props.router.query.idUsuario) },
    });
  }, [props.router.query.idUsuario]);

  return (
    <>
      {console.log(props.router.query)}
      {props.router.query.estado == "conectado" ? (
        <Flex minWidth="max-content" alignItems="center" gap="2">
          <Box p="2">
            <Heading size="sm">RODRIGO JOAQUIN GUZMAN</Heading>
          </Box>
          <Spacer />
          <Box>
            <Select size={"sm"} bg={"WHITE"}>
              <option>INFORMES</option>
              <option>SECCION ALUMNOS</option>
              <option>CONTABLE</option>
            </Select>
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
