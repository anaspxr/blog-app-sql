import { useAppSelector } from "@/lib/store/hooks";
import { type Post } from "@/lib/types";
import { useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import EditPost from "./EditPost";

export default function PostContent({
  post,
  setLoginAlert = () => {},
}: {
  post: Post;
  setLoginAlert?: (value: boolean) => void;
}) {
  const [liked, setLiked] = useState(false);
  const { user } = useAppSelector((state) => state.user);

  const handleLike = () => {
    if (!user) {
      setLoginAlert(true);
      return;
    }
    setLiked(!liked);
  };

  return (
    <div className="border p-4 bg-white rounded-md flex flex-col justify-between relative">
      <div className="absolute right-4 flex gap-2 items-center">
        {user?.role === "author" && post.author.email === user.email && (
          <EditPost post={post} />
        )}
        {liked ? (
          <BsHeartFill
            size={20}
            onClick={() => setLiked(false)}
            className={`cursor-pointer text-red-500`}
          />
        ) : (
          <BsHeart
            size={20}
            onClick={handleLike}
            className={`cursor-pointer hover:text-red-500`}
          />
        )}
      </div>
      <div>
        <h2 className="text-xl font-bold mr-12">{post.title}</h2>
        <p>{post.body}</p>
      </div>
      <p className="text-sm mt-2" title={post.author.email}>
        {post.author.name}
      </p>
    </div>
  );
}
