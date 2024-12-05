import axiosInstance from "@/api/axios";
import { axiosErrorCatch } from "@/api/axiosErrorCatch";
import UserDetails from "@/components/user-profile/UserDetails";
import UserPosts from "@/components/user-profile/UserPosts";
import { useAppSelector } from "@/lib/store/hooks";
import { User } from "@/lib/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function UserProfile() {
  const { user: currentUser } = useAppSelector((state) => state.user);

  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { username } = useParams();

  const isOwnProfile = currentUser?.username === username;

  useEffect(() => {
    setLoading(true);
    setError(null);
    axiosInstance
      .get(`public/userprofile/${username}`)
      .then((res) => {
        setUserData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setUserData(null);
        setError(axiosErrorCatch(err));
        setLoading(false);
      });
  }, [username]);

  if (!username) return <p>Username not found</p>;

  return (
    <div className="flex item-center flex-col gap-4">
      <div className="mx-4 rounded-md border shadow-md p-8 bg-white">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {userData && (
          <UserDetails userData={userData} isOwnProfile={isOwnProfile} />
        )}
      </div>
      <UserPosts username={username} />
    </div>
  );
}
