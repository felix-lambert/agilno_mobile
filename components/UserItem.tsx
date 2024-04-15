import React from "react";
import { UserItemProps } from "@/types";
import { ListItem, Text, View } from "./Themed";
import { TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export const UserItem: React.FC<UserItemProps> = ({
  user,
  onPressDetail,
  onPressEdit,
  onPressDelete,
}) => {
  return (
    <ListItem style={{ flexDirection: "row" }}>
      <View style={styles.textContainer}>
        <Text>{user.name}</Text>
        <Text>{user.email}</Text>
        <Text>{user.role}</Text>
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={onPressDetail} style={styles.iconButton}>
          <FontAwesome name="eye" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressEdit} style={styles.iconButton}>
          <FontAwesome name="pencil" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressDelete} style={styles.iconButton}>
          <FontAwesome name="trash" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  textContainer: {
    flex: 1,
  },

  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 10,
    padding: 5,
  },
});
