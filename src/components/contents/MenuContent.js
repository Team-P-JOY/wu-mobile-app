import { View, Text, TouchableOpacity } from "react-native";
import { Checkin, TimeAttendance, Welfare, Notify, Reward, Gift } from "../svg";
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
    {
      icon: "gift",
      label: "แลกรางวัล",
      screen: "Mission",
      svg: Reward,
    },
    {
      icon: "ticket",
      label: "โปรโมชั่น",
      screen: "Mission",
      svg: Gift,
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
          {/* <IconButton icon={item.icon} size={40} /> */}
          <item.svg width={50} height={50} />
          <Text>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default MenuContent;
