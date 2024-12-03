import { type Post } from "@/lib/types";
import { useState } from "react";
import EditPost from "../EditPost";

import { axiosAdmin } from "@/api/axiosAdmin";
import { toast } from "@/hooks/use-toast";
import DeletePostButton from "../DeletePostButton";

export default function AdminPostContent({ post }: { post: Post }) {
  const [deleted, setDeleted] = useState(false);
  const [postData, setPostData] = useState(post);

  const handleDelete = () => {
    axiosAdmin
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

    setDeleted(true);
  };

  return (
    <div
      className={`border p-4 bg-white rounded-md flex flex-col justify-between relative ${
        deleted && "bg-red-300"
      }`}>
      <div className="absolute right-4 flex gap-2 items-center">
        <EditPost setPostData={setPostData} post={post} />
        <DeletePostButton handleDelete={handleDelete} />
      </div>
      <div>
        <h2 className="text-xl font-bold mr-12">{postData.title}</h2>
        <p>{postData.body}</p>
      </div>
      <p className="text-sm mt-2" title={postData.author.email}>
        {postData.author.name}
      </p>
    </div>
  );
}
