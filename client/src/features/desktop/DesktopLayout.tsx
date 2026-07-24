// DesktopLayout.tsx
import { Flex, useDisclosure } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import { LogoutDialog } from "./LogoutDialog";
import { Outlet } from "react-router-dom";

export default function DesktopLayout() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex h="100vh" w="100%" overflow="hidden" bg="layout.background">
      <Sidebar isLogoutDialogOpen={isOpen} onLogoutDialogOpen={onOpen} />
      <Outlet />
      <LogoutDialog isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
}
