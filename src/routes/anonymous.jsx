import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AnonymousRouting = () => {
  const { auth } = useAuth();
  const location = useLocation();
  return auth?.userID ? (
    <Navigate to="/" state={{ from: location }} replace></Navigate>
  ) : (
    <Outlet />
  );
};

export default AnonymousRouting;
