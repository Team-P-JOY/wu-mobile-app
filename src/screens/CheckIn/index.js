import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
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
  const [location, setLocation] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [cameraType, setCameraType] = useState("back");

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
      <View style={styles.permissionContainer}>
        <Text>กำลังขอสิทธิ์...</Text>
      </View>
    );
  }
  if (!hasCameraPermission) {
    return (
      <View style={styles.permissionContainer}>
        <Text>❌ ไม่ได้รับสิทธิ์ใช้กล้อง</Text>
      </View>
    );
  }
  if (!hasLocationPermission) {
    return (
      <View style={styles.permissionContainer}>
        <Text>❌ ไม่ได้รับสิทธิ์ใช้ GPS</Text>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhoto(photo.uri);
    }
  };

  // ✅ ฟังก์ชันสลับกล้อง
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
            เวลา {currentTime.toLocaleTimeString("th-TH")}
          </Text>
        </View>
        <View style={styles.content}>
          <View style={{ flex: 2 }}>
            {!photo ? (
              <CameraView
                style={styles.camera}
                cameraType={cameraType}
                ref={cameraRef}
              >
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.captureButton}
                    onPress={takePicture}
                  >
                    <Text style={styles.buttonText}>📸 ถ่ายรูป</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.switchButton}
                    onPress={switchCamera}
                  >
                    <Text style={styles.buttonText}>🔄 สลับกล้อง</Text>
                  </TouchableOpacity>
                </View>
              </CameraView>
            ) : (
              <View style={styles.imageContainer}>
                <Image source={{ uri: photo }} style={styles.image} />
                <Button title="ถ่ายใหม่" onPress={() => setPhoto(null)} />
              </View>
            )}
          </View>
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

          {/* {location ? (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker coordinate={location} title="คุณอยู่ที่นี่" />
            </MapView>
          ) : (
            <Text>กำลังดึงตำแหน่ง GPS...</Text>
          )} */}
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
    padding: 10,
    backgroundColor: "#DDA8A8",
    width: "100%",
    alignItems: "center",
    zIndex: 10, // ให้ Header อยู่ด้านบนสุด
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
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
    // justifyContent: "center",
  },
  captureButton: {
    backgroundColor: "#FFF",
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  switchButton: {
    backgroundColor: "#FFD700",
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
  },
  map: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 150,
    height: 250,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#FFF",
    borderRadius: 10,
    overflow: "hidden",
    zIndex: 5, // ให้อยู่เหนือกล้อง
  },
  permissionContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CheckInScreen;
