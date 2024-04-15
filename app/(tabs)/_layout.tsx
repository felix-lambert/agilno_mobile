import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useClientOnlyValue } from "@/hooks/useClientOnlyValue";
import { TabBarItem } from "@/components/TabBarItem";

// Define an enum for color schemes for better type safety and management
enum ColorScheme {
  Light = "light",
  Dark = "dark",
}

// Type definition for TabBarIcon props
interface TabBarIconProps {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}

// TabBarIcon component with explicit React.FC type
const TabBarIcon: React.FC<TabBarIconProps> = ({ name, color }) => {
  return (
    <FontAwesome
      size={28}
      style={{ marginBottom: -3 }}
      name={name}
      color={color}
    />
  );
};

// TabLayout component using best TypeScript practices
const TabLayout: React.FC = () => {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? ColorScheme.Light].tint,
        headerShown: useClientOnlyValue(false, true),
      }}
      tabBar={(props) => <TabBarItem {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "User list",
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
      <Tabs.Screen
        name="(stacks)"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="userAdd"
        options={{
          title: "Add user",
          tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
