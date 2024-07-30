import React from "react";
import { useRouter, withRouter } from "next/router";

import { Button, Flex, Heading, Input } from "@chakra-ui/react";
const Login = () => {
  const router = useRouter();
  return (
    <>
      <Flex height={"700px"} alignItems="center" justifyContent="center">
        <Flex direction="column" borderColor={"grey"} p={12} rounded={6}>
          <Heading direction="columns" mb={4}>
            Iniciar sesion
          </Heading>
          <Input placeholder="usuario" v mb={3}></Input>
          <Input placeholder="*********" mb={3}></Input>
          <Button
            size={"sm"}
            colorScheme="green"
            onClick={() => {
              router.push(
                {
                  pathname: "/tramites",
                  query: { estado: "conectado" },
                },
                "./tramites"
              );
            }}
          >
            iniciar sesion
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default withRouter(Login);
