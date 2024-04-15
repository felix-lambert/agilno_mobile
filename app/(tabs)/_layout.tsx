import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useClientOnlyValue } from "@/hooks/useClientOnlyValue";
import { TabBarItem } from "@/components/TabBarItem";

enum ColorScheme {
  Light = "light",
  Dark = "dark",
}

interface TabBarIconProps {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}

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
