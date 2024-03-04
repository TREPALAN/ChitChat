import { Outlet, Navigate } from "react-router-dom";
import isLogedin from "../utils/isLogedin";
const ProtectedRoutes = () => {
  const auth = isLogedin();
  // Login page is the root route
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
