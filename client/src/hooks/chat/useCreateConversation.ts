import { createConversation } from "@/api/chat.conversations";
import { useMutation } from "@tanstack/react-query";

export function useCreateConversation() {
  return useMutation({
    mutationFn: createConversation,
  });
}
