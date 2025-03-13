import { SafeAreaView, StyleSheet, Text } from "react-native";
import { scale } from "react-native-size-matters";

function PlaceholderScreen() {
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.message}>Screen in development</Text>
    </SafeAreaView>
  );
}

export { PlaceholderScreen };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  message: {
    fontSize: scale(16),
    color: "rgb(249, 37, 63)"
  }
})