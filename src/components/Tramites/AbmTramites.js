import React, { useState, useEffect } from "react";

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
const AbmTramites = () => {
  const [solicitante, setSolicitante] = useState(1);
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
            <Select size={"sm"}>
              <option>INTERNO</option>
              <option>GESTION ACADEMICA</option>
            </Select>
          </FormControl>
          <FormControl>
            <Heading fontSize={12}>Tipo trámite</Heading>
            <Select size={"sm"}>
              <option>TITULO EN TRAMITE</option>
              <option>INTERRUPCION DE CURSADO</option>
              <option>PASE DE UNIVERSIDAD</option>
              <option>PASE INTERNO</option>
              <option>RECONOCIMIENTO INT Y EXT</option>
              <option>CAMBIO DE CARRERA</option>
              <option>CERTIFICADO ANALITICO</option>
            </Select>
          </FormControl>
          <FormControl>
            <Heading fontSize={12}>Fecha ingreso</Heading>
            <Input size={"sm"} type="datetime-local"></Input>
          </FormControl>
          <FormControl>
            <Heading fontSize={12}>Folios</Heading>
            <Input size={"sm"}></Input>
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
              size={"sm"}
              onChange={(e) => {
                setSolicitante(e.target.value);
              }}
            >
              <option value={1}>ALUMNO</option>
              <option value={2}>EXTERNO</option>
            </Select>
          </FormControl>

          {solicitante === "1" ? (
            <>
              <FormControl>
                <Heading fontSize={12}>DNI</Heading>
                <Flex>
                  {" "}
                  <Input size={"sm"}></Input>
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
                <Input></Input>
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
            <Textarea></Textarea>
          </FormControl>
        </Stack>

        <Button mt={2} colorScheme={"green"} w={"100%"} size={"sm"}>
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
