import { useAppSelector } from "@/lib/store/hooks";
import UserProfileButton from "./UserProfileButton";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, admin } = useAppSelector((state) => state.user);

  return (
    <div className="flex p-2 shadow-md mb-4 justify-between items-center bg-white sticky top-0">
      <Link to="/">
        <h1 className="text-2xl font-bold">POSTS</h1>
      </Link>
      <div className="flex items-center gap-2">
        {admin && (
          <Link
            to="/admin"
            className="text-blue-800 bg-blue-100 rounded-sm py-1 px-2 hover:bg-blue-200">
            Admin Panel
          </Link>
        )}
        {user && (
          <Link
            to="/createpost"
            className="text-blue-800 bg-blue-100 rounded-sm py-1 px-2 hover:bg-blue-200">
            Create Post
          </Link>
        )}

        <UserProfileButton />
      </div>
    </div>
  );
}
