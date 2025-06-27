import { Box, VStack, IconButton, Image, Spacer } from "@chakra-ui/react";
import { FiMessageSquare, FiUser, FiSettings } from "react-icons/fi";
import { IoMdMail } from "react-icons/io";
import { MdOutlineBookmark } from "react-icons/md";
import { FaMessage } from "react-icons/fa6";
import { FaBookmark, FaUser } from "react-icons/fa";
import { TiCloudStorage } from "react-icons/ti";
import { SiGooglecloudstorage } from "react-icons/si";

export default function Sidebar() {
  return (
    <Box w="80px" h="100vh" bg="layout.sidebar" color="white" display="flex" flexDirection="column" alignItems="center" py={4}>
      {/* Logo */}

      {/* Icons */}
      <VStack spacing={4} flex={1}>
        <IconButton icon={<FaMessage />} aria-label="Chats" variant="ghost" fontSize="24px" color="accent.blue" _hover={{ color: "accent.blue" }} />
        <IconButton icon={<FaBookmark />} aria-label="Contacts" variant="ghost" fontSize="24px" color="accent.deactive" _hover={{ color: "accent.blue" }} />
        <IconButton icon={<FaUser />} aria-label="Contacts" variant="ghost" fontSize="24px" color="accent.deactive" _hover={{ color: "accent.blue" }} />
      </VStack>

      {/* Bottom Settings */}
      <Box mb={2}>
        <IconButton icon={<FiSettings />} aria-label="Settings" variant="ghost" fontSize="22px" color="accent.deactive" _hover={{ color: "accent.blue" }} />
      </Box>
    </Box>
  );
}
