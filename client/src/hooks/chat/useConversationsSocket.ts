import { WS_ENDPOINTS } from "@/constants/endpoints";
import { useAuthStore } from "@/store/useAuthStore";
import { useCallback, useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

export interface Conversation {
  id: number;
  name: string;
  users: number[];
  created_at: string;
  last_message?: {
    content: string;
    timestamp: string;
    sender: string;
  };
}

interface ResponseMessage {
  conversations?: Conversation[];
  error?: string;
}

export function useConversationsWS() {
  const token = useAuthStore((state) => state.token);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket<ResponseMessage>(WS_ENDPOINTS.CHAT.CONVERSATIONS(token), {
    onOpen: () => fetchConversations(),
    shouldReconnect: () => true,
    onError: (error) => console.error("Conversations WS error:", error),
  });

  useEffect(() => {
    if (lastJsonMessage?.conversations) {
      setConversations(lastJsonMessage.conversations);
    }
  }, [lastJsonMessage]);

  const fetchConversations = useCallback(() => {
    sendJsonMessage({ action: "fetch_conversations" });
  }, [sendJsonMessage]);

  return {
    fetchConversations,
    conversations,
    readyState,
    isConnected: readyState === ReadyState.OPEN,
  };
}
