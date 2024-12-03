import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { createPostSchema } from "../lib/yupSchemas";
import { axiosErrorCatch } from "../api/axiosErrorCatch";
import axiosInstance from "@/api/axios";
import { useAppSelector } from "@/lib/store/hooks";

export default function CreatePost() {
  const { user } = useAppSelector((state) => state.user);
  const [isSubmitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { values, errors, handleSubmit, touched, handleBlur, handleChange } =
    useFormik({
      initialValues: {
        title: "",
        body: "",
      },
      validationSchema: createPostSchema,
      onSubmit: async (values) => {
        setApiError(null);
        setSubmitting(true);
        try {
          await axiosInstance.post("/posts", {
            ...values,
            author: {
              name: user?.name,
              email: user?.email,
            },
          });
          navigate("/");
        } catch (error) {
          setApiError(axiosErrorCatch(error));
        } finally {
          setSubmitting(false);
        }
      },
    });

  return (
    <div className="h-full w-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white max-w-lg rounded-md border shadow-sm m-2 p-4 flex justify-center flex-col gap-4">
        <h1 className="text-3xl font-semibold text-slate-800 text-center my-8">
          Create Post
        </h1>
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="title">
            Title
          </label>
          <input
            className="border rounded-md h-10 p-2 border-zinc-500"
            type="text"
            placeholder="Enter post title"
            name="title"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.title}
            id="title"
            required
          />
          {touched.title && errors.title && (
            <p className="text-sm font-semibold text-red-500">{errors.title}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="body">
            Body
          </label>
          <textarea
            className="border rounded-md p-2 border-zinc-500"
            placeholder="Enter post body"
            name="body"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.body}
            id="body"
            required
          />
          {touched.body && errors.body && (
            <p className="text-sm font-semibold text-red-500">{errors.body}</p>
          )}
        </div>
        {apiError && <p className="text-sm text-red-500">{apiError}</p>}
        <button
          type="submit"
          className="bg-slate-800 text-white rounded-md h-10 hover:opacity-90 text-lg">
          {isSubmitting ? (
            <ClipLoader color="white" size={20} />
          ) : (
            "Create Post"
          )}
        </button>
      </form>
    </div>
  );
}
