import React from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import Usuario from "./Usuario";
import Menu from "./Menu";
const Cabecera = () => {
  return (
    <>
      <Box p={2} bgColor={"blue.300"}>
        <Grid templateColumns="repeat(5, 1fr)" gap={4}>
          <GridItem colSpan={2} h="10" bg="tomato">
            {" "}
            <Menu />
          </GridItem>
          <GridItem colStart={4} colEnd={6} h="10">
            <Usuario />
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default Cabecera;
