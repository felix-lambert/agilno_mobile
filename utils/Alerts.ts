import { Alert } from "react-native";
import Toast from "react-native-root-toast";

export const confirmDeletion = (onConfirm: () => void) => {
  Alert.alert("Confirmation", "Are you sure you want to delete this user?", [
    { text: "Cancel", style: "cancel" },
    { text: "OK", onPress: onConfirm },
  ]);
};

export const showToast = (message: string) => {
  Toast.show(message, {
    duration: Toast.durations.LONG,
    position: Toast.positions.TOP,
  });
};
