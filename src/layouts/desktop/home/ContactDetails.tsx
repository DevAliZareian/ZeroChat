import { Avatar, Box, Divider, Flex, HStack, Icon, Image, Text, useColorMode, VStack } from "@chakra-ui/react";
import { FiBell, FiDribbble } from "react-icons/fi";
import { FaTwitter, FaInstagram, FaGlobe } from "react-icons/fa";
import colors from "@/theme/colors";
import { IoMdNotifications } from "react-icons/io";

export default function ContactDetails() {
  const { colorMode } = useColorMode();
  const currentColors = colorMode === "light" ? colors.light : colors.dark;
  return (
    <Flex direction="column" w="340px" h="100vh" borderLeft="1px solid" borderColor={currentColors.layout.border} bg={currentColors.layout.surface} px={4} py={6} overflowY="auto">
      {/* === Date & Notification === */}
      <Flex justify="space-between" align="center" mb={8}>
        <Text fontSize="sm" color={currentColors.text.secondary}>
          20 March 2021
        </Text>
        <IoMdNotifications size={20} color={currentColors.text.secondary} />
      </Flex>

      {/* === Avatar & User Info === */}
      <VStack spacing={2} mb={6}>
        <Box position="relative">
          <Avatar size="xl" name="Dapsh Levi" src="/images/dina.jpg" />
          <Box position="absolute" bottom="4px" right="10px" bg="green.400" border={`2px solid ${currentColors.layout.surface}`} boxSize="14px" borderRadius="full" />
        </Box>
        <Text fontWeight="bold" fontSize="lg" color={currentColors.text.primary}>
          Dapsh Levi
        </Text>
        <HStack spacing={4}>
          <Icon as={FaGlobe} boxSize={4} color={currentColors.text.secondary} />
          <Icon as={FaInstagram} boxSize={4} color={currentColors.text.secondary} />
          <Icon as={FaTwitter} boxSize={4} color={currentColors.text.secondary} />
        </HStack>
      </VStack>

      <Divider mb={4} />

      {/* === Shared Files === */}
      <Flex justify="space-between" align="center" mb={2}>
        <Text fontWeight="semibold" fontSize="sm" color={currentColors.text.primary}>
          Shared Files
        </Text>
        <Text fontSize="xs" color={currentColors.accent.blue} cursor="pointer">
          see all
        </Text>
      </Flex>

      <VStack spacing={3} align="stretch" mb={6}>
        {["PhotoDarwer.jpg", "PhotoDarwer.jpg", "PhotoDarwer.jpg", "PhotoDarwer.jpg"].map((filename, i) => (
          <HStack key={i} spacing={3}>
            <Image src="/images/file-icon.png" boxSize="36px" borderRadius="md" />
            <Box>
              <Text fontSize="sm" color={currentColors.text.primary}>
                {filename}
              </Text>
              <Text fontSize="xs" color={currentColors.text.secondary}>
                17:50 • 175kb
              </Text>
            </Box>
          </HStack>
        ))}
      </VStack>

      {/* === Shared Links === */}
      <Flex justify="space-between" align="center" mb={2}>
        <Text fontWeight="semibold" fontSize="sm" color={currentColors.text.primary}>
          Shared Links
        </Text>
        <Text fontSize="xs" color={currentColors.accent.blue} cursor="pointer">
          see all
        </Text>
      </Flex>

      <VStack spacing={3} align="stretch">
        {[
          { title: "Dribbble.com", time: "10:32am", date: "10.12.2020" },
          { title: "Awwwards.com", time: "10:32pm", date: "10.12.2020" },
        ].map((link, i) => (
          <HStack key={i} spacing={3}>
            <Icon as={FiDribbble} color={currentColors.accent.blue} />
            <Box>
              <Text fontSize="sm" color={currentColors.text.primary}>
                {link.title}
              </Text>
              <Text fontSize="xs" color={currentColors.text.secondary}>
                {link.time} • {link.date}
              </Text>
            </Box>
          </HStack>
        ))}
      </VStack>
    </Flex>
  );
}
