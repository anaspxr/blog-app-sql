import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { MdSpaceDashboard } from "react-icons/md";
import { HiUsers } from "react-icons/hi2";
import { IoDocuments } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";

const navLinks = [
  { to: "dashboard", label: "Dashboard", icon: <MdSpaceDashboard /> },
  { to: "users", label: "Users", icon: <HiUsers /> },
  { to: "posts", label: "Posts", icon: <IoDocuments /> },
];

export default function AdminContainer() {
  const user = JSON.parse(Cookies.get("user") || "{}");
  const activeTab = useLocation().pathname.split("/")[2];
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      <div className="flex flex-col items-center justify-between gap-2 bg-white h-screen w-[250px]">
        <div className="w-full space-y-4">
          <div className="flex items-center gap-4 w-full p-4">
            <img
              src="https://randomuser.me/api/portraits/men/31.jpg"
              alt="avatar"
              className="w-12 h-12 rounded-full"
            />
            <h1>{user.name}</h1>
          </div>
          <nav className="flex flex-col w-full px-4 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                className={`p-2 rounded-md w-full h-full text-center flex gap-2 items-center ${
                  activeTab === link.to
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-200 "
                }`}
                to={`/admin/${link.to}`}>
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="p-4 w-full">
          <button
            className="p-2 flex items-center gap-2 border shadow-sm hover:bg-gray-200 w-full rounded-md"
            onClick={() => {
              Cookies.remove("user");
              navigate("/");
            }}>
            <IoLogOut /> Logout
          </button>
        </div>
      </div>
      <div className="w-full  overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
