import React from "react";
import { Menu, MenuButton, MenuList, MenuItem, HStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
const menuPrincipal = () => {
  const router = useRouter();
  return (
    <>
      <HStack>
        <Menu isLazy>
          <MenuButton>Inicio</MenuButton>
        </Menu>

        <Menu isLazy>
          <MenuButton>Tramites</MenuButton>
          <MenuList>
            {/* MenuItems are not rendered unless Menu is open */}
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
          </MenuList>
        </Menu>
      </HStack>
    </>
  );
};
export default menuPrincipal;
