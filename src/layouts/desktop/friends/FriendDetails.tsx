import {
  Avatar,
  Box,
  Button,
  Circle,
  Divider,
  Flex,
  HStack,
  Icon,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Text,
  useClipboard,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { FaGlobe, FaRegEnvelope, FaPhoneAlt, FaRegCalendarAlt } from "react-icons/fa";
import colors from "@/theme/colors";
import { IoMdNotifications } from "react-icons/io";

const currentUserId = "317468cc-6bed-4352-8a8f-97914aa2c619";

export default function FriendDetails() {
  const { hasCopied, onCopy } = useClipboard(currentUserId);
  const { colorMode } = useColorMode();
  const currentColors = colorMode === "light" ? colors.light : colors.dark;
  return (
    <Flex direction="column" w="340px" h="100vh" borderLeft="1px solid" borderColor={currentColors.layout.border} bg={currentColors.layout.surface} px={4} py={6} overflowY="auto">
      {/* === Date & Notification === */}
      <Flex justify="space-between" align="center" mb={8}>
        <Text fontSize="sm" color={currentColors.text.secondary}>
          20 March 2021
        </Text>
        <Box position="relative">
          <IoMdNotifications size={20} color={currentColors.text.secondary} />

          <Circle
            size="16px" // or use Chakra token like "4"
            bg={currentColors.accent.blue}
            color={colorMode === "dark" ? "#2B2B2B" : "white"}
            fontSize="10px"
            fontWeight="bold"
            position="absolute"
            top="-6px"
            right="-6px"
          >
            3
          </Circle>
        </Box>
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

      <Text fontWeight="semibold" fontSize="sm" color={currentColors.text.primary} mb={4}>
        Information
      </Text>

      <VStack spacing={4} align="stretch" mb={8}>
        {/* Row: Website */}
        <Flex align="center" justify="space-between">
          <HStack spacing={3}>
            <Icon as={FaGlobe} color={currentColors.text.secondary} />
            <Text fontSize="sm" color={currentColors.text.secondary}>
              Website
            </Text>
          </HStack>
          <Text fontSize="sm" color={currentColors.text.primary}>
            www.Arnoldy.com
          </Text>
        </Flex>

        {/* Row: Email */}
        <Flex align="center" justify="space-between">
          <HStack spacing={3}>
            <Icon as={FaRegEnvelope} color={currentColors.text.secondary} />
            <Text fontSize="sm" color={currentColors.text.secondary}>
              Email
            </Text>
          </HStack>
          <Text fontSize="sm" color={currentColors.text.primary}>
            Hello@adalahreza.com
          </Text>
        </Flex>

        {/* Row: Phone */}
        <Flex align="center" justify="space-between">
          <HStack spacing={3}>
            <Icon as={FaPhoneAlt} color={currentColors.text.secondary} />
            <Text fontSize="sm" color={currentColors.text.secondary}>
              Phone
            </Text>
          </HStack>
          <Text fontSize="sm" color={currentColors.text.primary}>
            +62 517 218 92 00
          </Text>
        </Flex>

        {/* Row: Joined */}
        <Flex align="center" justify="space-between">
          <HStack spacing={3}>
            <Icon as={FaRegCalendarAlt} color={currentColors.text.secondary} />
            <Text fontSize="sm" color={currentColors.text.secondary}>
              Joined
            </Text>
          </HStack>
          <Text fontSize="sm" color={currentColors.text.primary}>
            26 March, 2023
          </Text>
        </Flex>
      </VStack>

      <Box mt="auto" pt={4}>
        <Flex gap={3}>
          <Popover placement="top" isLazy>
            <PopoverTrigger>
              <Button flex="1" bg="#FF5252" color={colorMode === "dark" ? "#2B2B2B" : "white"} _hover={{ opacity: 0.9 }}>
                Remove Friend
              </Button>
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
          <Button onClick={onCopy} flex="1" colorScheme="green" bg={"#FFEB3B"} color={colorMode === "dark" ? "#2B2B2B" : "white"} _hover={{ opacity: 0.9 }}>
            {hasCopied ? "Copied" : "Copy User ID"}
          </Button>
        </Flex>
        <Button width={"100%"} mt={4} colorScheme="green" bg={currentColors.accent.blue} color={colorMode === "dark" ? "#2B2B2B" : "white"} _hover={{ opacity: 0.9 }}>
          Start a New Chat
        </Button>
      </Box>
    </Flex>
  );
}
