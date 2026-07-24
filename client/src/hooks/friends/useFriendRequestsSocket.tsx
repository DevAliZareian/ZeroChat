// hooks/useFriendRequestsWS.ts
import { WS_ENDPOINTS } from "@/constants/endpoints";
import { useAuthStore } from "@/store/useAuthStore";
import { useCallback, useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useToast } from "@chakra-ui/react";

export interface FriendRequest {
  id: number;
  sender: string;
  receiver: string;
  status: "pending" | "accepted" | "rejected";
  created_at: string;
}

interface ResponseMessage {
  friend_requests?: FriendRequest[];
  friend_request?: FriendRequest;
  error?: string;
}

const toastedRequestIds = new Set<number>();

export function useFriendRequestsWS() {
  const token = useAuthStore((state) => state.token);
  const currentUser = useAuthStore((state) => state.user);
  const toast = useToast();
  const [requests, setRequests] = useState<FriendRequest[]>([]);

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket<ResponseMessage>(WS_ENDPOINTS.FRIENDS.REQUESTS(token), {
    onOpen: () => fetchFriendRequests(),
    shouldReconnect: () => true,
    onError: (error) => console.error("FriendRequests WS error:", error),
  });

  useEffect(() => {
    if (!lastJsonMessage) return;

    if (lastJsonMessage.friend_requests) {
      const list = lastJsonMessage.friend_requests;
      setRequests(list);
    } else if (lastJsonMessage.friend_request) {
      const updated = lastJsonMessage.friend_request;
      setRequests((prev) => {
        const index = prev.findIndex((r) => r.id === updated.id);
        if (index >= 0) {
          const newList = [...prev];
          newList[index] = updated;
          return newList;
        } else {
          return [...prev, updated];
        }
      });

      if (updated.status === "pending" && updated.receiver === currentUser?.email && !toastedRequestIds.has(updated.id)) {
        toastedRequestIds.add(updated.id);
        toast({
          title: "New Friend Request",
          description: `${updated.sender} wants to be your friend`,
          status: "info",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
    }
  }, [lastJsonMessage, currentUser?.email, toast]);

  const fetchFriendRequests = useCallback(() => {
    sendJsonMessage({ action: "fetch_friend_requests" });
  }, [sendJsonMessage]);

  return {
    fetchFriendRequests,
    friendRequests: requests,
    readyState,
    isConnected: readyState === ReadyState.OPEN,
  };
}
