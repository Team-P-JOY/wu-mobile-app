import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, Camera } from "expo-camera";
import * as Location from "expo-location";
import { WebView } from "react-native-webview";
import Background from "../../components/Background";
import TopBar from "../../components/TopBar";
import { theme } from "../../core/theme";

const CheckInScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(null);
  const cameraRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [cameraType, setCameraType] = useState("front");
  const [locations, setLocations] = useState([]);
  const [loadingLocations, setLoadingLocations] = useState(true);
  const [locationStatus, setLocationStatus] = useState({
    status: false,
    message: "ไม่สามารถระบุตำแหน่งได้",
    distance: 0,
  });

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(
          "https://e-jpas.wu.ac.th/checkin/point.js"
        );
        const jsonRes = await response.json();
        setLocations(jsonRes);
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setLoadingLocations(false);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    if (loadingLocations) return;
    const fetchPermissionsAndLocation = async () => {
      const { status: cameraStatus } =
        await Camera.requestCameraPermissionsAsync();
      const { status: locationStatus } =
        await Location.requestForegroundPermissionsAsync();

      setHasCameraPermission(cameraStatus === "granted");
      setHasLocationPermission(locationStatus === "granted");

      if (locationStatus === "granted") {
        await _callCurrentLocation();
      }
    };

    fetchPermissionsAndLocation();
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, [loadingLocations]);

  const _callCurrentLocation = async () => {
    let loc = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });

    _findNearLocation(loc.coords.latitude, loc.coords.longitude);

    // setLocation({
    //   latitude: 8.6409279,
    //   longitude: 99.9002386,
    // });
    // _findNearLocation(8.6409279, 99.9002386);
  };

  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (angle) => (Math.PI / 180) * angle;

    const R = 6371 * 1000;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const _findNearLocation = (lat, lng) => {
    if (!locations || locations.length === 0) {
      setLocationStatus({
        status: false,
        message: "ไม่พบสถานที่",
        distance: 0,
      });
      return;
    }

    let nearLocation = null;
    for (let i = 0; i < locations.length; i++) {
      let distance = haversineDistance(
        lat,
        lng,
        parseFloat(locations[i].LAT),
        parseFloat(locations[i].LNG)
      );

      const distanceRadius = distance - parseFloat(locations[i].RADIUS);
      if (distanceRadius < 0) {
        nearLocation = {
          status: true,
          message: locations[i].UNIT_NAME,
          distance: distanceRadius,
        };
        break;
      } else if (
        nearLocation === null ||
        distanceRadius < nearLocation.distance
      ) {
        nearLocation = {
          status: true,
          message: locations[i].UNIT_NAME,
          distance: distanceRadius,
        };
      }
    }

    if (nearLocation) {
      if (nearLocation.distance < 0) {
        setLocationStatus({
          status: true,
          message: `อยู่ใน ${nearLocation.message}`,
          distance: 0,
        });
      } else {
        setLocationStatus({
          status: false,
          message: `อยู่ใกล้ ${nearLocation.message}`,
          distance: nearLocation.distance,
        });
      }
    } else {
      setLocationStatus({
        status: false,
        message: "ไม่ได้อยู่ในพื้นที่",
        distance: 0,
      });
    }
  };

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

  if (loadingLocations) {
    return (
      <Background>
        <TopBar
          title="บันทึกเวลาเข้างาน"
          back={() => navigation.navigate("Dashboard")}
        />
        <View style={styles.permissionContainer}>
          <ActivityIndicator size="large" color="orange" />
          <Text>กำลังโหลดข้อมูลสถานที่...</Text>
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

          <Text
            style={[
              styles.headerStatus,
              { color: locationStatus.status ? "green" : "red" },
            ]}
          >
            {locationStatus.message}
          </Text>

          {locationStatus.distance !== 0 ? (
            <Text
              style={[
                styles.headerStatusDis,
                { color: locationStatus.status ? "green" : "red" },
              ]}
            >
              (ระยะห่าง {locationStatus.distance.toFixed(2)} ม.)
            </Text>
          ) : (
            ""
          )}

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
            <View style={[styles.map, { borderColor: theme.colors.myTheme }]}>
              {location && locations ? (
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
                        zoom: 16,
                        zoomControl: false 
                      });
                      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        maxZoom: 19,
                      }).addTo(map);

                      L.marker([${location.latitude}, ${
                      location.longitude
                    }]).addTo(map).openPopup();
                      var locations = ${JSON.stringify(locations)};
                      locations.forEach(function(location) {
                        var circle = L.circle([parseFloat(location.LAT), parseFloat(location.LNG)], {
                              radius: parseFloat(location.RADIUS),
                              color: '#6a11cb',
                              fillColor: '#6a11cb',
                              weight: 0.5,
                              fillOpacity: 0.2,
                              bubblingMouseEvents: false,
                              keyboard: false
                            }).addTo(map);
                        });
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
            <View style={styles.buttonsRow}>
              <TouchableOpacity
                style={styles.mapButton}
                onPress={_callCurrentLocation}
              >
                <Ionicons name="location-outline" size={28} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.mapButton} onPress={switchCamera}>
                <Ionicons
                  name="camera-reverse-outline"
                  size={28}
                  color="white"
                />
              </TouchableOpacity>
            </View>
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
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.myTheme,
  },
  headerStatus: {
    fontSize: 15,
    fontWeight: "bold",
    paddingTop: 15,
  },
  headerStatusDis: {
    fontSize: 15,
    fontWeight: "bold",
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
  },
  map: {
    height: 250,
    borderWidth: 1,
    backgroundColor: "#FFF",
    borderRadius: 10,
    overflow: "hidden",
    zIndex: 5,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  mapButton: {
    width: 50,
    height: 50,
    // marginTop: 10,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#fff",
    marginLeft: 10,
  },
  permissionContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CheckInScreen;
