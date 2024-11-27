import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { logoutUser } from "@/lib/store/slices/userSlice";
import Cookies from "js-cookie";

export default function UserProfile() {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  return (
    <div className="flex justify-center">
      <div className="max-w-sm w-full rounded-md border shadow-md p-4">
        <h1 className="text-2xl text-center">Profile</h1>
        <div>
          <p>Name: {user?.name}</p>
          <p>Email: {user?.email}</p>
          <p>Role: {user?.role}</p>
        </div>
        <button
          className="text-white bg-orange-500 hover:bg-opacity-90 p-2 rounded-md w-full mt-4"
          onClick={() => {
            Cookies.remove("user");
            dispatch(logoutUser());
          }}>
          Logout
        </button>
      </div>
    </div>
  );
}
