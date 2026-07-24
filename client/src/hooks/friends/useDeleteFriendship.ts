import { deleteFriendship } from "@/api/friends.friendship";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteFriendship() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteFriendship,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });
}
