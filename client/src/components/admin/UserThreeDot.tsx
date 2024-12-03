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
import { axiosAdmin } from "@/api/axiosAdmin";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useState } from "react";

export default function UserThreeDot({
  loadingStates,
  userData,
  userId,
  setUserData,
  setLoadingStates,
}: {
  loadingStates: {
    role: boolean;
    status: boolean;
    delete: boolean;
  };
  userData: {
    id: string;
    name: string;
    email: string;
    role: string;
    status?: string;
    isDeleted?: boolean;
  };
  userId: string;
  setUserData: React.Dispatch<
    React.SetStateAction<{
      id: string;
      name: string;
      email: string;
      role: string;
      status?: string;
      isDeleted?: boolean;
    }>
  >;
  setLoadingStates: React.Dispatch<
    React.SetStateAction<{
      role: boolean;
      status: boolean;
      delete: boolean;
    }>
  >;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleBlockUser = () => {
    axiosAdmin
      .patch(`/users/${userId}`, { status: "blocked" })
      .then(() => {
        setUserData((prev) => ({ ...prev, status: "blocked" }));
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
        setUserData((prev) => ({ ...prev, status: "active" }));
      })
      .catch((error) => {
        toast({
          title: "Error while unblocking user",
          description: error.message,
        });
      });
  };

  const handleDeleteUser = () => {
    axiosAdmin
      .delete(`/users/${userId}`)
      .then(() => {
        toast({
          title: "Deleted the user successfully",
        });
      })
      .catch((error) => {
        toast({
          title: "Error while deleting user",
          description: error.message,
        });
      });
    setUserData((prev) => ({ ...prev, isDeleted: true }));
  };

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
                loading={loadingStates.role}
                setLoadingRole={(loading) =>
                  setLoadingStates((prev) => ({ ...prev, role: loading }))
                }
                currentRole={userData.role}
                userId={userId}
                setRole={(role) => {
                  setUserData((prev) => ({ ...prev, role }));
                }}
              />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        {userData.status === "blocked" ? (
          <DropdownMenuItem className="text-green-700 focus:bg-green-100 focus:text-green-600 cursor-pointer">
            <button onClick={handleUnblockUser}>Unblock User</button>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem className="text-orange-700 focus:bg-orange-100 focus:text-orange-600 cursor-pointer">
            <button onClick={handleBlockUser}>Block user</button>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem className="text-red-700 focus:bg-red-200 focus:text-red-600 cursor-pointer">
          <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <AlertDialogTrigger
              className="w-full h-full text-left"
              onClick={(e) => {
                e.preventDefault();
                setDialogOpen(true);
              }}>
              Delete user
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete this user?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteUser}
                  className="bg-red-500 hover:bg-red-600">
                  Delete user
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
