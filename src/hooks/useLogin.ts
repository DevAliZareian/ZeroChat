import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";
import { login } from "@/api/auth.api";

export const useLogin = () => {
  const setToken = useAuthStore((s) => s.setToken);

  return useMutation({
    mutationFn: login,
    onSuccess: ({ access_token }) => {
      setToken(access_token);
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};
