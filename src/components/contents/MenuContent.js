import { View, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import {
  Checkin,
  TimeAttendance,
  Welfare,
  Notify,
  Reward,
  Gift,
  Chat,
  Wuhcare,
} from "../svg";
import React from "react";

const MenuContent = ({ navigation }) => {
  const menu = [
    {
      icon: "map-marker",
      label: "เช็คอิน",
      screen: "CheckIn",
      svg: Checkin,
    },
    {
      icon: "google",
      label: "เวลาการทำงาน",
      screen: "TimeAttendance",
      svg: TimeAttendance,
    },
    {
      icon: "wallet",
      label: "สวัสดิการ",
      screen: "Welfare",
      svg: Welfare,
    },
    {
      icon: "clipboard-text",
      label: "แจ้งเตือน",
      screen: "Notification",
      svg: Notify,
    },
    { icon: "gift", label: "WUH Care", screen: "Wuhcare", svg: Wuhcare },

    {
      icon: "ticket",
      label: "คุยกับเรา",
      screen: "Chat",
      svg: Chat,
    },
  ];
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 10,
      }}
    >
      {menu.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate(item.screen)}
          style={{
            width: "30%",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <item.svg width={50} height={50} />
          <Text variant="bodyMedium">{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default MenuContent;
