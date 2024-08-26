import React from "react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { useRouter, withRouter } from "next/router";
const menuPrincipal = () => {
  const router = useRouter();
  return (
    <>
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
    </>
  );
};
export default menuPrincipal;
