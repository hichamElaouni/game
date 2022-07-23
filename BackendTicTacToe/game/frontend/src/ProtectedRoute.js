import React from "react";
import { Navigate } from "react-router-dom";
import { hasLoggedIn } from "./service/auth";

const ProtectedRoute = ({ auth, children }) => {
  return hasLoggedIn() ? children : <Navigate to="/login" />;
};
export default ProtectedRoute;
