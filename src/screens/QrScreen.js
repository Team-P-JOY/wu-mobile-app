import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Dimensions,
} from "react-native";
import Background from "../components/Background";
import TopBar from "../components/TopBar";
import Svg, { Rect } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function QrScreen({ navigation }) {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) {
    return (
      <Background>
        <TopBar
          title="QR Scanner"
          back={() => navigation.navigate("Dashboard")}
        />
        <View style={styles.container}>
          <Text style={styles.message}>Requesting camera permission...</Text>
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
            We need your permission to use the camera.
          </Text>
          <Button onPress={requestPermission} title="Grant Permission" />
        </View>
      </Background>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  function handleBarCodeScanned({ type, data }) {
    setScanned(true);
    Alert.alert("QR Code Scanned", `Type: ${type}\nData: ${data}`, [
      { text: "OK", onPress: () => setScanned(false) },
    ]);
  }

  return (
    <Background>
      <TopBar
        title="QR Scanner"
        back={() => navigation.navigate("Dashboard")}
      />
      <View style={styles.container}>
        <View style={styles.camera}>
          <CameraView
            style={styles.cameraFrame}
            facing={facing}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
          >
            <View style={styles.overlay}>
              <Svg height={height} width={width}>
                <Rect
                  x={width * 0.1}
                  y={height * 0.3}
                  width={width * 0.8}
                  height={width * 0.8}
                  stroke="orange"
                  strokeWidth="4"
                  fill="none"
                />
              </Svg>
            </View>
          </CameraView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCameraFacing}
            >
              <Ionicons name="camera-reverse-outline" size={28} color="white" />
              <Text style={styles.text}>สลับจอ</Text>
            </TouchableOpacity>
          </View>
        </View>
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

  cameraFrame: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderWidth: 1,
    borderColor: "#fff",
    padding: 15,
    borderRadius: 50,
  },
  text: {
    marginLeft: 10,
    fontSize: 18,
    color: "white",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
