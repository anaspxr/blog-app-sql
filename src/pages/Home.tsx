import { useAppSelector } from "@/lib/store/hooks";
import { logoutUser } from "@/lib/store/slices/userSlice";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Home() {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-center flex-col gap-4">
      <h1 className="text-blue-500 text-4xl font-semibold">RBAC</h1>
      {user ? (
        <>
          <p>Welcome to the Home page, {user?.name} </p>
          <p>Your role is {user?.role}</p>
          <button
            onClick={() => {
              Cookies.remove("user");
              dispatch(logoutUser());
            }}>
            Logout
          </button>
        </>
      ) : (
        <>
          <p>You are not logged in</p>
          <Link to="/login">Login</Link>
        </>
      )}
    </div>
  );
}
