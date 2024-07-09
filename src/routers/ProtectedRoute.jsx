import React from "react";
import useAuth from "../customHooks/useAuth";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  console.log(currentUser)

  return currentUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
