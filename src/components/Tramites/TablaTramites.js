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
const TablaTramites = () => {
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
          <FormLabel mb="0px">TRAMITES CARGADOS</FormLabel>
        </Center>
        <TablaNotas columns={columns} data={data} />
      </Box>
    </>
  );
};
export default TablaTramites;
