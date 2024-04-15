import React, { useEffect, useCallback } from "react";
import { FlatList, View } from "react-native";

import { Container, Text } from "@/components/Themed";
import { UserItem } from "@/components/UserItem";
import { useRouter } from "expo-router";
import { useUserActions } from "@/hooks/useUserActions";
import { confirmDeletion, showToast } from "@/utils/Alerts";
import { LoadingIndicator } from "@/components/LoadingIndicator";

const UserListScreen: React.FC = () => {
  const router = useRouter();

  // Selector hooks are used to extract data from the Redux store
  const { users, fetchStatus, error, fetchUsers, removeUser } =
    useUserActions();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleNavigate = useCallback(
    (userId: string, path: string) => {
      router.navigate(`(stacks)/${path}/${userId}`);
    },
    [router]
  );

  const handleDeleteUser = async (userId: string) => {
    confirmDeletion(async () => {
      if (await removeUser(userId)) {
        showToast("User deleted successfully");
      }
    });
  };

  if (fetchStatus === "loading") {
    return <LoadingIndicator />;
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <Container>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <UserItem
            user={item}
            onPressDetail={() => handleNavigate(item.id, "(userDetail)")}
            onPressEdit={() => handleNavigate(item.id, "(userEdit)")}
            onPressDelete={() => handleDeleteUser(item.id)}
          />
        )}
      />
    </Container>
  );
};

export default UserListScreen;
