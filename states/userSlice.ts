import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  User,
  UserState,
  ThunkApiConfig,
  UserFieldUpdatePayload,
} from "@/types";
import uuid from "react-native-uuid";

import * as api from "@/api";

const initialState: UserState = {
  users: {},
  fetchStatus: "idle",
  updateStatus: "idle",
  deleteStatus: "idle",
  error: null,
  updateError: null,
  deleteError: null,
};

export const fetchAllUsers = createAsyncThunk<User[], void, ThunkApiConfig>(
  "users/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const users: Array<{
        id: string;
        name: string;
        email: string;
        phone: string;
        company: {
          name: string;
          bs: string;
        };
        username: string;
        website: string;
      }> = await api.fetchUsers();
      // Transform users to include a 'role' derived from the company's bs field
      return users.map((user) => ({
        ...user,
        role: user.company?.bs,
      }));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      return rejectWithValue(
        typeof errorMessage === "string" ? errorMessage : "Unknown error"
      );
    }
  }
);

export const updateUser = createAsyncThunk<User, User, ThunkApiConfig>(
  "users/updateUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await api.updateUser(userData.id, userData);

      return { ...res, id: userData.id };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      return rejectWithValue(
        typeof errorMessage === "string" ? errorMessage : "Unknown error"
      );
    }
  }
);

export const addUser = createAsyncThunk<User, User, ThunkApiConfig>(
  "users/addUser",
  async (userData, { rejectWithValue }) => {
    try {
      const newId = uuid.v4();
      const res = await api.addUser(userData);

      return { ...res, id: newId };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      return rejectWithValue(
        typeof errorMessage === "string" ? errorMessage : "Unknown error"
      );
    }
  }
);

export const deleteUser = createAsyncThunk<string, string, ThunkApiConfig>(
  "users/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      await api.deleteUser(userId);
      return userId;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      return rejectWithValue(
        typeof errorMessage === "string" ? errorMessage : "Unknown error"
      );
    }
  }
);

export const updateUserField = createAsyncThunk<
  { id: string; field: keyof User; value: User[keyof User] }, // Return this payload on success
  UserFieldUpdatePayload<keyof User>,
  ThunkApiConfig
>(
  "users/updateUserField",
  async ({ id, field, value }, { rejectWithValue }) => {
    try {
      await api.updateUserField(id, field, value);
      return { id, field, value };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      return rejectWithValue(
        typeof errorMessage === "string" ? errorMessage : "Unknown error"
      );
    }
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        action.payload.forEach((user) => {
          state.users[user.id] = user;
        });
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error =
          typeof action.payload === "string" ? action.payload : null; // General error for fetching users
      })
      .addCase(updateUser.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const user = action.payload;
        if (state.users[user.id]) {
          state.users[user.id] = user;
        }
        state.updateStatus = "succeeded";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error =
          typeof action.payload === "string" ? action.payload : null; // Specific error for updating users
      })
      .addCase(addUser.fulfilled, (state, action) => {
        const newUser = action.payload;

        state.users[newUser.id] = newUser;
      })
      .addCase(updateUserField.fulfilled, (state, action) => {
        const { id, field, value } = action.payload;
        if (state.users[id]) {
          state.users[id][field] = value;
        }
      })
      .addCase(deleteUser.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const userId = action.payload;
        delete state.users[userId];
        state.deleteStatus = "succeeded";
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error =
          typeof action.payload === "string" ? action.payload : null; // Specific error for deleting users
      });
  },
});

export default userSlice.reducer;
