import { View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import { Home, News, User, Setting, Scan } from "./svg";
import { LinearGradient } from "expo-linear-gradient";

const FooterBar = ({ state, descriptors, navigation }) => {
  const currentRouteName = state.routes[state.index].name;
  const ignoreScreens = ["Chat", "CheckIn", "PinReset"];
  if (ignoreScreens.includes(currentRouteName)) {
    return null;
  }

  const menuItems = [
    { icon: "home", label: "หน้าหลัก", screen: "Dashboard", svg: Home },
    { icon: "newspaper", label: "ข่าวสาร", screen: "News", svg: News },
    { icon: "qrcode-scan", label: "สแกน", screen: "Qr", svg: Scan },
    { icon: "account-circle", label: "โปรไฟล์", screen: "Profile", svg: User },
    { icon: "cog", label: "ตั้งค่า", screen: "Settings", svg: Setting },
  ];

  return (
    <LinearGradient
      // colors={["#580376"]}
      colors={["#6a11cb", "#6a11cb", "#6a11b0"]}
    >
      <View
        // style={[styles.footerBar, { backgroundColor: theme.colors.background }]}
        style={styles.footerBar}
      >
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(item.screen)}
            style={styles.menuItem}
          >
            {/* <MaterialCommunityIcons
            name={item.icon}
            size={28}
            color={currentScreen === item.screen ? "blue" : "gray"}
          /> */}
            <item.svg width={36} height={36} />

            <Text style={styles.menuLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  footerBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    paddingBottom: 15,
    // backgroundColor: "#580376",
    width: "100%",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  menuItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  menuLabel: {
    color: "#ffffff",
    fontSize: 12,
    marginTop: 2,
  },
});

export default FooterBar;
