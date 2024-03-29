import { useState, useEffect, useRef, useCallback, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Button,
} from "react-native";
import { NavBar } from "./components/NavBar";
import { History } from "./components/History";
import { Camera } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
//import axios from "axios";
import AppContext, { Context } from "./context/AppContext";
import { CameraScreen } from "./screens/CameraScreen";

//const BASE_URL = "https://ggdm340m97.execute-api.eu-central-1.amazonaws.com"; //image/predict/image_json;
const BASE_URL = "http://0.0.0.0:80/";
const Main = ({}) => {
  const { tab, setTab, photo, setPhoto } = useContext(Context);

  const [hasCameraPermission, setHasCameraPermission] = useState(undefined);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    useState(undefined);
  const [response, setResponse] = useState(undefined);
  //console.log("hascamera permission", hasCameraPermission);
  const setCamera = () => {
    setTab("camera");
  };

  const setSettings = () => {
    setTab("settings");
  };

  const setHistory = () => {
    //console.log("something");
    setTab("history");
  };
  //console.log("axios", axios);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (photo) {
    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
        setPhoto("history");
      });
    };
    const myjson = {
      base64: photo.base64,
    };
  }

  return (
    <View style={styles.main}>
      {tab === "settings" && <Text style={styles.elem}>settings!!!</Text>}
      {tab === "camera" &&
        (hasCameraPermission === undefined ? (
          <Text>Requesting permissions...</Text>
        ) : !hasCameraPermission ? (
          <Text>Permission for camera not granted</Text>
        ) : (
          <CameraScreen hasMediaLibraryPermission={hasMediaLibraryPermission} />
        ))}
      {tab === "history" && <History />}
      {tab !== "camera" && (
        <NavBar
          setCamera={setCamera}
          setSettings={setSettings}
          setHistory={setHistory}
        />
      )}
    </View>
  );
};

export default function App() {
  return (
    <AppContext>
      <Main />
    </AppContext>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: "#fff",
  },
  previewContainer: {
    alignSelf: "stretch",
    flex: 1,
    position: "relative",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
  responseContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    width: 170,
    height: 120,
    backgroundColor: "gray",
    borderRadius: 10,
    opacity: "0.6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  elem: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
  },
  response: {
    fontSize: 25,
    fontWeight: "0.8",
  },
});
