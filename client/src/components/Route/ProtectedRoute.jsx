import React, { Children } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children, isAdmin }) => {
  const { isAuthenticated, isLoading, user } = useSelector(
    (state) => state.user
  );

  if (isLoading === false) {
    if (isAuthenticated === false) {
      return <Navigate to="/login" />;
    }

    if (isAdmin == true && user.role !== "admin") {
      return <Navigate to="/login" />;
    }

    return children ? children : <Outlet />;
  }

  // return isAuthenticated === true ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
