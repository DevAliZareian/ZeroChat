import { gql, useLazyQuery } from "@apollo/client";
import { User } from "@/types/auth";
import { useAuthStore } from "@/store/useAuthStore";

const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    me {
      id
      name
      email
    }
  }
`;

interface MeResponse {
  me: User;
}

export const useGetCurrentUser = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);

  const [fetchMe, { data, loading, error }] = useLazyQuery<MeResponse>(GET_CURRENT_USER, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      if (data?.me) {
        setUser(data.me);
      } else {
        logout();
      }
    },
    onError: () => {
      logout();
    },
  });

  return { fetchMe, data, loading, error };
};
