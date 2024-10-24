import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isUserLoggedIn = sessionStorage.getItem("token") !== null;

  return isUserLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
