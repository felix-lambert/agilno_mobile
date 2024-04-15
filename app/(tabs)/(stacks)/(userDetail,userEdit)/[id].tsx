import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Container, Button } from "@/components/Themed";
import { ScrollView, ActivityIndicator } from "react-native";
import { FormProvider, SubmitHandler } from "react-hook-form";
import { useDispatch } from "@/hooks/useDispatch";
import { useFormInit } from "@/hooks/useFormInit";
import { updateUser } from "@/states/userSlice";
import { LabelledInput } from "@/components/LabelledInput";
import { InputField } from "@/components/InputField";
import { User } from "@/types";
import { showToast } from "@/utils/Alerts";
import { useSelector } from "react-redux";
import { FieldEditor } from "@/components/FieldEditor";
import { RootState } from "@/store";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { UserEditScreenProps } from "@/types";
import { FieldEditorProps } from "@/components/FieldEditor";

const UserEditScreen: React.FC<UserEditScreenProps> = ({ segment }) => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [formReady, setFormReady] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const methods = useFormInit(id);

  const user = useSelector((state: RootState) => state.users.users[id]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      methods.reset(user);
      setFormReady(true);
    }
  }, [user, methods]);

  const handleUpdateUser: SubmitHandler<User> = async () => {
    setIsLoading(true);
    const updatedUserData: User = methods.getValues();

    try {
      const actionResult = await dispatch(updateUser(updatedUserData));
      if (updateUser.fulfilled.match(actionResult)) {
        showToast("User edited");

        methods.reset(updatedUserData);
      } else if (updateUser.rejected.match(actionResult)) {
        // Directly use the error message from action.payload which is set by `rejectedWithValue`
        const errorMessage =
          actionResult.payload || "Update failed due to server error";

        showToast(`User update failed: ${errorMessage}`);
      }
    } catch (err) {
      showToast(
        `User update failed: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    } finally {
      setIsLoading(false);
      router.replace("/");
    }
  };

  let fieldComponentToRender: React.FC<FieldEditorProps>;

  if (segment === "(userDetail)/[id]") {
    fieldComponentToRender = FieldEditor;
  } else {
    fieldComponentToRender = InputField;
  }

  if (formReady === false) {
    return <LoadingIndicator />;
  }

  return (
    <Container>
      <ScrollView>
        <FormProvider {...methods}>
          <LabelledInput
            fieldKey="name"
            label="Name"
            component={fieldComponentToRender}
          />
          <LabelledInput
            fieldKey="email"
            label="Email"
            component={fieldComponentToRender}
          />
          <LabelledInput
            fieldKey="role"
            label="Role"
            component={fieldComponentToRender}
          />
          <LabelledInput
            fieldKey="username"
            label="Username"
            component={fieldComponentToRender}
          />
          <LabelledInput
            fieldKey="website"
            label="Website"
            component={fieldComponentToRender}
          />
        </FormProvider>
        {segment === "(userEdit)/[id]" ? (
          <>
            <Button
              onPress={methods.handleSubmit(handleUpdateUser)}
              title="Edit user"
              disabled={isLoading}
            />
            {isLoading === true && <ActivityIndicator />}
          </>
        ) : null}
      </ScrollView>
    </Container>
  );
};

export default UserEditScreen;
