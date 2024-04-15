import { StyleSheet, TextStyle } from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "./useColorScheme";
import { ThemeProps } from "@/types";

interface ColorSchemeProps {
  color: string;
  backgroundColor: string;
}

export function useThemedStyles<T extends ThemeProps>(
  props: T,
  extraStyles: (colors: ColorSchemeProps) => TextStyle
) {
  const theme = useColorScheme() ?? "light";
  const color = props[`${theme}Color`] ?? Colors[theme].text;
  const backgroundColor = props[`${theme}Color`] ?? Colors[theme].background;

  const baseStyles = extraStyles({ color, backgroundColor });

  return StyleSheet.create({
    base: {
      color,
      backgroundColor,
      ...baseStyles,
    },
  });
}
