import { Admin, User } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";
import { reLoginUser } from "../thunks/userThunks";

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
  extraReducers: (builder) => {
    builder.addCase(reLoginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(reLoginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(reLoginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const {
  loginUserToStore,
  logoutUserFromStore,
  loginAdminToStore,
  logoutAdminFromStore,
} = userSlice.actions;
export default userSlice.reducer;
