import { useState } from "react";
import UserThreeDot from "./UserThreeDot";
import UserStatus from "./UserStatus";
import RoleSelector from "./RoleSelector";
import { useAppSelector } from "@/lib/store/hooks";

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
  const [userData, setUserData] = useState(user);
  const { user: admin } = useAppSelector((state) => state.user);

  const [loadingStates, setLoadingStates] = useState({
    role: false,
    status: false,
    delete: false,
  });

  return (
    <tr className="border-b">
      <td className="py-4 px-2 sm:max-w-32">{user.name}</td>
      <td className="py-4 px-2 sm:max-w-40 text-ellipsis whitespace-nowrap overflow-hidden">
        {user.email}
      </td>
      <td className="py-4 px-2">
        <RoleSelector
          loading={loadingStates.role}
          currentRole={userData.role}
          setLoadingRole={(loading) =>
            setLoadingStates((prev) => ({ ...prev, role: loading }))
          }
          userId={user.id}
          setRole={(role: string) => setUserData({ ...userData, role })}
        />
      </td>
      <td className="py-4 flex items-center h-full  justify-between">
        <UserStatus
          status={userData.status || ""}
          setStatus={(status) => {
            setUserData((prev) => ({ ...prev, status }));
          }}
          userId={user.id}
          initialStatus={user.status}
        />
        {admin?.id !== user.id && (
          <UserThreeDot
            loadingStates={loadingStates}
            setLoadingStates={setLoadingStates}
            userId={user.id}
            userData={userData}
            setUserData={setUserData}
          />
        )}
      </td>
    </tr>
  );
}
