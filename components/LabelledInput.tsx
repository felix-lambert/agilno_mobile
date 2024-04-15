import React from "react";
import { Text, View } from "@/components/Themed";
import { formStyles } from "@/styles/formStyles";
import { User } from "@/types";

type LabelledInputProps = {
  fieldKey: keyof User;
  label: string;
  component: React.ComponentType<{ fieldKey: keyof User }>;
};

export const LabelledInput: React.FC<LabelledInputProps> = ({
  fieldKey,
  label,
  component: InputComponent,
}) => (
  <View style={formStyles.field}>
    <Text style={formStyles.label} accessibilityLabel={`${label} field`}>
      {label}:
    </Text>
    <InputComponent fieldKey={fieldKey} />
  </View>
);
