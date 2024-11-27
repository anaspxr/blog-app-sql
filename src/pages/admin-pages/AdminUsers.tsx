import { useEffect, useState } from "react";
import { axiosAdmin } from "../../api/axiosAdmin";
import UserRow from "@/components/admin/UserRow";
import UserSearch from "@/components/admin/UserSearch";
import UserFilter from "@/components/admin/UserFilter";
import { useSearchParams } from "react-router-dom";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status?: string;
};

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axiosAdmin
      .get("/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (searchParams.size === 0) {
      setFilteredUsers(users);
    } else {
      const roles: string[] = [];
      if (searchParams.get("admins") === "true") roles.push("admin");
      if (searchParams.get("authors") === "true") roles.push("author");
      if (searchParams.get("users") === "true") roles.push("user");

      const statuses: string[] = [];
      if (searchParams.get("unblocked") === "true") statuses.push("active");
      if (searchParams.get("blocked") === "true") statuses.push("blocked");

      let filtered: User[] = [];

      if (roles.length === 0 && statuses.length === 0) {
        filtered = users;
      } else {
        filtered = users.filter(
          (user) =>
            roles.includes(user.role) && statuses.includes(user.status || "")
        );
      }

      const search = searchParams.get("search")?.toLowerCase();
      if (search) {
        const searchResults = filtered.filter((user) => {
          return (
            user.name.toLowerCase().includes(search) ||
            user.email.toLowerCase().includes(search)
          );
        });
        setFilteredUsers(searchResults);
      } else {
        setFilteredUsers(filtered);
      }
    }
  }, [searchParams, users]);

  return (
    <div className="sm:p-8 p-2">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl py-4">Users</h1>
        <div className="flex flex-wrap gap-4">
          <UserSearch />
          <UserFilter />
        </div>
      </div>

      <div className="bg-white rounded-md px-4 overflow-auto">
        <table className="w-full my-8 text-left">
          <thead className="border-b-2">
            <tr>
              <th className="text-gray-500 text-sm font-normal py-4 px-2">
                Name
              </th>
              <th className="text-gray-500 text-sm font-normal py-4 px-2">
                Email
              </th>
              <th className="text-gray-500 text-sm font-normal py-4 px-2 hidden sm:table-cell">
                Role
              </th>
              <th className="text-gray-500 text-sm font-normal py-4 px-2 hidden sm:table-cell">
                Status
              </th>
            </tr>
          </thead>

          <tbody className=" text-sm sm:text-base">
            {loading && (
              <tr>
                <td colSpan={3} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            )}

            {error && (
              <tr>
                <td colSpan={3} className="text-center py-4 text-red-500">
                  {error}
                </td>
              </tr>
            )}

            {filteredUsers.map((user) => (
              <UserRow key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
