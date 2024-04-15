import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

export const LoadingIndicator: React.FC = () => (
  <View style={styles.centered}>
    <ActivityIndicator size="large" />
  </View>
);

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});
