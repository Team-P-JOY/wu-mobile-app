import { Card, Button, Text } from "react-native-paper";
import {
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React from "react";

const WebPortalContext = ({ navigation }) => {
  const menu = [
    {
      name: "HRMS",
      desc: "ระบบสารสนเทศบริหารงานบุคคล : มหาวิทยาลัยวลัยลักษณ์",
      url: "https://hrms.wu.ac.th/",
    },
    {
      name: "WU STMS",
      desc: "ระบบสารสนเทศบริการนักศึกษา : มหาวิทยาลัยวลัยลักษณ์",
      url: "https://stms.wu.ac.th/",
    },
    {
      name: "ระบบเลือกตั้ง",
      desc: "ระบบเลือกตั้ง มหาวิทยาลัยวลัยลักษณ์",
      url: "https://vote.wu.ac.th/",
    },
    {
      name: "Sponsorship",
      desc: "สนใจพื้นที่โฆษณา หรือ สปอนเซอร์กิจกรรม",
      url: "https://event.wu.ac.th/",
    },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ padding: 10 }}
    >
      {menu.map((m, index) => (
        <Card
          key={index}
          style={{
            marginRight: 10,
            width: 250,
            backgroundColor: "#6a11cb",
          }}
        >
          <Card.Content>
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate("WebPortal", { name: m.name, url: m.url })
              }
            >
              <Text variant="titleLarge" style={{ color: "#fff" }}>
                {m.name}
              </Text>
              <Text variant="bodyMedium" style={{ color: "#fff" }}>
                {m.desc}
              </Text>
            </TouchableOpacity>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    zIndex: 10,
  },
});

export default WebPortalContext;
