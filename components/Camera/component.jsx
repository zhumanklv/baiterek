import { StyleSheet, View, Text } from "react-native";
export const Camera = () => {
  return (
    <View style={style.container}>
      <Text>Camera...</Text>
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
