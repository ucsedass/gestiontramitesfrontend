import React from "react";
import { Box } from "@chakra-ui/react";
import Cabecera from "../Cabecera/Cabecera";

const Layout = (props) => {
  return (
    <>
      <Cabecera />
      <Box>{props.children}</Box>
    </>
  );
};

export default Layout;
