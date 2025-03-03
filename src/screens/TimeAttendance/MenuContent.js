import { Card, Button, Text, Avatar } from "react-native-paper";
import {
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React from "react";

const MenuContent = ({ navigation }) => {
  const menu = [
    {
      name: "Dashboard",
      desc: "สถิติบันทึกการปฏิบัติงาน",
      screen: "Home",
      icon: "chart-arc",
    },
    {
      name: "ตารางปฏิบัติงาน",
      desc: "สถานะการปฏิบัติงาน",
      screen: "Schedule",
      icon: "calendar-month",
    },
    {
      name: "Timestamp",
      desc: "สแกนนิ้ว เข้า/ออก",
      screen: "Timestamp",
      icon: "calendar-clock",
    },
    {
      name: "บันทึกการลา",
      desc: "สถิติบันทึกการลา",
      screen: "Leave",
      icon: "account-arrow-right",
    },
  ];

  return (
    <View>
      <ScrollView
        horizontal={true} 
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={styles.menuContainer}>
          {menu.map((m, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate(m.screen)
              }
            >
              <View style={styles.menuChild}>
                <Avatar.Icon size={80} icon={m.icon} style={styles.avatarIcon} />
                <Text variant="bodySmall" style={styles.textName}>{m.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    padding: 10, 
    height: "auto", 
    // backgroundColor: "#000",
    // flexGrow: 1
  },
  menuContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    //paddingHorizontal: 10,
    //backgroundColor: "#ff0000",
  },
  menuChild:{
    alignItems: "center", 
    width: 100, 
    //height: 100, 
    // borderRightColor: "#0000ff",
    // borderRightWidth:2,
  },
  avatarIcon: {
    backgroundColor: "#C3A7F4",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  textName:{
    marginTop: 5
  },
});

export default MenuContent;
