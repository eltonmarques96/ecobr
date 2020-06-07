import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Colé comunidade</Text>
      <Text>Braga é puta</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ded",
    alignItems: "center",
    justifyContent: "center",
  },
});
