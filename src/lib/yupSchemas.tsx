import { string, object } from "yup";

const registerSchema = object().shape({
  email: string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
  name: string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
});

const loginSchema = object().shape({
  email: string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: string()
    .min(4, "password must be at least 4 characters")
    .required("Password is required"),
});

export { registerSchema, loginSchema };
