import axiosInstance from "../axios";
import Cookies from "js-cookie";

export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  // to find if user already exists
  const { data: users } = await axiosInstance.get("/users");
  const userExists = users.find(
    (user: { email: string }) => user.email === userData.email
  );

  if (userExists) {
    throw new Error("Email already registered. Please login.");
  }

  // register the user
  const newUser = { ...userData, role: "user", status: "active" };
  const { data: user } = await axiosInstance.post("/users", newUser);
  console.log(user);
  Cookies.set("user", JSON.stringify(user));
  return user;
};

export const loginUser = async (userData: {
  email: string;
  password: string;
}) => {
  const { data: users } = await axiosInstance.get("/users");
  const user = users.find(
    (user: { email: string; password: string }) => user.email === userData.email
  );

  if (!user) {
    throw new Error("User not found.");
  }

  if (!(user.password === userData.password)) {
    throw new Error("Incorrect password.");
  }
  Cookies.set("user", JSON.stringify(user));

  return user;
};

export const reLoginUser = async (id: string) => {
  const { data: user } = await axiosInstance.get(`/users/${id}`);
  if (!user) {
    throw new Error("User not found.");
  }
  return user;
};
