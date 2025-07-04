import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useGetCurrentUser } from "@/graphql/queries/getCurrentUser";
import { useAuthStore } from "@/store/useAuthStore";
import AppLoader from "./AppLoader";

const AuthGuard: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { fetchMe, loading } = useGetCurrentUser();
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  if (loading) {
    return <AppLoader />;
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default AuthGuard;
