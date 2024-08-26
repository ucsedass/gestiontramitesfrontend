import React, { useState, useEffect } from "react";
import Movimientos from "react-data-table-component";
import clienteAxios from "@/config/axios";
import { useTramiteStore } from "@/store/tramiteStore";
import Moment from "moment";

const MovimientosTramites = () => {
  const zidtramite = useTramiteStore((state) => state.idTramite);
  const [movTramites, setMovTramites] = useState([]);

  const columns = [
    {
      name: "Fecha",
      selector: (row) =>
        Moment(row.fechaRealizaPaseTramite).format("DD-MM-YYYY HH:mm"),
    },
    {
      name: "mov",
      selector: (row) => row.sectorRealizaPaseDesc,
    },
    {
      name: "mov",
      selector: (row) => row.usuarioRealizaPaseDesc,
    },
    {
      name: "mov",
      selector: (row) => row.fechaAceptaPaseTramite,
    },
    {
      name: "mov",
      selector: (row) => row.sectorAceptaPaseDesc,
    },
    {
      name: "mov",
      selector: (row) => row.usuarioAceptaPaseDesc,
    },
    {
      name: "mov",
      selector: (row) => row.observaciones,
    },
  ];
  useEffect(() => {
    clienteAxios("/buscarmovimientostramites", {
      method: "POST",
      data: { idTramite: zidtramite },
    })
      .then((respuesta) => {
        console.log("Movimientos:", respuesta.data);
        setMovTramites(respuesta.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [zidtramite]);

  return (
    <>
      <p>Movimientos tramites</p>
      <p>{zidtramite}</p>
      <Movimientos data={movTramites} columns={columns} />
    </>
  );
};

export default MovimientosTramites;
