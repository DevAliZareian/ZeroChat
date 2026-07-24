import { API_ENDPOINTS } from "@/constants/endpoints";
import { axiosInstance } from "./axios";
import { User } from "@/types/auth";

export const me = async (): Promise<User> => {
  const response = await axiosInstance.get(API_ENDPOINTS.AUTH.ME);
  return response.data;
};
