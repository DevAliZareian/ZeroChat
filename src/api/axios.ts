import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";

const BASE_URL = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
  //baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
