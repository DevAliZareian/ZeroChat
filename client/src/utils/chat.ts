// utils/chat.ts
import { ChatMessage as ChatMessageType } from "@/hooks/chat/useChatMessagesSocket";

export const isFirstInGroup = (messages: ChatMessageType[], index: number): boolean => {
  if (index === 0) return true;
  const current = messages[index];
  const previous = messages[index - 1];
  if (!current || !previous) return true;

  // Different sender
  if (current.sender.id !== previous.sender.id) return true;

  // Time gap > 5 minutes
  const currentTime = new Date(current.timestamp).getTime();
  const previousTime = new Date(previous.timestamp).getTime();
  return currentTime - previousTime > 5 * 60 * 1000;
};
