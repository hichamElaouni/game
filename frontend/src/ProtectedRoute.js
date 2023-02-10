import React from "react";
import { Navigate } from "react-router-dom";
import { hasLoggedIn } from "./Components/service/auth";
import SideBar from "./Components/SideBar/SideBar";

const ProtectedRoute = ({ auth, children }) => hasLoggedIn() ? <SideBar>
  {children}
</SideBar>
  : <Navigate to="/login" />;
export default ProtectedRoute;
