import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Icon,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { FiBell, FiDribbble } from "react-icons/fi";
import colors from "@/theme/colors";
import { IoPersonRemove } from "react-icons/io5";

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

        <Popover placement="bottom" isLazy>
          <PopoverTrigger>
            <IoPersonRemove size={16} color={currentColors.text.secondary} cursor={"pointer"} />
          </PopoverTrigger>

          <PopoverContent bg={colorMode === "dark" ? "gray.800" : "white"}>
            <PopoverArrow bg={colorMode === "dark" ? "gray.800" : "white"} />

            <PopoverBody>
              <Text fontSize="sm" fontWeight="medium">
                Are you sure you want to remove this friend?
              </Text>
            </PopoverBody>

            <PopoverFooter display="flex" justifyContent="flex-end" gap={2}>
              <Button size="sm" variant="ghost">
                Cancel
              </Button>
              <Button size="sm" colorScheme="red" bg="#FF5252" color={colorMode === "dark" ? "#2B2B2B" : "white"} _hover={{ opacity: 0.9 }}>
                Remove
              </Button>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </Flex>

      {/* === Avatar & User Info === */}
      <VStack spacing={2} mb={6}>
        <Box position="relative">
          <Avatar size="xl" name="Dapsh Levi" src="/images/dina.jpg" border={`1px solid ${currentColors.layout.border}`} />
          <Box position="absolute" bottom="4px" right="10px" bg={currentColors.accent.blue} border={`2px solid ${currentColors.layout.surface}`} boxSize="14px" borderRadius="full" />
        </Box>
        <Text fontWeight="bold" fontSize="lg" color={currentColors.text.primary}>
          Dapsh Levi
        </Text>
        <Text fontSize="sm" color={currentColors.text.secondary} textAlign="center" px={4}>
          Product designer @ASPCreative • Coffee nerd • Always sketching
        </Text>
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
      <Box mt={4} pt={4}>
        <Button w="100%" colorScheme="green" bg={currentColors.accent.blue} color={colorMode === "dark" ? "#2B2B2B" : "white"} _hover={{ opacity: 0.9 }}>
          Clear History
        </Button>
      </Box>
    </Flex>
  );
}
