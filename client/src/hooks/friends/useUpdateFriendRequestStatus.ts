import { useMutation } from "@tanstack/react-query";
import { updateFriendRequestStatus } from "@/api/friends.requests";
import { UseToastOptions } from "@chakra-ui/react";

interface UseUpdateFriendRequestStatusOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  toast?: (options: UseToastOptions) => void;
}

export function useUpdateFriendRequestStatus(options: UseUpdateFriendRequestStatusOptions = {}) {
  const { toast, onSuccess, onError } = options;

  return useMutation({
    mutationFn: updateFriendRequestStatus,
    onSuccess: (data, variables) => {
      const isAccept = variables.status === "accepted";
      toast?.({
        title: isAccept ? "Friend request accepted" : "Friend request declined",
        status: isAccept ? "success" : "info",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      onSuccess?.(data);
    },
    onError: (error: Error, variables) => {
      const isAccept = variables.status === "accepted";
      toast?.({
        title: isAccept ? "Failed to accept request" : "Failed to decline request",
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
