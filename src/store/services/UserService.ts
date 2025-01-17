import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import { environment } from "../../utils/environment";
import { UserInput } from "../../interface/input/UserInput";

const version = environment.API.version;

export const getUsers = createAsyncThunk(`api/${version}/users`, 
  async (_,{rejectWithValue}) => {
  try {
    const response = await api.get(
      `resource/User?fields=["name","email","first_name","middle_name","last_name","enabled","user_type","owner"]&filters=[["email","!=","admin@example.com"],["email","!=","guest@example.com"]]`
    );
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getUserInfo = createAsyncThunk(`api/${version}/users/user`,
  async (name: string,{rejectWithValue}) => {
    try {
      const response = await api.get(
        `resource/User/${name}?fields=["name","email","first_name","middle_name","last_name","roles"]`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error)
    }
  }
);

export const updateUser = createAsyncThunk(
  `update/user`,
  async ({ name, payload }: { name: any; payload: UserInput },{rejectWithValue}) => {
    try {
      const response = await api.put(`resource/User/${name}`, payload);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const createUser = createAsyncThunk(
  `create/user`,
  async (payload: UserInput, { rejectWithValue }) => {
    try {
      const response = await api.post("resource/User", payload);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getRoleList = createAsyncThunk(`api/${version}/role-list`, 
  async (_,{rejectWithValue}) => {
  try {
    const response = await api.get(
      `resource/Role`
    );
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const deleteUser = createAsyncThunk(
  `delete/user`,
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`resource/User/${name}`);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);