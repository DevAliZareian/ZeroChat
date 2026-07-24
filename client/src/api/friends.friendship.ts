import { API_ENDPOINTS } from "@/constants/endpoints";
import { axiosInstance } from "@/api/axios";

export const deleteFriendship = async (friendId: string) => {
  await axiosInstance.delete(API_ENDPOINTS.FRIENDS.DELETE_FRIENDSHIP(friendId));
};
