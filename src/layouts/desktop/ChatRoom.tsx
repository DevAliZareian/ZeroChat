import { Box, Flex, HStack, Input, IconButton, Text, VStack, Avatar, useColorModeValue } from "@chakra-ui/react";
import { FiSend } from "react-icons/fi";
import { InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { IoIosSend, IoMdSend } from "react-icons/io";
import colors from "@/theme/colors";

export default function ChatRoom() {
  return (
    <Flex direction="column" h="100vh" flex="1" bg={colors.layout.background} borderRight="1px solid" borderColor={colors.layout.border}>
      {/* ===== HEADER ===== */}
      <Box px={6} py={4} borderBottom="1px solid" borderColor={colors.layout.border}>
        {/* === Search Input === */}
        <InputGroup mb={4}>
          <InputLeftElement pointerEvents="none">
            <FiSearch color={colors.text.secondary} />
          </InputLeftElement>

          <Input
            placeholder="Search friends"
            variant="filled"
            bg={colors.layout.surface}
            _hover={{ bg: colors.layout.surface }}
            _focus={{
              bg: colors.layout.surface,
              borderColor: colors.accent.blue,
              boxShadow: `0 0 0 1px ${colors.accent.blue}`,
            }}
            borderRadius="full"
            size="md"
            color={colors.text.primary}
            border="1px solid"
            borderColor={colors.layout.border}
          />
        </InputGroup>

        {/* === Chat With Title === */}
        <Text fontSize="sm" color={colors.text.secondary}>
          Chat with
        </Text>
        <Text fontWeight="bold" fontSize="lg" color={colors.text.primary}>
          Dapsh Levi
        </Text>
      </Box>

      {/* ===== CHAT MESSAGES ===== */}
      <VStack flex="1" px={6} py={4} spacing={4} overflowY="auto" align="stretch">
        {/* Example incoming message */}
        <Box alignSelf="flex-start" bg={colors.chat.incoming} px={4} py={2} borderRadius="md" maxW="75%">
          <Text fontSize="sm" color={colors.text.primary}>
            Hey Travis, would you like to grab some coffee?
          </Text>
        </Box>

        {/* Example outgoing message */}
        <Box alignSelf="flex-end" bg={colors.chat.outgoing} px={4} py={2} borderRadius="md" maxW="75%">
          <Text fontSize="sm" color={colors.text.primary}>
            Sure! At 11:00?
          </Text>
        </Box>
      </VStack>

      {/* ===== MESSAGE INPUT ===== */}
      <HStack px={6} py={4} mb={2} borderTop="1px solid" borderColor={colors.layout.border}>
        <Input
          placeholder="Type your message"
          variant="filled"
          bg={colors.layout.surface}
          _focus={{
            borderColor: colors.accent.blue,
            boxShadow: `0 0 0 1px ${colors.accent.blue}`,
            bg: colors.layout.surface,
          }}
          color={colors.text.primary}
          borderRadius={"full"}
          border="1px solid"
          borderColor={colors.layout.border}
        />
        <IconButton
          icon={<IoMdSend size={22} />}
          aria-label="Send"
          variant="ghost"
          size="sm"
          color={colors.accent.blue}
          _hover={{ color: colors.accent.deactive }}
          bg="transparent"
          borderRadius="full"
        />
      </HStack>
    </Flex>
  );
}
