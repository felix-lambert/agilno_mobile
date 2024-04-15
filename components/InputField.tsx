import React, { useMemo, useCallback } from "react";
import { TextInput, View, Text } from "@/components/Themed";
import { useFormContext } from "react-hook-form";
import { StyleSheet, ViewStyle } from "react-native";
import { validationRules } from "@/config/validationRules";
import { User } from "@/types";

type InputFieldProps = {
  fieldKey: keyof User;
  style?: ViewStyle;
};

export const InputField: React.FC<InputFieldProps> = ({ fieldKey, style }) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<User>();
  const value = watch(fieldKey);

  const id = watch("id");

  const containerStyle = useMemo(() => [styles.container, style], [style]);

  const handleChangeText = useCallback(
    (text: string) => {
      setValue(fieldKey, text);
    },
    [setValue, fieldKey]
  );

  return (
    <View style={containerStyle}>
      <TextInput
        style={styles.textInput}
        value={value || ""}
        onChangeText={handleChangeText}
        {...register(fieldKey, validationRules[fieldKey])}
      />
      {errors[fieldKey] && (
        <Text style={styles.errorText}>{errors?.[fieldKey]?.message}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  textInput: {
    flexGrow: 1,
    padding: 8,
    borderColor: "gray",
    borderWidth: 1,
  },
  errorText: {
    color: "red",
    marginTop: 4,
  },
});
