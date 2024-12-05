import { Admin, User } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  user: User | null;
  admin: Admin | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  admin: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUserToStore: (
      state,
      action: {
        payload: User;
      }
    ) => {
      state.user = action.payload;
    },

    logoutUserFromStore: (state) => {
      state.user = null;
    },

    loginAdminToStore: (
      state,
      action: {
        payload: Admin;
      }
    ) => {
      state.admin = action.payload;
    },

    logoutAdminFromStore: (state) => {
      state.admin = null;
    },
  },
});

export const {
  loginUserToStore,
  logoutUserFromStore,
  loginAdminToStore,
  logoutAdminFromStore,
} = userSlice.actions;
export default userSlice.reducer;
