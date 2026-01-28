import React, { useEffect, useRef, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAddSession } from "@/graphql/mutations/addSession";
import { useAuthStore } from "@/store/useAuthStore";
import AppLoader from "./AppLoader";
import { PATHS } from "@/config/paths";

const AuthGuard: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const location = useLocation();
  const { addSession, loading } = useAddSession();
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  const hasCalled = useRef(false);

  useEffect(() => {
    if (!token || hasCalled.current) return;
    hasCalled.current = true;
    addSession();
  }, [token]);

  if (loading) return <AppLoader />;

  if (user) {
    return <Navigate to={PATHS.login} state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default AuthGuard;
