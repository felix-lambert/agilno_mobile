import React, { useCallback, useState } from "react";
import { Text, View } from "@/components/Themed";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { updateUserField } from "@/states/userSlice";
import { useDispatch } from "@/hooks/useDispatch";

import { useFormContext } from "react-hook-form";
import { InputField } from "./InputField";
import { User } from "@/types";
import { formStyles } from "@/styles/formStyles";

interface FieldEditorProps {
  fieldKey: keyof User;
}

export const FieldEditor: React.FC<FieldEditorProps> = ({ fieldKey }) => {
  const {
    trigger,
    resetField,
    watch,
    getValues,
    reset,
    formState: { errors },
  } = useFormContext<User>();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);

    resetField(fieldKey);
  };

  const dispatch = useDispatch();

  const handleUpdateField = useCallback(
    async (fieldKey: keyof User) => {
      // Get the current field value
      const fieldValue = watch(fieldKey);

      const isFieldValid = await trigger(fieldKey);

      // If the field is not valid, exit the function early
      if (!isFieldValid) {
        return;
      }

      // Dispatch the update action with the current value of the field
      const actionResult = await dispatch(
        updateUserField({
          id: watch("id"),
          field: fieldKey,
          value: fieldValue,
        })
      );

      // If the update was successful, update only the changed field
      if (updateUserField.fulfilled.match(actionResult)) {
        const allValues = getValues();

        // Update the specific field with the new value
        allValues[fieldKey] = fieldValue;

        // Reset the form with updated values
        reset(allValues);

        setIsEditing(false);
      }
    },
    [fieldKey, dispatch, watch, trigger, getValues, reset]
  );

  return (
    <View style={formStyles.fieldRow}>
      {isEditing ? (
        <>
          <InputField fieldKey={fieldKey} style={formStyles.inputField} />
          <TouchableOpacity
            onPress={() => handleUpdateField(fieldKey)}
            style={formStyles.iconButton}
          >
            <FontAwesome name="check" size={20} color="green" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleCancel}
            style={formStyles.iconButton}
          >
            <FontAwesome name="times" size={20} color="red" />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text>{watch(fieldKey)}</Text>
          <TouchableOpacity onPress={handleEdit} style={formStyles.iconButton}>
            <FontAwesome name="pencil" size={20} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};
