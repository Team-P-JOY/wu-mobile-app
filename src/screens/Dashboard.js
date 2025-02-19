import React, { useRef, useContext } from "react";
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  BackHandler,
  TouchableOpacity,
} from "react-native";
import {
  Appbar,
  Card,
  Button,
  Text,
  Divider,
  useTheme,
  IconButton,
} from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../context/AuthContext";
import BannerSlide from "../components/contents/BannerSlide";
import MenuContent from "../components/contents/MenuContent";

const width = Dimensions.get("window").width;

const Dashboard = ({ navigation }) => {
  const theme = useTheme();
  const { user } = useContext(AuthContext);

  const exitApp = () => {
    BackHandler.exitApp();
  };
  const Notification = () => {
    navigation.navigate("Notification");
  };
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <LinearGradient colors={["#580376", "#6a11cb"]}>
        <Appbar.Header style={{ backgroundColor: "transparent", elevation: 0 }}>
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <Image
              source={require("../assets/logo.png")}
              style={{ width: 40, height: 40, marginRight: 10 }}
              resizeMode="contain"
            />
            <Text style={{ fontSize: 18, color: "#fff" }}>
              {"สวัสดี " + user.fullname_th}
            </Text>
          </View>

          <Appbar.Action icon="bell" onPress={Notification} color="#fff" />
          <Appbar.Action icon="exit-to-app" onPress={exitApp} color="#fff" />
        </Appbar.Header>
      </LinearGradient>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ height: width / 3 }}>
          <BannerSlide />
        </View>
        <View>
          <Card style={{ margin: 10, backgroundColor: "#f8931f" }}>
            <Card.Content>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text variant="headlineMedium" style={{ color: "#ffffff" }}>
                  ประกาศ
                </Text>
              </View>
              <Text variant="titleMedium" style={{ color: "#ffffff" }}>
                ประกาศจาก สำนักงานอธิการบดี แจ้งเพื่อทราบ
              </Text>
            </Card.Content>
          </Card>

          <MenuContent navigation={navigation} />

          <Divider style={{ marginVertical: 10 }} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ padding: 10 }}
          >
            {["ฟรี ป้าย QR", "GrabFood ลด 50%", "บัญชีออมทอง"].map(
              (promo, index) => (
                <Card
                  key={index}
                  style={{
                    marginRight: 10,
                    width: 250,
                    backgroundColor: "#6a11cb",
                  }}
                >
                  <Card.Content>
                    <Text variant="titleLarge" style={{ color: "#fff" }}>
                      {promo}
                    </Text>
                    <Text variant="bodyMedium" style={{ color: "#fff" }}>
                      Card content
                    </Text>
                  </Card.Content>
                  <Card.Actions>
                    <Button mode="elevated">อ่าน</Button>
                  </Card.Actions>
                </Card>
              )
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;
