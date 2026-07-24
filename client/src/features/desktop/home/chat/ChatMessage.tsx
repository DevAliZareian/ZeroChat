// components/chat/ChatMessage.tsx
import colors from "@/theme/colors";
import { Box, Text, HStack, Avatar, VStack, useColorMode } from "@chakra-ui/react";
import { format } from "date-fns";

type ChatMessageProps = {
  message: string;
  status: "incoming" | "outgoing";
  isFirstInGroup: boolean;
  timestamp?: string;
  senderName?: string;
  senderAvatar?: string;
};

export const ChatMessage = ({ message, status, isFirstInGroup, timestamp, senderName, senderAvatar }: ChatMessageProps) => {
  const { colorMode } = useColorMode();
  const currentColors = colorMode === "light" ? colors.light : colors.dark;
  const isIncoming = status === "incoming";

  const baseRadius = "1.25rem";

  const borderRadiusProps = isIncoming
    ? {
        borderBottomRightRadius: isFirstInGroup ? "0.25rem" : undefined,
        borderTopRightRadius: !isFirstInGroup ? "0.25rem" : undefined,
      }
    : {
        borderBottomLeftRadius: isFirstInGroup ? "0.25rem" : undefined,
        borderTopLeftRadius: !isFirstInGroup ? "0.25rem" : undefined,
      };

  return (
    <HStack alignSelf={isIncoming ? "flex-end" : "flex-start"} alignItems="flex-end" spacing={2} maxW="70%">
      <VStack align={isIncoming ? "flex-end" : "flex-start"} spacing={0}>
        <Box bg={isIncoming ? currentColors.chat.incoming : currentColors.chat.outgoing} px={4} py={2} borderRadius={baseRadius} {...borderRadiusProps}>
          <Text fontSize="sm" color={currentColors.text.primary}>
            {message}
          </Text>
        </Box>
        {isFirstInGroup && timestamp && (
          <Text fontSize="xs" color={currentColors.text.secondary} mt={1} mx={1}>
            {format(new Date(timestamp), "h:mm a")}
          </Text>
        )}
      </VStack>
    </HStack>
  );
};
