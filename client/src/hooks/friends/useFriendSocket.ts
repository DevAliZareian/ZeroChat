// hooks/useFriendsWS.ts
import { WS_ENDPOINTS } from "@/constants/endpoints";
import { useAuthStore } from "@/store/useAuthStore";
import { User } from "@/types/auth";
import { useCallback } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

interface ResponseMessage {
  friends: User[];
}

export function useFriendsWS() {
  const token = useAuthStore((state) => state.token);

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket<ResponseMessage>(WS_ENDPOINTS.FRIENDS.LIST(token), {
    onOpen: () => fetchFriends(),
    shouldReconnect: () => true,
    onError: (error) => console.error("Friends WS error:", error),
  });

  const fetchFriends = useCallback(() => {
    sendJsonMessage({ action: "fetch_friends" });
  }, [sendJsonMessage]);

  const friends = lastJsonMessage?.friends ?? [];

  return {
    fetchFriends,
    friends,
    readyState,
    isConnected: readyState === ReadyState.OPEN,
  };
}
