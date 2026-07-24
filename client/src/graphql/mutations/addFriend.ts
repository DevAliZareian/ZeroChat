import { gql, useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";

const ADD_FRIEND = gql`
  mutation AddFriend($addresseeSessionId: ID) {
    addFriend(addresseeSessionId: $addresseeSessionId) {
      success
      error
    }
  }
`;

interface AddFriendResponse {
  addFriend: {
    success: boolean;
    error?: string;
  };
}

interface AddFriendVariables {
  addresseeSessionId: string | null;
}

export const useAddFriend = () => {
  const toast = useToast();

  const [addFriend, { data, loading, error }] = useMutation<AddFriendResponse, AddFriendVariables>(ADD_FRIEND, {
    onCompleted: (res) => {
      if (res.addFriend.success) {
        toast({
          title: "Friend Request Sent",
          description: "Your friend request was sent successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          title: "Failed to Add Friend",
          description: res.addFriend.error || "Something went wrong",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
    },
    onError: (err) => {
      toast({
        title: "Mutation Error",
        description: err.message || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    },
  });

  return { addFriend, data, loading, error };
};
