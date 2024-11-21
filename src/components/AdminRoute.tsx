import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {
  const user = JSON.parse(Cookies.get("user") || "{}");
  return user?.role === "admin" ? <Outlet /> : <Navigate to="/login" />;
}
