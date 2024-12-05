import axiosPrivate from "@/api/axiosPrivate";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const reLoginUser = createAsyncThunk(
  "user/reLoginUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.get("user/profile");
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue("Error re-logging in user");
    }
  }
);
