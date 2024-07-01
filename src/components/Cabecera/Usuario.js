import React from "react";
import {
  Flex,
  Box,
  Spacer,
  Button,
  ButtonGroup,
  Heading,
  Select,
} from "@chakra-ui/react";

const Usuario = () => {
  return (
    <>
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
          <Button size={"sm"} colorScheme="red">
            cerrar sesion
          </Button>
        </ButtonGroup>
      </Flex>
    </>
  );
};

export default Usuario;
