import { useFormik } from "formik";
import { ClipLoader } from "react-spinners";
import { registerSchema } from "../lib/yupSchemas";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosErrorCatch } from "../api/axiosErrorCatch";
import { useDispatch } from "react-redux";
import axiosInstance from "@/api/axios";
import Cookies from "js-cookie";
import { loginUserToStore } from "@/lib/store/slices/userSlice";

const formFields: {
  label: string;
  type: string;
  name:
    | "username"
    | "email"
    | "password"
    | "confirmPassword"
    | "firstName"
    | "lastName";
  placeHolder: string;
}[] = [
  {
    label: "First Name",
    type: "text",
    name: "firstName",
    placeHolder: "John",
  },
  {
    label: "Last Name",
    type: "text",
    name: "lastName",
    placeHolder: "Doe",
  },
  {
    label: "Username",
    type: "text",
    name: "username",
    placeHolder: "Your unique username",
  },
  {
    label: "Email",
    type: "email",
    name: "email",
    placeHolder: "example@gmail.com",
  },
  {
    label: "Password",
    type: "password",
    name: "password",
    placeHolder: "Enter your password",
  },
  {
    label: "Confirm Password",
    type: "password",
    name: "confirmPassword",
    placeHolder: "Confirm your password",
  },
];

export default function RegisterForm() {
  const [isSubmitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    values,
    errors,
    handleSubmit,
    touched,
    handleBlur,
    handleChange,
    setErrors,
  } = useFormik({
    initialValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      setApiError(null);
      if (values.password !== values.confirmPassword) {
        setErrors({ confirmPassword: "Passwords do not match" });
        return;
      }
      setSubmitting(true);
      try {
        const { data } = await axiosInstance.post("/user/register", values);
        const token = data.token;
        Cookies.set("token", token);
        dispatch(loginUserToStore(data.user));
        navigate("/");
      } catch (error) {
        setApiError(axiosErrorCatch(error));
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white max-w-screen-lg rounded-md border shadow-sm m-2 p-4 flex justify-center flex-col gap-4">
        <h1 className="text-3xl font-semibold text-blue-600 text-center my-8">
          Sign Up
        </h1>
        <div className="grid sm:grid-cols-2 gap-4">
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
        </div>
        <div className="min-h-2">
          {apiError && <p className="text-sm text-red-500">{apiError}</p>}
        </div>
        <div className="grid sm:grid-cols-2 gap-4 items-center">
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-md h-10 hover:opacity-90 text-lg">
            {isSubmitting ? <ClipLoader color="white" size={20} /> : "Register"}{" "}
          </button>
          <p>
            Already have an account?{" "}
            <Link className=" text-blue-700 hover:underline" to="/login">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
