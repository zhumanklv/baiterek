import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";
import CameraOuter from "../../assets/cameraOuter.svg";
import CameraInner from "../../assets/cameraInner.svg";
import { en, ru, kz } from "../../localization.js";
import * as Localization from "expo-localization";
import i18n from "i18n-js";
export const NavBar = (props) => {
  const [locale, setLocale] = useState(Localization.locale);
  i18n.fallbacks = true;
  i18n.translations = { en, ru, kz };
  i18n.locale = locale;
  return (
    <View style={styles.navContainer}>
      <View style={styles.innerContainer}>
        <View>
          <TouchableOpacity onPress={() => props.setHistory()}>
            <Image
              source={require("../../assets/history.png")}
              style={{
                width: 35,
                height: 35,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
            <Text>{i18n.t("history")}</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: 96,
            height: 96,
            borderWidth: 1,
            borderColor: "black",
            backgroundColor: "#4793C5",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            top: -50,
          }}
        >
          <TouchableOpacity
            onPress={() => props.setCamera()}
            style={{ height: 40 }}
          >
            <CameraOuter width={120} height={40} fill={"#4793C5"} />
            <CameraInner
              width={60}
              height={15}
              fill={"#4793C5"}
              style={{ position: "relative", top: -25, right: -30 }}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => props.setSettings()}>
            <Image
              source={require("../../assets/menu.png")}
              style={{
                width: 35,
                height: 35,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
            <Text>{i18n.t("settings")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    height: "11%",
    width: "100%",
    paddingTop: 12,
    paddingBottom: 2,
    paddingLeft: 32,
    paddingRight: 32,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    bottom: "-89%",
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    right: 0,
  },
  innerContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainer: {
    backgroundColor: "#fff",
  },
  cameraButton: {
    backgroundColor: "#fff",
    borderRadius: "50%",
    width: "90%",
    height: "90%",
  },
});
