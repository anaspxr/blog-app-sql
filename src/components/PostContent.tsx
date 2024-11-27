import { useAppSelector } from "@/lib/store/hooks";
import { type Post } from "@/lib/types";
import { useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import EditPost from "./EditPost";
import axiosInstance from "@/api/axios";
import { toast } from "@/hooks/use-toast";
import DeletePostButton from "./DeletePostButton";

export default function PostContent({
  post,
  setLoginAlert = () => {},
}: {
  post: Post;
  setLoginAlert?: (value: boolean) => void;
}) {
  const [liked, setLiked] = useState(false);
  const { user } = useAppSelector((state) => state.user);
  const [isDeleted, setIsDeleted] = useState(false);
  const [postData, setPostData] = useState(post);

  const handleLike = () => {
    if (!user) {
      setLoginAlert(true);
      return;
    }
    setLiked(!liked);
  };

  const handleDelete = () => {
    axiosInstance
      .delete(`/posts/${post.id}`)
      .then(() => {
        toast({
          title: "Deleted the post successfully",
        });
      })
      .catch((error) => {
        toast({
          title: "Error while deleting post",
          description: error.message,
        });
      });

    setIsDeleted(true);
  };

  return (
    <div
      className={`border p-4 bg-white rounded-md flex flex-col justify-between relative ${
        isDeleted && "bg-red-300"
      }`}>
      <div className="absolute right-4 flex gap-2 items-center">
        {user?.role === "author" && post.author.email === user.email && (
          <>
            <EditPost setPostData={setPostData} post={post} />
            <DeletePostButton handleDelete={handleDelete} />
          </>
        )}
        {liked ? (
          <BsHeartFill
            size={20}
            onClick={() => setLiked(false)}
            className={`cursor-pointer text-red-500 flex-shrink-0`}
          />
        ) : (
          <BsHeart
            size={20}
            onClick={handleLike}
            className={`cursor-pointer hover:text-red-500 flex-shrink-0`}
          />
        )}
      </div>
      <div>
        <h2 className="text-xl font-bold mr-16">{postData.title}</h2>
        <p>{postData.body}</p>
      </div>
      <p className="text-sm mt-2" title={postData.author.email}>
        {postData.author.name}
      </p>
    </div>
  );
}
