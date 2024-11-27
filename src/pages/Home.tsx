import axiosInstance from "@/api/axios";
import LoginAlert from "@/components/LoginAlert";
import PostContent from "@/components/PostContent";
import { Post } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [alertOpen, setOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axiosInstance
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
    <div className="p-4">
      <h1 className="text-2xl  mb-4">Top posts by authors</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="my-4 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostContent setLoginAlert={setOpen} key={post.id} post={post} />
        ))}
      </div>
      <LoginAlert alertOpen={alertOpen} setAlertOpen={setOpen} />
    </div>
  );
}
