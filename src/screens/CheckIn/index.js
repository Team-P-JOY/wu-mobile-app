import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { CameraView, Camera } from 'expo-camera';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

const CheckInScreen = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(null);
  const cameraRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [cameraType, setCameraType] = useState('back'); // ✅ ใช้ state เก็บกล้องที่ใช้งานอยู่

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();

      setHasCameraPermission(cameraStatus === 'granted');
      setHasLocationPermission(locationStatus === 'granted');

      if (locationStatus === 'granted') {
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
    return <View style={styles.permissionContainer}><Text>กำลังขอสิทธิ์...</Text></View>;
  }
  if (!hasCameraPermission) {
    return <View style={styles.permissionContainer}><Text>❌ ไม่ได้รับสิทธิ์ใช้กล้อง</Text></View>;
  }
  if (!hasLocationPermission) {
    return <View style={styles.permissionContainer}><Text>❌ ไม่ได้รับสิทธิ์ใช้ GPS</Text></View>;
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhoto(photo.uri);
    }
  };

  // ✅ ฟังก์ชันสลับกล้อง
  const switchCamera = () => {
    setCameraType((prevType) => (prevType === 'back' ? 'front' : 'back'));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {currentTime.toLocaleDateString('th-TH', { day: '2-digit', month: 'long', year: 'numeric' })}  
          เวลา {currentTime.toLocaleTimeString('th-TH')}
        </Text>
      </View>

      <View style={styles.content}>
        {!photo ? (
          <CameraView style={styles.camera} cameraType={cameraType} ref={cameraRef}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                <Text style={styles.buttonText}>📸 ถ่ายรูป</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.switchButton} onPress={switchCamera}>
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

        {location ? (
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
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F5F5F5' },
  header: { padding: 10, backgroundColor: '#DDA8A8', width: '100%', alignItems: 'center' },
  headerText: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  content: { flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' },
  camera: { width: '90%', height: 300, borderRadius: 10, overflow: 'hidden', marginBottom: 10 },
  buttonContainer: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', marginBottom: 20 },
  captureButton: { backgroundColor: '#FFF', padding: 10, marginHorizontal: 10, borderRadius: 5 },
  switchButton: { backgroundColor: '#FFD700', padding: 10, marginHorizontal: 10, borderRadius: 5 },
  buttonText: { fontSize: 16, fontWeight: 'bold' },
  imageContainer: { alignItems: 'center', marginBottom: 10 },
  image: { width: 300, height: 200, borderRadius: 10 },
  map: { width: '90%', height: 300, marginTop: 10, borderRadius: 10 },
  permissionContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default CheckInScreen;
