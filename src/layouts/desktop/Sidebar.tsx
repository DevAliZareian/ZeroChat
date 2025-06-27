import { Box, VStack, IconButton, useColorMode } from "@chakra-ui/react";
import { FiSettings } from "react-icons/fi";
import { FaMessage, FaBookmark, FaUser } from "react-icons/fa6";
import colors from "@/theme/colors";
import { useSidebarStore } from "@/store/useSidebarStore";

export default function Sidebar() {
  const { colorMode } = useColorMode();
  const currentColors = colorMode === "light" ? colors.light : colors.dark;

  const activeSection = useSidebarStore((s) => s.activeSection);
  const setActiveSection = useSidebarStore((s) => s.setActiveSection);

  const activeIconColor = currentColors.accent.blue;
  const inactiveIconColor = currentColors.accent.deactive;

  return (
    <Box w="80px" h="100vh" bg={currentColors.layout.sidebar} display="flex" flexDirection="column" alignItems="center" py={4}>
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
        <IconButton
          icon={<FaBookmark />}
          aria-label="Bookmarks"
          variant="ghost"
          fontSize="24px"
          onClick={() => setActiveSection("bookmarks")}
          color={activeSection === "bookmarks" ? activeIconColor : inactiveIconColor}
          _hover={{ color: activeIconColor }}
        />
        <IconButton
          icon={<FaUser />}
          aria-label="Contacts"
          variant="ghost"
          fontSize="24px"
          onClick={() => setActiveSection("contacts")}
          color={activeSection === "contacts" ? activeIconColor : inactiveIconColor}
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
    </Box>
  );
}
