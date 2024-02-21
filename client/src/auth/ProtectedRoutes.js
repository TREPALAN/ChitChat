import { Outlet, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const ProtectedRoutes = () => {
  const auth = cookies.get("token");
  // Login page is the root route
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
