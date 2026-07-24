// store/useChatStore.ts
import { create } from "zustand";
import { ChatMessage } from "@/hooks/chat/useChatMessagesSocket";

interface ChatStore {
  messages: Record<string, ChatMessage[]>;
  setMessages: (conversationId: string, messages: ChatMessage[]) => void;
  addMessage: (conversationId: string, message: ChatMessage) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: {},
  setMessages: (convId, msgs) =>
    set((state) => ({
      messages: { ...state.messages, [convId]: msgs },
    })),
  addMessage: (convId, message) =>
    set((state) => {
      const currentMessages = state.messages[convId] || [];
      if (currentMessages.some((m) => m.id === message.id)) {
        return state;
      }
      return {
        messages: {
          ...state.messages,
          [convId]: [...currentMessages, message],
        },
      };
    }),
}));
