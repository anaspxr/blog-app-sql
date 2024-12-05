import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { logoutUserFromStore } from "@/lib/store/slices/userSlice";

export default function UserProfileButton() {
  const { user, loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  if (loading)
    return (
      <div className="rounded-full border flex items-center justify-center bg-gray-300 animate-pulse h-12 w-12">
        <Loader />
      </div>
    );

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button className="rounded-full overflow-hidden border-2 flex gap-2 justify-between hover:bg-zinc-100 h-12 w-12">
          {user.image ? (
            <img
              src={user.image}
              alt="profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <img
              src="/images/profile-placeholder.jpg"
              alt="profile"
              className="h-full w-full object-cover"
            />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-full">
        <Link to="/profile" className="block hover:bg-zinc-100">
          <DropdownMenuItem className="focus:cursor-pointer">
            Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          onClick={() => {
            Cookies.remove("token");
            dispatch(logoutUserFromStore());
          }}
          className="block hover:bg-zinc-100 w-full text-left focus:cursor-pointer">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Link
      to="/login"
      className="rounded-full border py-2 flex gap-2 justify-between px-4 bg-blue-700 text-white hover:bg-opacity-90">
      Login
    </Link>
  );
}
