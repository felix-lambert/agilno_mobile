import { useCallback } from "react";
import { useSelector } from "react-redux";
import { fetchAllUsers, deleteUser } from "@/states/userSlice";
import { RootState } from "@/store";
import { User } from "@/types";
import { useDispatch } from "./useDispatch";

type StatusType = "idle" | "loading" | "succeeded" | "failed";

interface UseUserActions {
  users: User[];
  fetchStatus: StatusType;
  error: string | null;
  fetchUsers: () => void;
  removeUser: (userId: string) => Promise<boolean>;
}

export const useUserActions = (): UseUserActions => {
  const dispatch = useDispatch();
  const {
    users: rawUsers,
    fetchStatus,
    error,
  } = useSelector((state: RootState) => state.users);

  // Convert rawUsers object to an array of users
  const users = Object.values(rawUsers);

  // useCallback to memoize the function to avoid unnecessary re-renders
  const fetchUsers = useCallback(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const removeUser = useCallback(
    async (userId: string): Promise<boolean> => {
      const actionResult = await dispatch(deleteUser(userId));
      return deleteUser.fulfilled.match(actionResult);
    },
    [dispatch]
  );

  // Return the state and handlers directly
  return { users, fetchStatus, error, fetchUsers, removeUser };
};
