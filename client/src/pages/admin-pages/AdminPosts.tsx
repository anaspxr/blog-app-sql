import { axiosAdmin } from "@/api/axiosAdmin";
import AdminPostContent from "@/components/admin/AdminPostContent";
import { Post } from "@/lib/types";
import { useEffect, useState } from "react";

export default function AdminPosts() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axiosAdmin
      .get("/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="sm:p-8 p-2">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl py-4">Posts</h1>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="my-4 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <AdminPostContent key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
