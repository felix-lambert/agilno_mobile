import React, { ForwardedRef } from "react";
import {
  Text as DefaultText,
  View as DefaultView,
  TextInput as DefaultTextInput,
  TouchableOpacity,
  TextStyle,
  StyleProp,
} from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "../hooks/useColorScheme";
import { TextInputProps, TextProps, ViewProps, ButtonProps } from "@/types";
import { useThemedStyles } from "@/hooks/useThemedStyles";

interface CustomTextInputProps extends TextInputProps {
  style?: StyleProp<TextStyle>;
}

export function Text({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: TextProps) {
  const styles = useThemedStyles({ lightColor, darkColor }, () => ({
    fontFamily: "SpaceMono",
  }));
  return <DefaultText style={[styles.base, style]} {...otherProps} />;
}

export const TextInput = React.forwardRef(
  (
    { style, lightColor, darkColor, ...otherProps }: CustomTextInputProps,
    ref: ForwardedRef<DefaultTextInput>
  ) => {
    const styles = useThemedStyles({ lightColor, darkColor }, () => ({
      fontSize: 16,
      padding: 10,
      borderWidth: 1,
      borderColor: Colors[useColorScheme() ?? "light"].text,
      borderRadius: 5,
      fontFamily: "SpaceMono",
    }));
    return (
      <DefaultTextInput
        ref={ref}
        style={[styles.base, style]}
        {...otherProps}
      />
    );
  }
);

export const Button = ({
  title,
  onPress,
  lightColor,
  darkColor,
  disabled,
}: ButtonProps) => {
  const styles = useThemedStyles({ lightColor, darkColor }, () => ({
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    marginVertical: 10,
  }));
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.base, { opacity: disabled ? 0.5 : 1 }]}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

export function View({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ViewProps) {
  const styles = useThemedStyles({ lightColor, darkColor }, () => ({}));
  return <DefaultView style={[styles.base, style]} {...otherProps} />;
}

export function Container({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ViewProps) {
  const styles = useThemedStyles({ lightColor, darkColor }, () => ({
    flex: 1,
    padding: 20,
  }));
  return <DefaultView style={[styles.base, style]} {...otherProps} />;
}

export function ListItem({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ViewProps) {
  const styles = useThemedStyles({ lightColor, darkColor }, () => ({
    marginVertical: 8,
  }));
  return <DefaultView style={[styles.base, style]} {...otherProps} />;
}
