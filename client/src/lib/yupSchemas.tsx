import { string, object } from "yup";

const registerSchema = object().shape({
  email: string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
  username: string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  firstName: string()
    .min(1, "First name is required")
    .required("First name is required"),
  lastName: string()
    .min(1, "Last name is required")
    .required("Last name is required"),
});

const loginSchema = object().shape({
  email: string().required("Enter your email or username"),
  password: string()
    .min(4, "password must be at least 4 characters")
    .required("Password is required"),
});

const createPostSchema = object().shape({
  title: string().required("Title is required"),
  body: string().required("Body is required"),
});

export { registerSchema, loginSchema, createPostSchema };
