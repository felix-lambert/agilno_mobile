import { Stack, useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const HeaderLeft: React.FC = () => {
  const router = useRouter();
  return (
    <TouchableOpacity
      accessibilityLabel="Go back"
      accessibilityRole="button"
      onPress={() => router.replace("/")}
    >
      <FontAwesome name="arrow-left" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default function HomeLayout(): React.ReactElement {
  return (
    <Stack>
      <Stack.Screen
        name="(userEdit)/[id]"
        options={{
          title: "User edit",
          headerLeft: () => <HeaderLeft />,
        }}
      />
      <Stack.Screen
        name="(userDetail)/[id]"
        options={{
          title: "User detail",
          headerLeft: () => <HeaderLeft />,
        }}
      />
    </Stack>
  );
}
