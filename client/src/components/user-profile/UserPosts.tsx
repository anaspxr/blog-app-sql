import { Post } from "@/lib/types";
import { useState } from "react";
import PostContent from "../PostContent";

export default function UserPosts({ username }: { username: string }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="mx-4 p-8">
      <h1 className="text-3xl mb-4">Posts</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="my-4 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostContent key={post.id} post={post} />
        ))}
        {posts.length === 0 && <p>No posts found.</p>}
      </div>
    </div>
  );
}
