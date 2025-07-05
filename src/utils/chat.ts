import { MessageType } from "@/types/chat";

export const isFirstInGroup = (messages: MessageType[], index: number) => {
  const current = messages[index];
  const prev = messages[index - 1];

  // Always the first message in a group
  if (index === 0) return true;

  // If previous message has a different status, it's a new group
  return current.status !== prev.status;
};
