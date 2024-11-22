import { useEffect, useState } from "react";
import { axiosAdmin } from "../../api/axiosAdmin";
import UserRow from "@/components/admin/UserRow";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
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

  console.log(users);

  return (
    <div className="sm:p-8 p-2">
      <h1 className="text-2xl">Users</h1>

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
              <th className="text-gray-500 text-sm font-normal py-4 px-2">
                Role
              </th>
              <th className="text-gray-500 text-sm font-normal py-4 px-2">
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

            {users.map((user) => (
              <UserRow key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
