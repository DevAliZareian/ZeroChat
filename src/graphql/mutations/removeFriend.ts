import { gql, useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";

const REMOVE_FRIEND = gql`
  mutation DeleteFriendship($friendshipId: ID) {
    deleteFriendship(friendshipId: $friendshipId) {
      success
      error
    }
  }
`;

interface RemoveFriendResponse {
  deleteFriendship: {
    success: boolean;
    error?: string;
  };
}

interface RemoveFriendVariables {
  friendshipId: string | null;
}

export const useRemoveFriend = () => {
  const toast = useToast();

  const [removeFriend, { data, loading, error }] = useMutation<RemoveFriendResponse, RemoveFriendVariables>(REMOVE_FRIEND, {
    onCompleted: (res) => {
      if (res.deleteFriendship.success) {
        toast({
          title: "Friend Removed",
          description: "The user has been removed from your friends list.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title: "Failed to Remove Friend",
          description: res.deleteFriendship.error || "Something went wrong.",
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

  return { removeFriend, data, loading, error };
};
