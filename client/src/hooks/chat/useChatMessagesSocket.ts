// hooks/chat/useChatMessagesSocket.ts
import { useCallback, useEffect, useRef, useState } from "react";
import useWebSocket from "react-use-websocket";
import { WS_ENDPOINTS } from "@/constants/endpoints";
import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";

export interface ChatMessage {
  id: number;
  content: string;
  sender: { id: string; email: string };
  timestamp: string;
}

export function useChatMessages(conversationId: string | undefined) {
  const token = useAuthStore((s) => s.token);
  const { setMessages, addMessage } = useChatStore();
  const [isSending, setIsSending] = useState(false);
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);
  const lastProcessedRef = useRef<ChatMessage | ChatMessage[] | null>(null);

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket<ChatMessage | ChatMessage[]>(conversationId ? WS_ENDPOINTS.CHAT.MESSAGES(conversationId, token) : null, {
    onOpen: () => {
      sendJsonMessage({ action: "fetch_messages" });
    },
    shouldReconnect: () => true,
    onError: (e) => console.error("Chat WS error", e),
  });

  useEffect(() => {
    if (!lastJsonMessage || !conversationId) return;
    if (lastProcessedRef.current === lastJsonMessage) return;
    lastProcessedRef.current = lastJsonMessage;

    if (Array.isArray(lastJsonMessage)) {
      setMessages(conversationId, lastJsonMessage);
    } else {
      addMessage(conversationId, lastJsonMessage);
      if (pendingMessage && lastJsonMessage.content === pendingMessage) {
        setIsSending(false);
        setPendingMessage(null);
      }
    }
  }, [lastJsonMessage, conversationId, setMessages, addMessage, pendingMessage]);

  const sendMessage = useCallback(
    (content: string) => {
      if (!content.trim() || !conversationId) return;
      setPendingMessage(content);
      setIsSending(true);
      sendJsonMessage({ message: content });
    },
    [sendJsonMessage, conversationId],
  );

  return {
    sendMessage,
    isSending,
    isConnected: readyState === WebSocket.OPEN,
  };
}
