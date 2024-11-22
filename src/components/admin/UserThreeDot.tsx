import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import RoleSelector from "./RoleSelector";

export default function UserThreeDot({
  currentRole,
  userId,
  setRole,
}: {
  currentRole: string;
  userId: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:bg-gray-100 p-2 rounded-md">
        <BsThreeDotsVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Role</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <RoleSelector
                currentRole={currentRole}
                userId={userId}
                setRole={setRole}
              />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem className="text-orange-700 focus:bg-orange-100 focus:text-orange-600 cursor-pointer">
          Block user
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-700 focus:bg-red-200 focus:text-red-600 cursor-pointer">
          Delete user
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
