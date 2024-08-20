import React, { useState, useEffect } from "react";
import TablaNotas from "react-data-table-component";
import { useUsuarioStore } from "@/store/usuarioStore";
import clienteAxios from "@/config/axios";
import Moment from "moment";
import {
  Box,
  Center,
  FormLabel,
  Button,
  Menu,
  MenuButton,
  Text,
  MenuList,
  MenuItem,
  Badge,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalFooter,
  ModalHeader,
  Select,
} from "@chakra-ui/react";
import { estiloTablas } from "../styles/estiloTablas";

const TablaTramites = () => {
  const [tramites, setTramites] = useState([]);
  const [tramiteSeleccionado, setTramiteSeleccionado] = useState(0);
  const [sectorSeleccionado, setSectorSeleccionado] = useState(0);
  const [sectores, setSectores] = useState([]);
  const zsector = useUsuarioStore((state) => state.idSector);
  const zactualizar = useUsuarioStore((state) => state.actualizar);
  const setActualizar = useUsuarioStore((state) => state.setActualizar);
  const [modalNuevoPase, setModalNuevoPase] = useState(false);

  useEffect(() => {
    clienteAxios("/traertramites", {
      method: "POST",
      data: { idSector: zsector },
    })
      .then((respuesta) => {
        console.log("Tramites:", respuesta.data);
        setTramites(respuesta.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [zactualizar]);

  useEffect(() => {
    clienteAxios("/traersectores", {
      method: "POST",
    })
      .then((respuesta) => {
        console.log("Sectores:", respuesta.data);
        setSectores(respuesta.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const columns = [
    {
      name: "Tramite",
      selector: (row) => row.tramiteNum + "-" + row.tramiteAño,
      width: "80px",
    },
    {
      name: "Fecha",
      selector: (row) => Moment(row.tramiteFechaIng).format("DD-MM-YYYY HH:mm"),
      width: "120px",
    },
    {
      name: "Folios",
      selector: (row) => row.tramiteFolio,
      width: "60px",
      center: true,
    },
    {
      name: "Solicitante",
      selector: (row) =>
        row.idTipoSolicitanteTramite === 1
          ? row.dniSolicitanteAlumno
          : row.descTramSolicitanteExterno,

      width: "auto",
    },
    ,
    {
      name: "Estado",
      selector: (row) =>
        row.idEstado === 1 ? (
          <Badge colorScheme={"green"}>{row.estadoDescripcion}</Badge>
        ) : row.idEstado === 2 ? (
          <Badge colorScheme={"purple"}>{row.estadoDescripcion}</Badge>
        ) : null,
      width: "200px",
    },

    {
      name: (
        <Text fontSize="2xs" as="b">
          Tipo tramite
        </Text>
      ),
      selector: (row) => row.tramiteDescripcion,
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
              <MenuItem
                onClick={() => {
                  setTramiteSeleccionado(row.idTramite);
                  setModalNuevoPase(true);
                }}
              >
                Pasar
              </MenuItem>
              <MenuItem>Aceptar</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      ),
    },
  ];
  console.log("Actualizar:", zactualizar);

  const realizarPase = () => {
    console.log("aqui se realiza el pase", {
      sectorSeleccionado,
      tramiteSeleccionado,
    });
  };

  return (
    <>
      <Box w="80%" mx="auto" mt={4}>
        <Center>
          <FormLabel mb="0px">TRAMITES CARGADOS</FormLabel>
        </Center>
        <TablaNotas
          columns={columns}
          data={tramites}
          noDataComponent={"No tiene tramites en su sector"}
          customStyles={estiloTablas}
        />
      </Box>

      <Modal
        isOpen={modalNuevoPase}
        onClose={() => {
          setModalNuevoPase(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <p>
              Tramite:{tramiteSeleccionado}Sector: {sectorSeleccionado}
            </p>

            <Select
              size={"sm"}
              name="sectorSeleccionado"
              id="sectorSeleccionado"
              onChange={(e) => {
                setSectorSeleccionado(e.target.value);
              }}
            >
              {sectores.length > 0
                ? sectores.map(({ idSector, sectorDescripcion }) => (
                    <option key={idSector} value={idSector}>
                      {" "}
                      {idSector + "|" + sectorDescripcion}
                    </option>
                  ))
                : null}
            </Select>
            <Button
              colorScheme={"green"}
              onClick={() => {
                realizarPase();
              }}
            >
              REALIZAR PASE
            </Button>
            <Button
              size={"sm"}
              onClick={() => {
                setModalNuevoPase(false);
              }}
            >
              cerrar
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default TablaTramites;
