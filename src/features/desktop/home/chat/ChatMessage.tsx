import colors from "@/theme/colors";
import { Box, Text, useColorMode } from "@chakra-ui/react";

type ChatMessageProps = {
  message: string;
  status: "incoming" | "outgoing";
  isFirstInGroup: boolean;
};

export const ChatMessage = ({ message, status, isFirstInGroup }: ChatMessageProps) => {
  const { colorMode } = useColorMode();
  const currentColors = colorMode === "light" ? colors.light : colors.dark;

  const isIncoming = status === "incoming";

  const baseRadius = "1.25rem";

  const borderRadiusProps = isIncoming
    ? {
        borderBottomLeftRadius: isFirstInGroup ? "0.25rem" : undefined,
        borderLeftRadius: !isFirstInGroup ? "0.25rem" : undefined,
      }
    : {
        borderBottomRightRadius: isFirstInGroup ? "0.25rem" : undefined,
        borderRightRadius: !isFirstInGroup ? "0.25rem" : undefined,
      };

  return (
    <Box
      alignSelf={isIncoming ? "flex-start" : "flex-end"}
      bg={isIncoming ? currentColors.chat.incoming : currentColors.chat.outgoing}
      px={4}
      py={2}
      maxW="45%"
      borderRadius={baseRadius}
      {...borderRadiusProps}
    >
      <Text fontSize="sm" color={currentColors.text.primary}>
        {message}
      </Text>
    </Box>
  );
};
