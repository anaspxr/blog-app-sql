import { useState } from "react";
import UserThreeDot from "./UserThreeDot";
import UserStatus from "./UserStatus";

export default function UserRow({
  user,
}: {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    status?: string;
  };
}) {
  const [role, setRole] = useState(user.role);

  return (
    <tr className="border-b">
      <td className="py-4 px-2">{user.name}</td>
      <td className="py-4 px-2">{user.email}</td>
      <td className="py-4 px-2">
        <span
          className={` text-sm py-1 px-2 rounded-full border
        ${
          role === "admin"
            ? "bg-yellow-100 text-yellow-600 border-yellow-200"
            : role === "author"
            ? "bg-purple-100 text-purple-600 border-purple-200"
            : "bg-blue-100 text-blue-600 border-blue-200"
        }
        `}>
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </span>
      </td>
      <td className="py-4 flex items-center justify-between">
        <UserStatus initialStatus={user.status} />
        <UserThreeDot userId={user.id} currentRole={role} setRole={setRole} />
      </td>
    </tr>
  );
}
