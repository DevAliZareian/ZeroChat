import { API_ENDPOINTS } from "@/constants/endpoints";
import { axiosInstance } from "./axios";

interface UpdateStatusVariables {
  requestId: number;
  status: "accepted" | "rejected";
}

interface SendFriendRequestVariables {
  receiver: string;
}

export const sendFriendRequest = async ({ receiver }: SendFriendRequestVariables) => {
  const { data } = await axiosInstance.post(API_ENDPOINTS.FRIENDS.SEND_REQUEST, { receiver });
  return data;
};

export const updateFriendRequestStatus = async ({ requestId, status }: UpdateStatusVariables) => {
  const { data } = await axiosInstance.patch(API_ENDPOINTS.FRIENDS.UPDATE_REQUEST(requestId), { status });
  return data;
};
