import { useAppDispatch } from "@/lib/store/hooks";
import { logoutUserFromStore } from "@/lib/store/slices/userSlice";
import { User } from "@/lib/types";
import Cookies from "js-cookie";
import { Button } from "../ui/button";

export default function UserDetails({
  userData,
  isOwnProfile,
}: {
  userData: User;
  isOwnProfile: boolean;
}) {
  const dispatch = useAppDispatch();

  return (
    <div className="flex gap-8 items-center">
      <div className="rounded-full h-40 w-40 border flex items-center flex-shrink-0 justify-center overflow-hidden">
        <img
          src={userData.image || "/images/profile-placeholder.jpg"}
          className="h-full w-full object-cover"
          alt="user profile"
        />
      </div>
      <div className="space-y-4">
        <div className="flex gap-4 items-center">
          <p className="font-semibold text-2xl">{userData.username}</p>
          {isOwnProfile ? (
            <>
              <Button size={"sm"} variant="secondary" className="font-semibold">
                Edit Profile
              </Button>
              <Button
                size={"sm"}
                variant="secondary"
                className="font-semibold"
                onClick={() => {
                  Cookies.remove("token");
                  dispatch(logoutUserFromStore());
                }}>
                Logout
              </Button>
            </>
          ) : (
            <Button size={"sm"} className="font-semibold">
              Follow
            </Button>
          )}
        </div>
        <div className="flex gap-4 items-center">
          <p>
            <span className="font-semibold">0</span> Posts{" "}
          </p>
          <p>
            <span className="font-semibold">0</span> Followers
          </p>
          <p>
            <span className="font-semibold">0</span> Following{" "}
          </p>
        </div>
        <p className="font-semibold ">
          {userData.firstName} {userData.lastName}
        </p>
      </div>
    </div>
  );
}
