import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";

export const NavBar = () => {
  return (
    <View style={style.container}>
      <Text>hello??/</Text>
      <View style={style.innerContainer}>
        <TouchableOpacity onPress={() => {}}>
          <View>
            <Image source={require("../../assets/history.svg")} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View>
            <Image source={require("../../assets/camera.svg")} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View>
            <Image source={require("../../assets/menu.svg")} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: "100%",
    height: 200,
    position: "fixed",
    bottom: 0,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },

  innerContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
});
