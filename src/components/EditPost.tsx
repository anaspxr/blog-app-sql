import axiosInstance from "@/api/axios";
import { axiosErrorCatch } from "@/api/axiosErrorCatch";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { Post } from "@/lib/types";

export default function EditPost({ post }: { post: Post }) {
  const [isSubmitting, setSubmitting] = useState(false);
  const [values, setValues] = useState({ title: post.title, body: post.body });

  const handleSave = async () => {
    setSubmitting(true);
    try {
      await axiosInstance.patch(`/posts/${post.id}`, values);
    } catch (error) {
      console.error(axiosErrorCatch(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>
          <Edit />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
          <DialogDescription>
            Make changes to your post. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">
              Name
            </label>
            <input
              required
              id="name"
              value={values.title}
              onChange={(e) => setValues({ ...values, title: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="username" className="text-right">
              body
            </label>
            <input
              required
              onChange={(e) => setValues({ ...values, body: e.target.value })}
              id="username"
              value={values.body}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <button onClick={handleSave} type="submit">
            {isSubmitting ? "Saving changes" : "Save Changes"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
