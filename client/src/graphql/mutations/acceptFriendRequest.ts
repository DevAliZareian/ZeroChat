import { gql, useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";

const ACCEPT_FRIEND = gql`
  mutation AcceptAddFriend($friendshipId: ID) {
    acceptAddFriend(friendshipId: $friendshipId) {
      success
      error
    }
  }
`;

interface AcceptFriendResponse {
  acceptAddFriend: {
    success: boolean;
    error?: string;
  };
}

interface AcceptFriendVariables {
  friendshipId: string | null;
}

export const useAcceptFriendRequest = () => {
  const toast = useToast();

  const [acceptFriend, { data, loading, error }] = useMutation<AcceptFriendResponse, AcceptFriendVariables>(ACCEPT_FRIEND, {
    onCompleted: (res) => {
      if (res.acceptAddFriend.success) {
        toast({
          title: "Friend Request Accepted",
          description: "You are now friends.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title: "Failed to Accept Request",
          description: res.acceptAddFriend.error || "Something went wrong.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    },
    onError: (err) => {
      toast({
        title: "Mutation Error",
        description: err.message || "Something went wrong.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    },
  });

  return { acceptFriend, data, loading, error };
};
