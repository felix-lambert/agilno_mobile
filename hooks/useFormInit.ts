import { useSelector } from "react-redux";
import { useForm, UseFormReturn } from "react-hook-form";
import { RootState } from "@/store";
import { User } from "@/types";

export const useFormInit = (userId?: string): UseFormReturn<User> => {
  const user = useSelector((state: RootState) => {
    if (userId) {
      return state.users.users[userId];
    }
    return null;
  });

  const formMethods = useForm<User>({
    defaultValues: user || {
      name: "",
      email: "",
      role: "",
      username: "",
      website: "",
    },
  });

  return formMethods;
};
