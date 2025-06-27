import { axiosInstance } from "./axios";

export const login = (email: string, password: string) => axiosInstance.post("/auth/login", { email, password });

export const register = (data: { name: string; email: string; password: string }) => axiosInstance.post("/auth/register", data);

export const getProfile = () => axiosInstance.get("/auth/profile");
