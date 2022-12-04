import { StyleSheet, View, Text } from "react-native";
export const Settings = () => {
  return (
    <View style={style.container}>
      <Text>Settings...</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
