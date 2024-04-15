import { StyleSheet } from "react-native";

export const formStyles = StyleSheet.create({
  field: {
    marginBottom: 15,
  },
  label: {
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
  },
  fieldRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textInput: {
    flexGrow: 1,
    marginRight: 10,
  },
  iconButton: {
    padding: 8,
  },
  inputField: {
    width: "80%",
  },
});
