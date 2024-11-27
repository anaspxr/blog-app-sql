import { axiosAdmin } from "@/api/axiosAdmin";
import { axiosErrorCatch } from "@/api/axiosErrorCatch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useAppSelector } from "@/lib/store/hooks";
import { Loader } from "lucide-react";

export default function RoleSelector({
  loading,
  currentRole,
  userId,
  setRole,
  setLoadingRole,
}: {
  loading: boolean;
  currentRole: string;
  userId: string;
  setRole: (role: string) => void;
  setLoadingRole: (loading: boolean) => void;
}) {
  const { user: admin } = useAppSelector((state) => state.user);

  const handleUpdateRole = async (value: string) => {
    setLoadingRole(true);
    try {
      await axiosAdmin.patch(`/users/${userId}`, { role: value });
      setRole(value);
    } catch (error) {
      toast({
        title: "Error while updating role",
        description: axiosErrorCatch(error),
      });
    } finally {
      setLoadingRole(false);
    }
  };

  return (
    <Select onValueChange={handleUpdateRole} value={currentRole}>
      <SelectTrigger
        disabled={admin?.id === userId}
        className={`
          w-[150px]
          ${
            !loading
              ? `text-sm  h-full rounded-md
            ${
              currentRole === "admin"
                ? "bg-yellow-100 text-yellow-600 border-yellow-200"
                : currentRole === "author"
                ? "bg-purple-100 text-purple-600 border-purple-200"
                : "bg-blue-100 text-blue-600 border-blue-200"
            }
              `
              : ""
          }
          ${admin?.id === userId ? "cursor-not-allowed" : "cursor-pointer"}
              `}>
        <span>
          {loading ? (
            <Loader />
          ) : (
            currentRole.charAt(0).toUpperCase() + currentRole.slice(1)
          )}
        </span>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Roles</SelectLabel>
          <SelectItem
            className="text-yellow-700 focus:text-yellow-700 focus:bg-yellow-100 cursor-pointer"
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
