import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ element, redirectPath = "/", isAuthenticated }) => {
  return isAuthenticated ? <Navigate to={redirectPath} /> : element;
};

export default PublicRoute;
