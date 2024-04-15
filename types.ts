import { RootState } from "@/store";
import { AppDispatch } from "@/store";
import {
  TextProps as DefaultTextProps,
  ViewProps as DefaultViewProps,
  TextInputProps as DefaultTextInputProps,
} from "react-native";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  username: string;
  phone: string;
  website: string;
}

export type FormValidationData = Omit<User, "id">;

export interface UserItemProps {
  user: User;
  onPressDetail: () => void;
  onPressEdit: () => void;
  onPressDelete: () => void;
}

export interface ThunkApiConfig {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string | Error; // Customize this based on your error handling strategy
}
// Define a type for the slice state
export interface UserState {
  users: Record<string, User>;
  fetchStatus: "idle" | "loading" | "succeeded" | "failed";
  updateStatus: "idle" | "loading" | "succeeded" | "failed";
  deleteStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  updateError: string | null;
  deleteError: string | null;
}

export type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultTextProps;
export type ViewProps = ThemeProps & DefaultViewProps;
export type TextInputProps = ThemeProps & DefaultTextInputProps;

export interface ButtonProps {
  title: string;
  onPress: () => void;
  lightColor?: string;
  darkColor?: string;
  disabled?: boolean;
}

export interface UserEditScreenProps {
  segment: string;
}

export type UserFieldUpdatePayload<T extends keyof User> = {
  id: User["id"];
  field: T;
  value: User[T];
};
