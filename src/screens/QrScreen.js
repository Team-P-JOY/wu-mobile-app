import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Background from "../components/Background";
import TopBar from "../components/TopBar";

export default function QrScreen({ navigation }) {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return (
      <Background>
        <TopBar
          title="QR Scanner"
          back={() => navigation.navigate("Dashboard")}
        />
        <View style={styles.container}>
          <Text style={styles.message}>XXXX</Text>
        </View>
      </Background>
    );
  }

  if (!permission.granted) {
    return (
      <Background>
        <TopBar
          title="QR Scanner"
          back={() => navigation.navigate("Dashboard")}
        />
        <View style={styles.container}>
          <Text style={styles.message}>
            We need your permission to show the camera
          </Text>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      </Background>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <Background>
      <TopBar
        title="QR Scanner"
        back={() => navigation.navigate("Dashboard")}
      />
      <View style={styles.container}>
        <CameraView style={styles.camera} facing={facing}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCameraFacing}
            >
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
