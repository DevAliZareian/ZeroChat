import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";
import { User } from "@/types/auth";
import { me } from "@/api/auth.me";
import { useToast } from "@chakra-ui/react";

export const useMe = () => {
  const token = useAuthStore((state) => state.token);
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);
  const toast = useToast();

  return useQuery<User, Error>({
    queryKey: ["user"],
    queryFn: me,
    enabled: !!token,
    onSuccess: (data: User) => setUser(data),
    onError: (error?: Error) => {
      logout();
      toast({
        title: "Login failed",
        description: error?.message || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    },
  });
};
