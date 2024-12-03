import axios from "axios";
import Cookies from "js-cookie";
import axiosInstance from "./axios";

const baseURL = "http://localhost:3000";

export const axiosAdmin = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosAdmin.interceptors.request.use(
  async (config) => {
    const user = JSON.parse(Cookies.get("user") || "{}");

    if (user?.id) {
      try {
        const { data } = await axiosInstance.get(`/users/${user.id}`);
        if (!data) {
          // if user is not found, throw an error
          throw new Error("User not found.");
        }

        if (data.role !== "admin") {
          // if user is not an admin, throw an error
          throw new Error("Unauthorized");
        }
      } catch (error) {
        console.error("Authorization failed:", error);
        throw error;
      }
    } else {
      console.warn("User ID is not found in cookies.");
      throw new Error("Unauthorized");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
