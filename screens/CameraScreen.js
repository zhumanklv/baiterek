import { Context } from "../context/AppContext";
import { useContext, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  SafeAreaView,
  ImageBackground,
  Touchable,
  Pressable,
} from "react-native";
import { Camera } from "expo-camera";
import Back from "../assets/back.svg";
import { setStatusBarBackgroundColor } from "expo-status-bar";
import axios from "axios";

const BASE_URL = "http://0.0.0.0:80/";
export const CameraScreen = ({ hasMediaLibraryPermission }) => {
  let cameraRef = useRef();
  const { tab, setTab } = useContext(Context);
  const [photo, setPhoto] = useState(null);
  const [response, setResponse] = useState(null);
  const [status, setStatus] = useState(null);
  const takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };
    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };
  const predictPic = async () => {
    //const formData = new FormData();
    //formData.append("file", photo.base64);
    const myPhoto = {
      file: photo.base64,
    };
    try {
      //const url = BASE_URL + "predict/image";
      const response = await axios.post(
        "http://3.144.142.97/predict/image",
        JSON.stringify(myPhoto),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            withCredentials: true,
          },
        }
      );
      console.log("response", response);
      setResponse(response.data.class);
    } catch (error) {
      console.log("Exception Error: ", error);
    }
  };
  return (
    <>
      {photo ? (
        <SafeAreaView style={styles.cameraContainer}>
          <View style={styles.previewContainer}>
            <ImageBackground style={styles.preview} source={{ uri: photo.uri }}>
              <TouchableOpacity
                style={styles.backContainer}
                onPress={() => {
                  setPhoto(null);
                }}
              >
                <Back />
              </TouchableOpacity>
            </ImageBackground>
            {response && (
              <View style={styles.responseContainer}>
                <Text style={styles.response}>{response}</Text>
              </View>
            )}
          </View>
          <Pressable
            onPress={() => {
              setStatus("loading");
              predictPic();
            }}
            style={styles.predictContainer}
          >
            <Text style={styles.predictText}>
              {status === "loading" ? "Loading..." : "Predict"}
            </Text>
          </Pressable>
        </SafeAreaView>
      ) : (
        <>
          <Camera ref={cameraRef} style={styles.cameraContainer} />
          <View style={styles.navContainerCamera}>
            <View style={styles.innerContainer}>
              <View>
                <TouchableOpacity onPress={() => setTab("history")}>
                  <Image
                    source={require("../assets/history.png")}
                    style={{
                      width: 35,
                      height: 35,
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  />
                  <Text>History</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 96,
                  height: 96,
                  borderWidth: 1,
                  borderColor: "black",
                  backgroundColor: "#4793C5",
                  borderRadius: 48,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  top: -50,
                }}
              >
                <TouchableOpacity
                  style={styles.cameraButton}
                  onPress={takePic}
                />
              </View>
              <View>
                <TouchableOpacity onPress={() => setTab("settings")}>
                  <Image
                    source={require("../assets/menu.png")}
                    style={{
                      width: 35,
                      height: 35,
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  />
                  <Text>Settings</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  navContainerCamera: {
    height: "11%",
    width: "100%",
    paddingTop: 12,
    paddingBottom: 2,
    paddingLeft: 32,
    paddingRight: 32,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
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
    borderRadius: 40,
    width: "80%",
    height: "80%",
  },
  cameraContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    left: "40%",
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
  backContainer: {
    backgroundColor: "#4793C5",
    borderRadius: 20,
    width: 40,
    height: 40,
    position: "relative",
    left: 10,
    top: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  predictContainer: {
    width: 170,
    height: 56,
    backgroundColor: "#4793C5",
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  predictText: {
    fontSize: 20,
    fontWeight: "500",
    color: "white",
    textAlign: "center",
  },
});
