import React, { useState, useEffect, useRef, useContext } from "react";
import { View, StyleSheet, Button } from "react-native";
import { Text, Avatar, Card, Divider } from "react-native-paper";
import { AuthContext } from "../context/AuthContext";
import BackgroundImage from "../components/BackgroundImage";
import QRCode from "react-native-qrcode-svg";
import { theme } from "../core/theme";
import { registerForPushNotifications, sendPushNotifications } from "../core/notifications";

// import * as Device from "expo-device";
// import * as Notifications from "expo-notifications";
// import Constants from "expo-constants";

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

// async function sendPushNotification(expoPushToken) {
//   const message = {
//     to: expoPushToken,
//     sound: 'default',
//     title: "ยินดีตอนรับ",
//     body: 'สวัสดีครับ คุณมีข้อความใหม่จากเรา',
//     data: { data: 'goes here', test: { test1: 'more data' } },
//   };

//   await fetch('https://exp.host/--/api/v2/push/send', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(message),
//   });
// }

// async function registerForPushNotificationsAsync() {
//   let token;

//   if (Platform.OS === 'android') {
//     await Notifications.setNotificationChannelAsync('myNotificationChannel', {
//       name: 'A channel is needed for the permissions prompt to appear',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   if (Device.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     // Learn more about projectId:
//     // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
//     // EAS projectId is used here.
//     try {
//       const projectId =
//         Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
//       if (!projectId) {
//         throw new Error('Project ID not found');
//       }
//       token = (
//         await Notifications.getExpoPushTokenAsync({
//           projectId,
//         })
//       ).data;
//       console.log(token);
//     } catch (e) {
//       token = `${e}`;
//     }
//   } else {
//     alert('Must use physical device for Push Notifications');
//   }

//   return token;
// }

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);
  const [expoPushToken, setExpoPushToken] = useState('');

  useEffect(() => {
    // Get and Set the Push Token
    registerForPushNotifications().then((token) => setExpoPushToken(token));
    console.log('Push Notification Token:', expoPushToken);
  }, []);

  const sendMessage = () => {
    const title = "WU Application";
    const body = 'ยินดีตอนรับ ' + user.fullname_th + " เข้าสู่ระบบ WU Application";
    sendPushNotifications(expoPushToken, title, body);
  };
  

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
          <Text
            variant="bodyLarge"
          >
            {expoPushToken}
          </Text>
        </View>

        {/* <Button
        title="Press to Send a notification"
        onPress={async () => {
          await sendPushNotifications(expoPushToken);
        }}
        /> */}

        <Button
          title="Press to Send a notification"
          onPress={() => sendMessage()}
        />

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
