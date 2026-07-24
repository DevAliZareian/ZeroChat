import { Box, Flex, HStack, Input, IconButton, Text, VStack, Avatar, useColorModeValue, InputRightElement, useColorMode, Spinner } from "@chakra-ui/react";
import { FiSend } from "react-icons/fi";
import { InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { IoIosCloseCircleOutline, IoIosSend, IoMdClose, IoMdSend } from "react-icons/io";
import colors from "@/theme/colors";
import { useNavigate, useParams } from "react-router-dom";
import { ImAttachment } from "react-icons/im";
import { MessageType } from "@/types/chat";
import { ChatMessage } from "./chat/ChatMessage";
import { isFirstInGroup } from "@/utils/chat";
import { useChatMessages } from "@/hooks/chat/useChatMessagesSocket";
import { useChatStore } from "@/store/useChatStore";
import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useConversationsWS } from "@/hooks/chat/useConversationsSocket";

export default function ChatRoom({ chatId }: { chatId: any }) {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const currentUser = useAuthStore((s) => s.user);
  const { conversations } = useConversationsWS();
  const conversation = conversations.find((c) => String(c.id) === chatId);
  const otherUser = conversation?.users.find((u) => u.id !== currentUser?.id);
  const displayName = conversation?.name || otherUser?.email || "Chat";

  const { messages } = useChatStore();
  const conversationMessages = chatId ? messages[chatId] || [] : [];

  const { sendMessage, isSending } = useChatMessages(chatId);

  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversationMessages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    sendMessage(newMessage);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

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
          {displayName}
        </Text>
      </Box>

      <VStack flex="1" px={6} py={4} spacing={1} overflowY="auto" align="stretch">
        {conversationMessages.map((msg, i) => {
          const isFirst = isFirstInGroup(conversationMessages, i);
          return (
            <ChatMessage
              key={msg.id}
              message={msg.content}
              status={String(msg.sender.id) === String(currentUser?.id) ? "outgoing" : "incoming"}
              isFirstInGroup={isFirst}
              timestamp={msg.timestamp}
              senderName={msg.sender.email}
              senderAvatar={undefined}
            />
          );
        })}
        <div ref={messagesEndRef} />
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
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
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
          icon={isSending ? <Spinner size="sm" /> : <IoMdSend size={24} />}
          aria-label="Send"
          onClick={handleSendMessage}
          isDisabled={isSending}
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
