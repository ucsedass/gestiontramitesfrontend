import React from "react";
import { Menu, MenuButton, MenuList, MenuItem, HStack } from "@chakra-ui/react";
import { useUsuarioStore } from "@/store/usuarioStore";
import { useRouter } from "next/router";
const menuPrincipal = () => {
  const zsector = useUsuarioStore((state) => state.idSector);
  const router = useRouter();
  return (
    <>
      <HStack>
        <Menu isLazy>
          <MenuButton color={"white"}>INICIO</MenuButton>
        </Menu>

        <Menu isLazy>
          <MenuButton color={"white"}>TRAMITES</MenuButton>
          <MenuList>
            <MenuItem
              onClick={() => {
                router.push("/tramites");
              }}
            >
              Mis trámites
            </MenuItem>
            <MenuItem
              onClick={() => {
                router.push("/consultatramites");
              }}
            >
              Consulta trámites
            </MenuItem>
            {zsector == 1 ? (
              <MenuItem
                onClick={() => {
                  router.push("/bmtramites");
                }}
              >
                BM trámites
              </MenuItem>
            ) : null}
          </MenuList>
        </Menu>
      </HStack>
    </>
  );
};
export default menuPrincipal;
