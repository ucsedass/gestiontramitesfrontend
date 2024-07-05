import React from "react";
import TablaNotas from "react-data-table-component";
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
  Menu,
  MenuButton,
  Text,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
const Notas = () => {
  const columns = [
    {
      name: "Nota",
      selector: (row) => row.nota,
    },
    {
      name: "Fecha",
      selector: (row) => row.fecha,
    },
    {
      name: "Estado",
      selector: (row) => row.estado,
    },
    {
      name: "Folio",
      selector: (row) => row.folio,
    },
    ,
    {
      name: "Sec Destino",
      selector: (row) => row.destino,
    },
    {
      name: "Procedencia",
      selector: (row) => row.procedencia,
    },
    {
      name: (
        <Text fontSize="2xs" as="b">
          Tipo tramite (clase tramite)
        </Text>
      ),
      selector: (row) => row.asunto,
    },

    {
      name: (
        <Text fontSize="2xs" as="b">
          {" "}
          Accion
        </Text>
      ),

      cell: (row) => (
        <Box>
          <Menu placement="right">
            <MenuButton p={1} size="2xs" w="30px" as={Button} bgColor="white">
              ...
            </MenuButton>

            <MenuList bgSize="sm" minW="0" w={"80px"}>
              <MenuItem>Pasar</MenuItem>
              <MenuItem>Aceptar</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      ),
    },
  ];
  const data = [
    {
      id: 1,
      nota: "310-2024",
      fecha: "15-06-2024",
      estado: "Aceptada",
      folio: "2",
      destino: "DIRECCION",
      procedencia: "UNJU",
      asunto: "PASE DE UNIVERSIDAD",
    },
    {
      id: 2,
      nota: "15-2024",
      fecha: "11-06-2024",
      estado: "Aceptada",
      folio: "2",
      destino: "SEC ALUMNOS",
      procedencia: "RODRIGO GUZMAN",
      asunto: "TITULO EN TRAMITE",
    },
    {
      id: 3,
      nota: "154-2024",
      estado: "Aceptada",
      fecha: "05-06-2024",
      folio: "4",
      destino: "SEC ALUMNOS",
      procedencia: "JOAQUIN GUZMAN",
      asunto: "CAMBIO DE CARRERA",
    },
    {
      id: 4,
      nota: "07-2024",
      estado: "Aceptada",
      fecha: "08-06-2024",
      folio: "2",
      destino: "SEC ALUMNOS",
      procedencia: "NOVA INFORMATICA",
      asunto: "TITULO EN TRAMITE",
    },
    {
      id: 5,
      nota: "652-2024",
      fecha: "25-04-2024",
      estado: "Aceptada",
      folio: "2",
      destino: "LABORATORIO",
      procedencia: "joaquin guzman",
      asunto: "TITULO EN TRAMITE",
    },
  ];

  return (
    <>
      <Box w="80%" mx="auto" mt={4}>
        <Center>
          <FormLabel mb="0px">ALTA DENOTAS</FormLabel>
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
            <Heading fontSize={14}>Numero</Heading>
            <Input></Input>
          </FormControl>
          <FormControl>
            <Heading fontSize={14}>Año</Heading>
            <Input></Input>
          </FormControl>
          <FormControl>
            <Heading fontSize={14}>Fecha ingreso</Heading>
            <Input type="date"></Input>
          </FormControl>
          <FormControl>
            <Heading fontSize={14}>Folios</Heading>
            <Input></Input>
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
            <Heading fontSize={14}>Sector destino</Heading>
            <Select>
              <option>DIRECCION</option>
              <option>SECCION ALUMNOS</option>
              <option>COORDINACION INGENIERIA</option>
              <option>CONTABLE</option>
              <option>LABORATORIO INFORMATICO</option>
              <option>COORDINACION ABOGACIA</option>
            </Select>
          </FormControl>

          <FormControl>
            <Heading fontSize={14}>Procedencia</Heading>
            <Select>
              <option>INTERNO</option>
              <option>GESTION ACADEMICA</option>
            </Select>
          </FormControl>
          <FormControl>
            <Heading fontSize={14}>
              Tipo tramite (clas tramite) AGREGAR REQUISITOS
            </Heading>
            <Select>
              <option>TITULO EN TRAMITE</option>
              <option>INTERRUPCION DE CURSADO</option>
              <option>PASE DE UNIVERSIDAD</option>
              <option>PASE INTERNO</option>
              <option>RECONOCIMIENTO INT Y EXT</option>
              <option>CAMBIO DE CARRERA</option>
              <option>CERTIFICADO ANALITICO</option>
            </Select>
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
            <Heading fontSize={14}>Observaciones</Heading>
            <Textarea></Textarea>
          </FormControl>
        </Stack>

        <Button mt={2} colorScheme={"green"} w={"100%"} size={"sm"}>
          Guardar
        </Button>
        <Box mt={10} mb={10}>
          <Center>
            <FormLabel mb="0px">NOTAS CARGADAS</FormLabel>
          </Center>
          <TablaNotas columns={columns} data={data} />
        </Box>
      </Box>
    </>
  );
};
export default Notas;
