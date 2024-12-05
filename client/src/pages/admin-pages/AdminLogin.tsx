import { useFormik } from "formik";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/lib/store/hooks";
import axiosInstance from "@/api/axios";
import Cookies from "js-cookie";
import { loginAdminToStore } from "@/lib/store/slices/userSlice";
import { axiosErrorCatch } from "@/api/axiosErrorCatch";
import { loginSchema } from "@/lib/yupSchemas";

const formFields: {
  label: string;
  type: string;
  name: "email" | "password";
  placeHolder: string;
}[] = [
  {
    label: "Email",
    type: "email",
    name: "email",
    placeHolder: "Enter your email",
  },
  {
    label: "Password",
    type: "password",
    name: "password",
    placeHolder: "Enter your password",
  },
];

export default function AdminLogin() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { values, errors, handleSubmit, touched, handleBlur, handleChange } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: async (values) => {
        setApiError(null);
        setSubmitting(true);
        try {
          const { data } = await axiosInstance.post("/admin/login", values);
          Cookies.set("adminToken", data.token);
          dispatch(loginAdminToStore(data.admin));
          navigate("/admin");
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
        <h1 className="text-3xl font-semibold text-blue-600 text-center my-8">
          Admin Login
        </h1>
        {formFields.map((field, i) => (
          <div key={field.name} className="flex flex-col">
            <label className="font-semibold" htmlFor={field.name}>
              {field.label}
            </label>
            <input
              autoFocus={i === 0}
              className="border rounded-md h-10 p-2 border-zinc-500"
              type={field.type}
              placeholder={field.placeHolder}
              name={field.name}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values[field.name]}
              id={field.name}
              required
            />
            {touched[field.name] && errors[field.name] && (
              <p className="text-sm font-semibold text-red-500">
                {errors[field.name]}
              </p>
            )}
          </div>
        ))}
        {apiError && <p className="text-sm text-red-500">{apiError}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-md h-10 hover:opacity-90 text-lg">
          {isSubmitting ? <ClipLoader color="white" size={20} /> : "Login"}{" "}
        </button>
      </form>
    </div>
  );
}
