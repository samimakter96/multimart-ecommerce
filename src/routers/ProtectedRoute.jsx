import React from "react";
import useAuth from "../customHooks/useAuth";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { currentUser } = useAuth();
  console.log(currentUser);

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
