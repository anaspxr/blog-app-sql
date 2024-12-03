import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAppSelector } from "@/lib/store/hooks";
import { axiosAdmin } from "@/api/axiosAdmin";
import { toast } from "@/hooks/use-toast";

export default function UserStatus({
  userId,
  status,
  setStatus,
}: {
  userId: string;
  status: string;
  setStatus: (status: string) => void;
  initialStatus?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { user: admin } = useAppSelector((state) => state.user);

  const handleBlockUser = () => {
    axiosAdmin
      .patch(`/users/${userId}`, { status: "blocked" })
      .then(() => {
        setStatus("blocked");
        setIsOpen(false);
      })
      .catch((error) => {
        toast({
          title: "Error while blocking user",
          description: error.message,
        });
      });
  };

  const handleUnblockUser = () => {
    axiosAdmin
      .patch(`/users/${userId}`, { status: "active" })
      .then(() => {
        setStatus("active");
        setIsOpen(false);
      })
      .catch((error) => {
        toast({
          title: "Error while unblocking user",
          description: error.message,
        });
      });
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger disabled={admin?.id === userId}>
        {status === "blocked" ? (
          <span className="text-sm py-1 px-2 rounded-full border bg-orange-100 text-orange-600 border-orange-200 hover:bg-orange-200">
            Blocked
          </span>
        ) : (
          <span
            className={`text-sm py-1 px-2 rounded-full border bg-green-100 text-green-600 border-green-200 hover:bg-green-200 ${
              admin?.id === userId
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            } `}>
            Active
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-4">
        <p>{status === "blocked" ? "Unblock" : "Block"} the user?</p>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => setIsOpen(false)}
            className="block w-full text-left px-2 py-1 text-sm hover:bg-gray-100 rounded-md">
            cancel
          </button>
          {status === "blocked" ? (
            <button
              onClick={handleUnblockUser}
              className="bg-green-200 text-green-700 border border-green-300 w-full text-left px-4 py-1 text-sm hover:bg-green-300 rounded-md">
              Unblock
            </button>
          ) : (
            <button
              onClick={handleBlockUser}
              className="bg-orange-200 text-orange-700 border border-orange-300 w-full text-left px-4 py-1 text-sm hover:bg-orange-300 rounded-md">
              Block
            </button>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
