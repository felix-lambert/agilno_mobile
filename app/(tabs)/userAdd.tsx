import React from "react";
import { ScrollView, Keyboard } from "react-native";
import { useSelector } from "react-redux";

import { useDispatch } from "@/hooks/useDispatch";
import { FormProvider, SubmitHandler } from "react-hook-form";

import { Container } from "@/components/Themed";
import { addUser } from "@/states/userSlice";
import { RootState } from "@/store";
import { useRouter } from "expo-router";
import { LabelledInput } from "@/components/LabelledInput";
import { InputField } from "@/components/InputField";
import { useFormInit } from "@/hooks/useFormInit";
import { showToast } from "@/utils/Alerts";
import { ActivityIndicator } from "react-native";
import { Button } from "@/components/Themed";

import { User } from "@/types";

const UserAddScreen: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const methods = useFormInit();

  const handleAddUser: SubmitHandler<User> = async () => {
    setIsLoading(true);
    const addedUserData: User = methods.getValues();

    try {
      const actionResult = await dispatch(addUser({ ...addedUserData }));
      if (addUser.fulfilled.match(actionResult)) {
        showToast("User added");
      } else if (addUser.rejected.match(actionResult)) {
        // Directly use the error message from action.payload which is set by `rejectedWithValue`
        const errorMessage =
          actionResult.payload || "Update failed due to server error";

        showToast(`User add failed: ${errorMessage}`);
      }
    } catch (err) {
      showToast(
        `User add failed: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    } finally {
      // Reset form to empty fields explicitly
      methods.reset({
        name: "",
        email: "",
        role: "",
        username: "",
        website: "",
      });
      setIsLoading(false);
      Keyboard.dismiss();

      router.replace("/");
    }
  };

  return (
    <Container>
      <ScrollView>
        <FormProvider {...methods}>
          <LabelledInput fieldKey="name" label="Name" component={InputField} />
          <LabelledInput
            fieldKey="email"
            label="Email"
            component={InputField}
          />
          <LabelledInput fieldKey="role" label="Role" component={InputField} />
          <LabelledInput
            fieldKey="username"
            label="Username"
            component={InputField}
          />
          <LabelledInput
            fieldKey="website"
            label="Website"
            component={InputField}
          />
        </FormProvider>
        <Button
          onPress={methods.handleSubmit(handleAddUser)}
          title="Add user"
          disabled={isLoading}
        />
        {isLoading === true && <ActivityIndicator />}
      </ScrollView>
    </Container>
  );
};

export default UserAddScreen;
