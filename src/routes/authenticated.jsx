import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AuthenticatedRouting = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.userID ? (
    <Outlet />
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace></Navigate>
  );
};

export default AuthenticatedRouting;
