import { gql, useMutation } from "@apollo/client";
import { useAuthStore } from "@/store/useAuthStore";
import { useToast } from "@chakra-ui/react";
import { User } from "@/types/auth";

const ADD_SESSION = gql`
  mutation AddSession {
    addSession {
      success
      error
      data {
        id
        username
        email
        created
      }
    }
  }
`;

interface AddSessionResponse {
  addSession: {
    success: boolean;
    error?: string;
    data?: User;
  };
}

export const useAddSession = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);
  const toast = useToast();

  const [addSession, { data, loading, error }] = useMutation<AddSessionResponse>(ADD_SESSION, {
    fetchPolicy: "no-cache",
    onCompleted: (res) => {
      const result = res.addSession;
      if (result?.success && result.data) {
        setUser(result.data);
      } else {
        logout();
        toast({
          title: "Login failed",
          description: result.error || "Something went wrong",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    },
    onError: (error) => {
      logout();
      toast({
        title: "Login failed",
        description: error.message || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    },
  });

  return { addSession, data, loading, error };
};
