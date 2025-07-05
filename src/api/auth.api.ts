import { axiosInstance } from "./axios";
import { API_ENDPOINTS } from "@/constants/endpoints";

interface LoginInput {
  username: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  id_token: string;
  "not-before-policy": number;
  session_state: string;
  scope: string;
}
export const login = async (data: LoginInput): Promise<LoginResponse> => {
  const params = new URLSearchParams();
  params.append("grant_type", "password");
  params.append("scope", "email openid");
  params.append("client_id", "zerochat-public-client");
  params.append("username", data.username);
  params.append("password", data.password);

  const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data;
};
