import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Button,
} from "react-native";
import { Camera } from "expo-camera";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import axios from "axios";

const BASE_URL = "http://localhost:3000";
const NavBar = ({}) => {
  const [tab, setTab] = useState("history");
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState(undefined);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    useState(undefined);
  const [photo, setPhoto] = useState(false);
  const [response, setResponse] = useState("loading...");

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  const takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };
    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
        setTab("history");
      });
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
        setPhoto("history");
      });
    };

    const predictPic = async () => {
      const formData = new FormData("file", photo.base64);
      const response = await axios.post(
        BASE_URL + "/predict/image",
        JSON.stringify(FormData),
        {
          headers: {
            "Content-type": "multipart/form-data",
            withCredentials: true,
          },
        }
      );
      setResponse(response.data);
    };

    return (
      <SafeAreaView style={styles.cameraContainer}>
        <Image
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
        <Text>{response}</Text>
        <Button title="Predict" onPress={predictPic} />
        <Button title="Share" onPress={sharePic} />
        {hasMediaLibraryPermission && (
          <Button title="Save" onPress={savePhoto} />
        )}
        <Button
          title="Discard"
          onPress={() => {
            setPhoto(undefined);
            setTab("history");
          }}
        />
      </SafeAreaView>
    );
  }
  return (
    <View style={styles.main}>
      {tab === "camera" ? (
        hasCameraPermission === undefined ? (
          <Text>Requesting permissions...</Text>
        ) : !hasCameraPermission ? (
          <Text>Permission for camera not granted</Text>
        ) : (
          <Camera ref={cameraRef} style={styles.cameraContainer}>
            <View style={styles.buttonContainer}>
              <Button title="Take pic" onPress={takePic} />
            </View>
          </Camera>
        )
      ) : (
        <Text style={styles.elem}>{tab}</Text>
      )}
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
  cameraContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: "#fff",
    alignSelf: "flex-end",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
});
