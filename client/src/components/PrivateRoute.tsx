import { useAppSelector } from "@/lib/store/hooks";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({ isAdminRoute = false }) {
  const { user, admin } = useAppSelector((state) => state.user);

  if (isAdminRoute) {
    // If the route is admin only, render the pages only if role is admin
    return admin ? <Outlet /> : <Navigate to="/adminlogin" />;
  }

  // If the route is private, render the pages only if user is logged in
  return user ? <Outlet /> : <Navigate to="/login" />;
}
