import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, Camera } from "expo-camera";
import * as Location from "expo-location";
// import MapView, { Marker } from "react-native-maps";
import { WebView } from "react-native-webview";
import Background from "../../components/Background";
import TopBar from "../../components/TopBar";

const CheckInScreen = ({ navigation }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(null);
  const cameraRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [cameraType, setCameraType] = useState("front");

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } =
        await Camera.requestCameraPermissionsAsync();
      const { status: locationStatus } =
        await Location.requestForegroundPermissionsAsync();

      setHasCameraPermission(cameraStatus === "granted");
      setHasLocationPermission(locationStatus === "granted");

      if (locationStatus === "granted") {
        let loc = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });
      }
    })();

    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (hasCameraPermission === null || hasLocationPermission === null) {
    return (
      <Background>
        <TopBar
          title="บันทึกเวลาเข้างาน"
          back={() => navigation.navigate("Dashboard")}
        />
        <View style={styles.permissionContainer}>
          <Text>กำลังขอสิทธิ์...</Text>
        </View>
      </Background>
    );
  }
  if (!hasCameraPermission) {
    return (
      <Background>
        <TopBar
          title="บันทึกเวลาเข้างาน"
          back={() => navigation.navigate("Dashboard")}
        />
        <View style={styles.permissionContainer}>
          <Text>❌ ไม่ได้รับสิทธิ์ใช้กล้อง</Text>
        </View>
      </Background>
    );
  }
  if (!hasLocationPermission) {
    return (
      <Background>
        <TopBar
          title="บันทึกเวลาเข้างาน"
          back={() => navigation.navigate("Dashboard")}
        />
        <View style={styles.permissionContainer}>
          <Text>❌ ไม่ได้รับสิทธิ์ใช้ GPS</Text>
        </View>
      </Background>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhoto(photo.uri);
    }
  };

  const switchCamera = () => {
    setCameraType((prevType) => (prevType === "back" ? "front" : "back"));
  };

  return (
    <Background>
      {
        <TopBar
          title="บันทึกเวลาเข้างาน"
          back={() => navigation.navigate("Dashboard")}
        />
      }

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {currentTime.toLocaleDateString("th-TH", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </Text>
          <Text style={styles.headerText}>
            เวลา {currentTime.toLocaleTimeString("th-TH")}
          </Text>

          <Text style={[styles.headerStatus, { color: "red" }]}>
            คุณอยู่นอกพื้นที่ทำงาน
          </Text>
          <Text style={[styles.headerStatus2]}>
            ({location.latitude}, {location.longitude})
          </Text>
        </View>
        <View style={styles.content}>
          <View style={{ flex: 2 }}>
            {!photo ? (
              <CameraView
                style={styles.camera}
                facing={cameraType}
                ref={cameraRef}
              >
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.captureButton}
                    onPress={takePicture}
                  >
                    <Text style={styles.buttonText}>เข้างาน</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.captureButton}
                    onPress={takePicture}
                  >
                    <Text style={styles.buttonText}>ออกงาน</Text>
                  </TouchableOpacity>
                </View>
              </CameraView>
            ) : (
              <View style={styles.camera}>
                <Image source={{ uri: photo }} style={styles.image} />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.captureButton}
                    onPress={() => setPhoto(null)}
                  >
                    <Text style={styles.buttonText}>ยืนยัน</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.captureButton}
                    onPress={() => setPhoto(null)}
                  >
                    <Text style={styles.buttonText}>📸 ถ่ายใหม่</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
          <View style={styles.mapContainer}>
            <View style={styles.map}>
              {location ? (
                <WebView
                  originWhitelist={["*"]}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  source={{
                    html: `
                <!DOCTYPE html>
                <html>
                <head>
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
                  <style>
                    body, html { margin: 0; padding: 0; height: 100%; }
                    #map { height: 100vh; width: 100vw; }
                  </style>
                </head>
                <body>
                  <div id="map"></div>
                  test
                  <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
                  <script>
                    document.addEventListener("DOMContentLoaded", function() {
                       var map = L.map('map', {
                        center: [${location.latitude}, ${location.longitude}],
                        zoom: 15,
                        zoomControl: false  // ✅ ซ่อนปุ่ม Zoom
                      });
                      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        maxZoom: 19,
                      }).addTo(map);
                      L.marker([${location.latitude}, ${location.longitude}]).addTo(map)
                        // .bindPopup("คุณอยู่ที่นี่")
                        .openPopup();
                    });
                  </script>
                </body>
                </html>
              `,
                  }}
                />
              ) : (
                <Text>กำลังดึงตำแหน่ง GPS...</Text>
              )}
            </View>
            <TouchableOpacity style={styles.mapButton} onPress={switchCamera}>
              <Ionicons name="location-outline" size={28} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.mapButton} onPress={switchCamera}>
              <Ionicons name="camera-reverse-outline" size={28} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    position: "absolute",
    top: 10,
    left: 10,
    width: "100%",
    zIndex: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  headerStatus: {
    fontSize: 15,
    fontWeight: "bold",
    paddingTop: 15,
  },
  headerStatus2: {
    fontSize: 10,
    fontWeight: "bold",
    color: "gray",
    paddingTop: 2,
  },
  content: {
    flex: 1,
    position: "relative",
  },
  camera: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  captureButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
    borderColor: "#fff",
    padding: 15,
    marginHorizontal: 10,
    borderRadius: 50,
  },
  switchButton: {
    backgroundColor: "#FFD700",
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  mapContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 150,
    display: "flex",
  },
  map: {
    height: 250,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#FFF",
    borderRadius: 10,
    overflow: "hidden",
    zIndex: 5,
  },
  mapButton: {
    width: 55,
    height: 55,
    marginTop: 10,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 12,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#fff",
  },
  permissionContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CheckInScreen;
