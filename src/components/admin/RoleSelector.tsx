import { axiosAdmin } from "@/api/axiosAdmin";
import { axiosErrorCatch } from "@/api/axiosErrorCatch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function RoleSelector({
  currentRole,
  userId,
  setRole,
}: {
  currentRole: string;
  userId: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdateRole = async (value: string) => {
    setLoading(true);
    try {
      await axiosAdmin.patch(`/users/${userId}`, { role: currentRole });
      setRole(value);
    } catch (error) {
      setError(axiosErrorCatch(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Select onValueChange={handleUpdateRole} value={currentRole}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select role" className="text-red-500" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Roles</SelectLabel>
          <SelectItem
            className="text-green-700 focus:text-green-700 focus:bg-green-100 cursor-pointer"
            value="admin">
            Admin
          </SelectItem>
          <SelectItem
            className="text-purple-700 focus:text-purple-700 focus:bg-purple-100 cursor-pointer"
            value="author">
            Author
          </SelectItem>
          <SelectItem
            className="text-blue-700 focus:text-blue-700 focus:bg-blue-100 cursor-pointer"
            value="user">
            User
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
