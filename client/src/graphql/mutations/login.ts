import { gql, useMutation } from "@apollo/client";
import { User } from "@/types/auth";
import { useAuthStore } from "@/store/useAuthStore";

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

interface LoginVariables {
  email: string;
  password: string;
}

interface LoginResponse {
  login: {
    token: string;
    user: User;
  };
}

export const useLogin = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);

  const [loginMutation, { data, loading, error }] = useMutation<LoginResponse, LoginVariables>(LOGIN_MUTATION, {
    onCompleted: (data) => {
      setToken(data.login.token);
      setUser(data.login.user);
    },
  });

  return {
    login: loginMutation,
    data,
    loading,
    error,
  };
};
