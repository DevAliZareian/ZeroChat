import { API_ENDPOINTS } from "@/constants/endpoints";
import { axiosInstance } from "@/api/axios";

interface CreateConversationVariables {
  users: number[];
  name?: string;
}

export const createConversation = async (variables: CreateConversationVariables) => {
  const { data } = await axiosInstance.post(API_ENDPOINTS.CHAT.CREATE_CONVERSATION, variables);
  return data;
};
