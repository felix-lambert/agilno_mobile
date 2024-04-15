import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
  StyleSheet,
} from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Colors from "@/constants/Colors";

type TabBarItemProps = BottomTabBarProps & {
  backgroundColor?: string;
};

export const TabBarItem: React.FC<TabBarItemProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const theme = useColorScheme() ?? "light";
  const backgroundColor = Colors[theme].bottomTabBarBackground;

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        if (route.name === "(stacks)") return null;

        const { options } = descriptors[route.key];
        const label = options.title || route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const color = isFocused ? "#fcb900" : "white";

        const icon =
          options.tabBarIcon &&
          options.tabBarIcon({
            focused: isFocused,
            color,
            size: 24,
          });

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            style={[styles.tab, { backgroundColor }]}
          >
            {icon}
            <Text style={[styles.label, { color }]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingBottom: 10,
  },
  tab: {
    flex: 1,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    textAlign: "center",
    marginTop: 4,
  },
});
