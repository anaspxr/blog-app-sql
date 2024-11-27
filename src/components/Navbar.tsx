import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { logoutUser } from "@/lib/store/slices/userSlice";
import Cookies from "js-cookie";

export default function Navbar() {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  return (
    <div className="flex p-2 shadow-md mb-4 justify-between items-center bg-white sticky top-0">
      <Link to="/">
        <h1 className="text-2xl font-bold">POSTS</h1>
      </Link>
      <div className="flex items-center gap-2">
        {user?.role === "admin" && (
          <Link to="/admin" className="text-blue-600 hover:underline">
            Admin Panel
          </Link>
        )}

        {user?.role === "author" && (
          <Link to="/author" className="text-blue-600 hover:underline">
            Create Post
          </Link>
        )}

        {!user ? (
          <Link
            to="/login"
            className="rounded-full border py-2 flex gap-2 justify-between px-4 bg-blue-700 text-white hover:bg-opacity-90">
            Login
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <button className="rounded-full border p-2 flex gap-2 justify-between hover:bg-zinc-100">
                {user.name} <ChevronDown />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link to="/profile" className="block hover:bg-zinc-100">
                <DropdownMenuItem className="focus:cursor-pointer">
                  Profile
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                onClick={() => {
                  Cookies.remove("user");
                  dispatch(logoutUser());
                }}
                className="block hover:bg-zinc-100 w-full text-left focus:cursor-pointer">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
