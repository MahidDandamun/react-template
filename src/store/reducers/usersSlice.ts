import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createUser, deleteUser, getRoleList, getUserInfo, getUsers, updateUser } from "../services/UserService";
import { UserListState } from "../../interface/output/Users/UserState";


const initialState: UserListState = {
  users: [],
  isLoading: true,
  error: null,
  user_info: null,
  userInitialRoles: [],
  roleList: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getUsers.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.users = action.payload;
        }
      )
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch users";
      });
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.user_info = action.payload;
        state.userInitialRoles = action.payload.roles;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch user info";
      });
    builder
      .addCase(getRoleList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRoleList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.roleList = action.payload;
      })
      .addCase(getRoleList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch roles";
      });
    builder
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to delete user";
      });
    builder
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user_info = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to delete user";
      });
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to create user";
      });
  },
});

export default usersSlice.reducer;
