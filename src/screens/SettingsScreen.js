import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { List, Switch, Divider } from "react-native-paper";
import { AuthContext } from "../context/AuthContext";
import TopBar from "../components/TopBar";
import Background from "../components/Background";
import {version} from '../../package.json';

export default function SettingsScreen({ navigation }) {
  const { logout, isDarkMode, setDarkMode } = useContext(AuthContext);

  return (
    <Background>
      <TopBar title="ตั้งค่า" />
      <List.Section style={styles.container}>
        <List.Item
          title="เปลี่ยน PIN"
          description="ตั้งค่า PIN ใหม่"
          left={(props) => (
            <List.Icon {...props} icon="key-outline" color="#6a11cb" />
          )}
          onPress={() => navigation.navigate("PinReset")}
        />
        <Divider />
        <List.Item
          title="เปิดใช้งาน Dark Mode"
          description="เปิดใช้งาน Dark Mode สำหรับแอปพลิเคชัน"
          left={(props) => (
            <List.Icon {...props} icon="theme-light-dark" color="#6a11cb" />
          )}
          right={() => (
            <Switch
              value={isDarkMode}
              onValueChange={() => setDarkMode(!isDarkMode)}
            />
          )}
        />
        <Divider />
        <List.Item
          title="Developer Mode"
          description="ตรวจสอบหมวดนักพัฒนา"
          left={(props) => (
            <List.Icon
              {...props}
              icon="application-brackets-outline"
              color="#6a11cb"
            />
          )}
          onPress={() => navigation.navigate("DevBlocked")}
        />
        <Divider />
        <List.Item
          title="ออกจากระบบ"
          description="กลับไปหน้า Login"
          left={(props) => (
            <List.Icon {...props} icon="logout" color="#6a11cb" />
          )}
          onPress={logout}
        />
        <Divider />
        <List.Item
          title="Version"
          description={"เวอร์ชั่น: " + version}
        />
      </List.Section>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
  },
  title: {
    marginBottom: 20,
  },
});
