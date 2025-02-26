import React, { useState, useContext } from "react";
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  BackHandler,
  TouchableOpacity,
  RefreshControl,
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
import WebPortalContext from "../components/contents/WebPortalContext";

const width = Dimensions.get("window").width;

const Dashboard = ({ navigation }) => {
  const theme = useTheme();
  const { user } = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);

  const exitApp = () => {
    BackHandler.exitApp();
  };
  const Notification = () => {
    navigation.navigate("Notification");
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <LinearGradient colors={["#6a11b0", "#6a11cb"]}>
        <Appbar.Header style={{ backgroundColor: "transparent", elevation: 0 }}>
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <Image
              source={require("../assets/logo.png")}
              style={{ width: 40, height: 40, marginRight: 10 }}
              resizeMode="contain"
            />
            <Text style={{ fontSize: 18, color: "#fff" }}>
              {"สวัสดี, " + user?.fullname_th}
            </Text>
          </View>

          <Appbar.Action icon="exit-to-app" onPress={exitApp} color="#fff" />
        </Appbar.Header>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ height: width / 2.3 }}>
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
          <WebPortalContext navigation={navigation} user={user} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;
