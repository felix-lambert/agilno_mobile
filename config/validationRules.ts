import { RegisterOptions } from "react-hook-form";
import { FormValidationData } from "@/types/formTypes";

export const validationRules: Record<
  keyof FormValidationData,
  RegisterOptions
> = {
  name: {
    required: "Name is required",
    maxLength: { value: 50, message: "Name cannot exceed 50 characters" },
  },
  email: {
    required: "Email is required",
    pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email format" },
  },
  role: {
    required: "Role is required",
  },
  username: {
    required: "Username is required",
    minLength: { value: 4, message: "Username must be at least 4 characters" },
  },
  website: {
    required: "Website is required",
    pattern: {
      value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
      message: "Invalid URL",
    },
  },
};
