import React from "react";
import { Navigate } from "react-router-dom";
import Layout from "../pages/Layout";
import { useAppSelector } from "../hooks";

const PrivateRoute: React.FC = () => {
  const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn);

  return isLoggedIn ? <Layout /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
