import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const auth = localStorage.getItem("token");
  // Login page is the root route
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
