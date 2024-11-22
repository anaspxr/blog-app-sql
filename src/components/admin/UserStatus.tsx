import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function UserStatus({
  initialStatus,
}: {
  initialStatus?: string;
}) {
  const [status, setStatus] = useState(initialStatus);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger>
        {status === "blocked" ? (
          <button className="text-sm py-1 px-2 rounded-full border bg-orange-100 text-orange-600 border-orange-200 hover:bg-orange-200">
            Blocked
          </button>
        ) : (
          <button className="text-sm py-1 px-2 rounded-full border bg-green-100 text-green-600 border-green-200 hover:bg-green-200">
            Active
          </button>
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
              onClick={() => setStatus("active")}
              className="bg-green-200 text-green-700 border border-green-300 w-full text-left px-4 py-1 text-sm hover:bg-green-300 rounded-md">
              Unblock
            </button>
          ) : (
            <button
              onClick={() => setStatus("blocked")}
              className="bg-orange-200 text-orange-700 border border-orange-300 w-full text-left px-4 py-1 text-sm hover:bg-orange-300 rounded-md">
              Block
            </button>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
