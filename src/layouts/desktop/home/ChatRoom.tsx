import { Box, Flex, HStack, Input, IconButton, Text, VStack, Avatar, useColorModeValue, InputRightElement, useColorMode } from "@chakra-ui/react";
import { FiSend } from "react-icons/fi";
import { InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { IoIosCloseCircleOutline, IoIosSend, IoMdClose, IoMdSend } from "react-icons/io";
import colors from "@/theme/colors";
import { useNavigate } from "react-router-dom";
import { ImAttachment } from "react-icons/im";

export default function ChatRoom({ chatId }: { chatId: any }) {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const currentColors = colorMode === "light" ? colors.light : colors.dark;
  return (
    <Flex direction="column" h="100vh" flex="1" bg={currentColors.layout.background} borderColor={currentColors.layout.border}>
      {/* ===== HEADER ===== */}
      <Box px={6} py={4} borderBottom="1px solid" borderColor={currentColors.layout.border}>
        {/* === Search Input === */}
        <Flex align="center" mb={4} gap={3}>
          <InputGroup flex="1">
            <InputLeftElement pointerEvents="none">
              <FiSearch color={currentColors.text.secondary} />
            </InputLeftElement>

            <Input
              placeholder="Search in chat"
              variant="filled"
              bg={currentColors.layout.surface}
              _hover={{ bg: currentColors.layout.surface }}
              _focus={{
                bg: currentColors.layout.surface,
                borderColor: currentColors.accent.blue,
              }}
              borderRadius="full"
              size="md"
              color={currentColors.text.primary}
              border="1px solid"
              borderColor={currentColors.layout.border}
            />
          </InputGroup>

          <IconButton
            icon={<IoIosCloseCircleOutline size={36} />}
            aria-label="Clear search"
            variant="ghost"
            size="sm"
            rounded={"full"}
            color={currentColors.accent.blue}
            onClick={() => {
              navigate("/app");
            }}
            bg="transparent"
          />
        </Flex>

        {/* === Chat With Title === */}
        <Text fontSize="sm" color={currentColors.text.secondary}>
          Chat with
        </Text>
        <Text fontWeight="bold" fontSize="lg" color={currentColors.accent.blue}>
          Dapsh Levi
        </Text>
      </Box>

      <VStack flex="1" px={6} py={4} spacing={4} overflowY="auto" align="stretch">
        {/* Incoming */}
        <Box alignSelf="flex-start" bg={currentColors.chat.incoming} px={4} py={2} borderRadius="md" maxW="75%">
          <Text fontSize="sm" color={currentColors.text.primary}>
            Hey Travis, would you like to grab some coffee?
          </Text>
        </Box>

        {/* Outgoing */}
        <Box alignSelf="flex-end" bg={currentColors.chat.outgoing} px={4} py={2} borderRadius="md" maxW="75%">
          <Text fontSize="sm" color={currentColors.text.primary}>
            Sure! At 11:00?
          </Text>
        </Box>

        {/* Incoming */}
        <Box alignSelf="flex-start" bg={currentColors.chat.incoming} px={4} py={2} borderRadius="md" maxW="75%">
          <Text fontSize="sm" color={currentColors.text.primary}>
            That works. Want to meet at Grounded Café?
          </Text>
        </Box>

        {/* Outgoing */}
        <Box alignSelf="flex-end" bg={currentColors.chat.outgoing} px={4} py={2} borderRadius="md" maxW="75%">
          <Text fontSize="sm" color={currentColors.text.primary}>
            Perfect. I’ll be there a few minutes early.
          </Text>
        </Box>

        {/* Incoming */}
        <Box alignSelf="flex-start" bg={currentColors.chat.incoming} px={4} py={2} borderRadius="md" maxW="75%">
          <Text fontSize="sm" color={currentColors.text.primary}>
            Awesome. I’ll grab us a window seat if I get there first.
          </Text>
        </Box>

        {/* Outgoing */}
        <Box alignSelf="flex-end" bg={currentColors.chat.outgoing} px={4} py={2} borderRadius="md" maxW="75%">
          <Text fontSize="sm" color={currentColors.text.primary}>
            Sounds great. See you soon!
          </Text>
        </Box>
      </VStack>

      {/* ===== MESSAGE INPUT ===== */}
      <HStack px={6} py={4} borderTop="1px solid" borderColor={currentColors.layout.border}>
        <InputGroup>
          <Input
            placeholder="Type your message"
            variant="filled"
            bg={currentColors.layout.surface}
            _hover={{ bg: currentColors.layout.surface }}
            _focus={{
              borderColor: currentColors.accent.blue,
              bg: currentColors.layout.surface,
            }}
            color={currentColors.text.primary}
            borderRadius="full"
            border="1px solid"
            borderColor={currentColors.layout.border}
            pr="3rem"
          />

          <InputRightElement width="3rem">
            <IconButton
              icon={<ImAttachment size={18} />}
              aria-label="Send"
              variant="ghost"
              size="sm"
              color={currentColors.accent.blue}
              _hover={{ color: currentColors.accent.deactive }}
              bg="transparent"
              borderRadius="full"
            />
          </InputRightElement>
        </InputGroup>
        <IconButton
          icon={<IoMdSend size={24} />}
          aria-label="Send"
          variant="ghost"
          size="sm"
          color={currentColors.accent.blue}
          _hover={{ color: currentColors.accent.deactive }}
          bg="transparent"
          borderRadius="full"
        />
      </HStack>
    </Flex>
  );
}
