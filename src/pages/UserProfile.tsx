import axiosInstance from "@/api/axios";
import PostContent from "@/components/PostContent";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { logoutUser } from "@/lib/store/slices/userSlice";
import { Post } from "@/lib/types";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function UserProfile() {
  const { user } = useAppSelector((state) => state.user);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(true);
    setError(null);
    axiosInstance
      .get("/posts")
      .then((res) => {
        setPosts(res.data?.filter((p: Post) => p.author.email === user?.email));
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user?.email]);

  return (
    <div className="flex item-center flex-col gap-4">
      <div className="mx-4 rounded-md border shadow-md p-8 bg-white">
        <h1 className="text-4xl mb-4">Profile</h1>
        <div>
          <p className="sm:text-xl">Name: {user?.name}</p>
          <p className="sm:text-xl">Email: {user?.email}</p>
          <p className="sm:text-xl">Role: {user?.role}</p>
        </div>
        <button
          className="text-white max-w-40 bg-orange-500 hover:bg-opacity-90 p-2 rounded-md w-full mt-4"
          onClick={() => {
            Cookies.remove("user");
            dispatch(logoutUser());
          }}>
          Logout
        </button>
      </div>
      {user?.role === "author" && (
        <div className="mx-4 p-8">
          <h1 className="text-3xl mb-4">Your posts</h1>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {}
          <div className="my-4 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {posts.map((post) => (
              <PostContent key={post.id} post={post} />
            ))}
            {posts.length === 0 && <p>No posts found.</p>}
          </div>
        </div>
      )}
    </div>
  );
}
