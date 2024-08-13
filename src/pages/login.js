import React, { useState, useEffect } from "react";
import { useRouter, withRouter } from "next/router";
import clienteAxios from "@/config/axios";

import {
  Button,
  Flex,
  Heading,
  Input,
  Select,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Text,
} from "@chakra-ui/react";
const Login = () => {
  const [usuario, setUsuario] = useState(" ");
  const [contraseña, setContraseña] = useState(" ");
  const [datosUsuario, setDatosUsuario] = useState({});
  const [idUsuario, setIdUsuario] = useState(0);
  const [error, setError] = useState(false);
  const [ingreso, setIngreso] = useState(false);

  const login = () => {
    console.log("mandamos a la api", usuario);
    console.log("mandamos a la api", contraseña);

    clienteAxios("/login", {
      method: "POST",
      data: { usuario: usuario, contraseña: contraseña },
    })
      .then((repsuesta) => {
        console.log(repsuesta.data);

        if (repsuesta.data.length == 0) {
          setError(true);
        } else {
          setError(false);
          setIngreso(true);
          setDatosUsuario(repsuesta.data);
          setIdUsuario(repsuesta.data[0].idUsuario);
        }
      })
      .catch((erorr) => {
        console.log(error);
      });
  };

  const borrarCampos = () => {
    setUsuario(" ");
    setContraseña(" ");
  };

  const router = useRouter();
  return (
    <>
      <Flex height={"700px"} alignItems="center" justifyContent="center">
        <Flex direction="column" borderColor={"grey"} p={12} rounded={6}>
          {ingreso === false ? (
            <>
              {" "}
              <Heading direction="columns" mb={4}>
                Iniciar sesion
              </Heading>
              <Input
                name="usuario"
                placeholder="usuario"
                mb={3}
                onChange={(e) => {
                  setUsuario(e.target.value);
                }}
              ></Input>
              <Input
                name="contraseña"
                type="password"
                placeholder="*********"
                mb={3}
                onChange={(e) => {
                  setContraseña(e.target.value);
                }}
              ></Input>
              <Button
                mb={3}
                size={"sm"}
                colorScheme="green"
                onClick={() => {
                  // router.push(
                  //   {
                  //     pathname: "/tramites",
                  //     query: { estado: "conectado" },
                  //   },
                  //   "./tramites"
                  // );

                  login();
                }}
              >
                iniciar sesion
              </Button>{" "}
            </>
          ) : null}

          {error === true ? (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>Usuario o contraseña incorrecta.</AlertTitle>
              <AlertDescription>Ingrese nuevamente.</AlertDescription>
            </Alert>
          ) : null}
          {ingreso === true ? (
            <>
              <Heading direction="columns" mb={4}>
                Seleccione sector
              </Heading>
              <Text mb={3} as="b">
                {datosUsuario[0].nombre}
              </Text>
              <Select size={"sm"} mb={3}>
                <option>ALUMNOS</option>
                <option>LABORATORIO</option>
                <option>INFORMES</option>
              </Select>
              <Button
                mb={3}
                size={"sm"}
                colorScheme={"blue"}
                onClick={() => {
                  router.push(
                    {
                      pathname: "/tramites",
                      query: {
                        estado: "conectado",
                        idUsuario,
                      },
                      body: datosUsuario,
                    },
                    "./tramites"
                  );
                }}
              >
                Ingresar con el sector seleccionado
              </Button>
              <Button
                size={"sm"}
                colorScheme={"red"}
                onClick={() => {
                  setIngreso(false);
                  borrarCampos();
                }}
              >
                Cancelar
              </Button>
            </>
          ) : null}
        </Flex>
      </Flex>
    </>
  );
};

export default withRouter(Login);
