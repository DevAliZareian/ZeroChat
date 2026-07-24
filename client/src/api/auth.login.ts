import { axiosInstance } from "./axios";
import { API_ENDPOINTS } from "@/constants/endpoints";

interface LoginInput {
  email: string;
  password: string;
}

interface LoginResponse {
  access: string;
  refresh: string;
}

export const login = async (data: LoginInput): Promise<LoginResponse> => {
  const body = {
    email: data.email,
    password: data.password,
  };

  const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, body);

  return response.data;
};
