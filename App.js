import { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
const NavBar = ({ children }) => {
  const [tab, setTab] = useState("history");
  const devices = useCameraDevices();
  const device = devices.back;
  return (
    <View style={styles.main}>
      <Text style={styles.elem}>{tab}</Text>
      <View style={styles.navContainer}>
        <View style={styles.innerContainer}>
          <View>
            <TouchableOpacity
              onPress={() => {
                setTab("history");
              }}
            >
              <Image
                source={require("./assets/history.png")}
                style={{ width: 50, height: 50 }}
              />
              <Text>History</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                setTab("camera");
              }}
            >
              <Image
                source={require("./assets/camera.png")}
                style={{ width: 50, height: 50 }}
              />
              <Text>Camera</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                setTab("settings");
              }}
            >
              <Image
                source={require("./assets/menu.png")}
                style={{ width: 50, height: 50 }}
              />
              <Text>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default function App() {
  return (
    <View style={styles.main}>
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  navContainer: {
    height: "11%",
    width: "100%",
    paddingTop: 12,
    paddingBottom: 8,
    paddingLeft: 32,
    paddingRight: 32,
    borderTopWidth: 1,
    bottom: "-86%",
    right: 0,
  },
  innerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  elem: {
    display: "absolute",
    top: "50%",
    left: "50%",
  },
});
