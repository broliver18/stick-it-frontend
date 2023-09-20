import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

import { AccountContext } from "../Contexts/AccountContext";

function useAuth() {
  const { user } = useContext(AccountContext);
  return user && user.loggedIn;
}

function PrivateRoutes() {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoutes;