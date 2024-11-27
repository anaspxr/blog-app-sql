import { useFormik } from "formik";
import { ClipLoader } from "react-spinners";
import { registerSchema } from "../lib/yupSchemas";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosErrorCatch } from "../api/axiosErrorCatch";
import { registerUser } from "../api/actions/authActions";
import { loginUser as loginUserReducer } from "../lib/store/slices/userSlice";
import { useDispatch } from "react-redux";

const formFields: {
  label: string;
  type: string;
  name: "name" | "email" | "password" | "confirmPassword";
  placeHolder: string;
}[] = [
  {
    label: "Name",
    type: "text",
    name: "name",
    placeHolder: "Enter your name",
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
      name: "",
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
      setTimeout(async () => {
        // time out to simulate a server request
        try {
          const user = await registerUser({
            name: values.name,
            email: values.email,
            password: values.password,
          });
          dispatch(loginUserReducer(user));
          navigate("/"); // after successful registration, user is logged in and redirected to home page
        } catch (error) {
          setApiError(axiosErrorCatch(error));
        } finally {
          setSubmitting(false);
        }
      }, 1000);
    },
  });

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white max-w-lg rounded-md border shadow-sm m-2 p-4 flex justify-center flex-col gap-4">
        <h1 className="text-3xl font-semibold text-blue-600 text-center my-8">
          Sign Up
        </h1>
        {formFields.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label className="font-semibold" htmlFor={field.name}>
              {field.label}
            </label>
            <input
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
          {isSubmitting ? <ClipLoader color="white" size={20} /> : "Register"}{" "}
        </button>
        <p>
          Already have an account?{" "}
          <Link className=" text-blue-700 hover:underline" to="/login">
            {" "}
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
