import React, { Fragment } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { hasLoggedIn, getUser, hasLoggedOut } from "./Components/service/auth";

import SideBar from "./Components/SideBar/SideBar";

const ProtectedRoute = ({ children }) => {
  const { user } = getUser() || {};

  const location = useLocation();

  const ControlRoles = () => {
    if (hasLoggedIn) {
      if (parseInt(user?.role_id) === 1 || parseInt(user?.role_id) === 2) {
        return <SideBar>{children}</SideBar>;
      } else if (
        parseInt(user?.role_id) === 3 &&
        (children.type.name === "Dashboard" || children.type.name === "profile")
      ) {
        return <>{children}</>;
      } else {
        return <Navigate to="/" />;
      }
    } else return <Navigate to="/login" state={{ from: location }} />;
  };

  return (
    // <SideBar>
    //   {children}
    // </SideBar>
    <ControlRoles />
  );
};

export default ProtectedRoute;
