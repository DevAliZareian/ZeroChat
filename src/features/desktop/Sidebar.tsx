import { Box, VStack, IconButton, useColorMode } from "@chakra-ui/react";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { FaMessage, FaBookmark, FaUser } from "react-icons/fa6";
import colors from "@/theme/colors";
import { HiUserGroup } from "react-icons/hi2";
import { useSidebarStore } from "@/store/useSidebarStore";
interface SidebarProps {
  isLogoutDialogOpen: boolean;
  onLogoutDialogOpen: () => void;
}

export default function Sidebar({ isLogoutDialogOpen, onLogoutDialogOpen }: SidebarProps) {
  const { colorMode } = useColorMode();
  const currentColors = colorMode === "light" ? colors.light : colors.dark;

  const activeSection = useSidebarStore((s) => s.activeSection);
  const setActiveSection = useSidebarStore((s) => s.setActiveSection);

  const activeIconColor = currentColors.accent.blue;
  const inactiveIconColor = currentColors.accent.deactive;

  return (
    <Box w="80px" h="100vh" bg={currentColors.layout.sidebar} borderRight={`1px solid ${currentColors.layout.border}`} display="flex" flexDirection="column" alignItems="center" py={4}>
      <VStack spacing={4} flex={1}>
        <IconButton
          icon={<FaMessage />}
          aria-label="Chats"
          variant="ghost"
          fontSize="24px"
          onClick={() => setActiveSection("chats")}
          color={activeSection === "chats" ? activeIconColor : inactiveIconColor}
          _hover={{ color: activeIconColor }}
        />
        {/* <IconButton
          icon={<FaBookmark />}
          aria-label="Bookmarks"
          variant="ghost"
          fontSize="24px"
          onClick={() => setActiveSection("bookmarks")}
          color={activeSection === "bookmarks" ? activeIconColor : inactiveIconColor}
          _hover={{ color: activeIconColor }}
        /> */}
        <IconButton
          icon={<HiUserGroup />}
          aria-label="Friends"
          variant="ghost"
          fontSize="24px"
          onClick={() => setActiveSection("friends")}
          color={activeSection === "friends" ? activeIconColor : inactiveIconColor}
          _hover={{ color: activeIconColor }}
        />
      </VStack>

      <Box mb={2}>
        <IconButton
          icon={<FiSettings />}
          aria-label="Settings"
          variant="ghost"
          fontSize="22px"
          onClick={() => setActiveSection("settings")}
          color={activeSection === "settings" ? activeIconColor : inactiveIconColor}
          _hover={{ color: activeIconColor }}
        />
      </Box>
      <Box>
        <IconButton
          icon={<FiLogOut />}
          aria-label="Settings"
          variant="ghost"
          fontSize="22px"
          onClick={() => onLogoutDialogOpen()}
          color={isLogoutDialogOpen ? activeIconColor : inactiveIconColor}
          _hover={{ color: activeIconColor }}
        />
      </Box>
    </Box>
  );
}
