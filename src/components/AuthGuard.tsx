import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useGetCurrentUser } from "@/graphql/queries/getCurrentUser";
import { useAuthStore } from "@/store/useAuthStore";
import AppLoader from "./AppLoader";
import { PATHS } from "@/config/paths";

const AuthGuard: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { fetchMe, loading } = useGetCurrentUser();
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (token) fetchMe();
  }, [fetchMe, token]);

  if (loading) {
    return <AppLoader />;
  }

  if (!user) {
    return <Navigate to={PATHS.login} state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default AuthGuard;
