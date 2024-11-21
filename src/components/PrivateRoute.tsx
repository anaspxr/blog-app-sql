import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const user = JSON.parse(Cookies.get("user") || "{}");
  return user?.id ? <Outlet /> : <Navigate to="/login" />;
}
