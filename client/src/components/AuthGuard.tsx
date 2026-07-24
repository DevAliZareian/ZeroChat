import React, { useEffect, useRef, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAddSession } from "@/graphql/mutations/addSession";
import { useAuthStore } from "@/store/useAuthStore";
import AppLoader from "./AppLoader";
import { PATHS } from "@/config/paths";
import { useMe } from "@/hooks/auth/useMe";

const AuthGuard: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const location = useLocation();
  const { isSuccess, isLoading } = useMe();

  const token = useAuthStore((state) => state.token);

  if (isLoading && token) return <AppLoader />;

  if ((!isSuccess && !isLoading) || !token) {
    return <Navigate to={PATHS.login} state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default AuthGuard;
