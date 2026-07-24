import { sendFriendRequest } from "@/api/friends.requests";
import { UseToastOptions } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";

interface UseSendFriendRequestOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  toast?: (options: UseToastOptions) => void;
}

export function useSendFriendRequest(options: UseSendFriendRequestOptions = {}) {
  const { toast, onSuccess, onError } = options;

  return useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: (data) => {
      toast?.({
        title: "Friend request sent",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      onSuccess?.();
    },
    onError: (error: Error) => {
      toast?.({
        title: "Failed to send request",
        description: error.message || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      onError?.(error);
    },
  });
}
