import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/states/userSlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

// Define RootState based on the store's reducer
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
