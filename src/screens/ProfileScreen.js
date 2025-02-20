import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Avatar, Card, Divider } from "react-native-paper";
import { AuthContext } from "../context/AuthContext";
import BackgroundImage from "../components/BackgroundImage";
import QRCode from "react-native-qrcode-svg";
import { theme } from "../core/theme";

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <BackgroundImage>
      {/* <TopBar title="โปรไฟล์" back={() => navigation.navigate("Dashboard")} /> */}
      <View
        style={{
          flex: 1,
          padding: 5,
          paddingTop: 50,
          width: "100%",
          alignSelf: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.profileSection}>
          <Avatar.Image
            size={120}
            style={styles.avatar}
            source={{ uri: user?.avatar || "https://i.pravatar.cc/150?img=3" }}
          />
          <Text
            variant="headlineMedium"
            style={[styles.name, { color: theme.colors.myTheme }]}
          >
            {user?.fullname_th}
          </Text>
          <Text
            variant="bodyLarge"
            style={[styles.email, { color: theme.colors.myTheme }]}
          >
            {user?.fullname_en}
          </Text>
        </View>

        <Card
          mode="outlined"
          style={[styles.card, { borderColor: theme.colors.myTheme }]}
        >
          <Card.Content>
            <Text variant="bodyLarge" style={{ color: theme.colors.myTheme }}>
              {user?.position_th || "ไม่มีตำแหน่ง"}
            </Text>
            <Text variant="bodyLarge" style={{ color: theme.colors.myTheme }}>
              {user?.division_th || "ไม่มีหน่วยงาน"}
            </Text>
            <View
              style={{
                paddingVertical: 15,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  padding: 10,
                  backgroundColor: theme.colors.background,
                  borderRadius: 10,
                }}
              >
                <QRCode
                  value={user.person_id}
                  size={250}
                  backgroundColor={theme.colors.background}
                  color={theme.colors.myTheme}
                  // logo={require("../assets/logo.png")}
                  // logoSize={50}
                />
              </View>
            </View>

            <Text style={[styles.token, { color: theme.colors.onPrimary }]}>
              {user?.token || "ไม่มี Token"}
            </Text>
          </Card.Content>
        </Card>
      </View>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
  avatar: {
    marginVertical: 20,
  },
  card: {
    width: "100%",
    marginBottom: 20,

    backgroundColor: "transparent",
  },
  button: {
    width: "80%",
  },
  profileSection: {
    alignItems: "center",

    marginBottom: 20,
  },
  name: {
    fontWeight: "bold",
    marginTop: 10,
  },
  email: {
    marginTop: 5,
    // color: "gray",
  },
  token: {
    fontSize: 8,
    alignSelf: "flex-end",
    marginTop: 5,
    color: "gray",
  },
});
