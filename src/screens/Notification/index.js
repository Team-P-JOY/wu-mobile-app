import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import Background from "../../components/Background";
import TopBar from "../../components/TopBar";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const tasks = [
  {
    id: "1",
    title: "งานที่ต้องทำ 1",
    description: "รายละเอียดงานที่ต้องทำ",
    time: "วันนี้",
    url: "https://example.com/task1",
  },
  {
    id: "2",
    title: "งานที่ต้องทำ 2",
    description: "รายละเอียดงานที่ต้องทำ",
    time: "พรุ่งนี้",
    url: "https://example.com/task2",
  },
];

const notifications = [
  {
    id: "1",
    type: "message",
    title: "คุณมีข้อความใหม่จาก Anserene",
    message: "สวัสดีค่ะ พรุ่งนี้ไปเที่ยวกันมั้ย?",
    time: "2 นาทีที่แล้ว",
    unread: true,
  },
  {
    id: "2",
    type: "group",
    title: 'มีคนส่งข้อความในกลุ่ม "เพื่อน ม.ปลาย"',
    message: "เจอกันพรุ่งนี้นะ!",
    time: "10 นาทีที่แล้ว",
    unread: false,
  },
  {
    id: "3",
    type: "system",
    title: "อัปเดตใหม่! เพิ่มฟีเจอร์แจ้งเตือน",
    message: "คลิกเพื่อดูรายละเอียด",
    time: "1 ชั่วโมงที่แล้ว",
    unread: false,
  },
];

const chats = [
  {
    id: "1",
    title: "Anserene",
    lastMessage: "พรุ่งนี้ไปเที่ยวกันมั้ย?",
    time: "2 นาทีที่แล้ว",
  },
  {
    id: "2",
    title: "กลุ่ม เพื่อน ม.ปลาย",
    lastMessage: "เจอกันพรุ่งนี้นะ!",
    time: "10 นาทีที่แล้ว",
  },
];

const TaskList = ({ navigation }) => (
  <FlatList
    data={tasks}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("WebViewScreen", { url: item.url })}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon
            name="bell-outline"
            size={20}
            color="#6200ee"
            style={{ marginRight: 5 }}
          />
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <Text>{item.description}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </TouchableOpacity>
    )}
  />
);

const NotificationList = ({ navigation }) => (
  <FlatList
    data={notifications}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <TouchableOpacity
        style={[styles.card, item.unread && styles.unread]}
        onPress={() =>
          navigation.navigate("NotificationDetail", { notification: item })
        }
      >
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.message}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </TouchableOpacity>
    )}
  />
);

const ChatList = () => (
  <FlatList
    data={chats}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <View style={styles.card}>
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.lastMessage}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    )}
  />
);

const WebViewScreen = ({ route }) => {
  const { url } = route.params;
  return <WebView source={{ uri: url }} />;
};

const NotificationScreen = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="งานที่ต้องทำ"
      component={TaskList}
      options={{
        tabBarIcon: ({ color }) => (
          <View>
            <Icon name="clipboard-text-outline" size={20} color={color} />
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="แจ้งเตือน"
      component={NotificationList}
      options={{
        tabBarIcon: ({ color }) => (
          <View>
            <Icon name="bell-outline" size={20} color={color} />
            {notifications.filter((n) => n.unread).length > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {notifications.filter((n) => n.unread).length}
                </Text>
              </View>
            )}
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="แชท"
      component={ChatList}
      options={{
        tabBarIcon: ({ color }) => (
          <View>
            <Icon name="message-outline" size={20} color={color} />
            {chats.length > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{chats.length}</Text>
              </View>
            )}
          </View>
        ),
      }}
    />
  </Tab.Navigator>
);

const AppNavigator = ({ navigation }) => (
  <Background>
    <TopBar title="แจ้งเตือน" back={() => navigation.navigate("Dashboard")} />
    <Stack.Navigator>
      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
    </Stack.Navigator>
  </Background>
);

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    right: -9,
    top: -9,
    backgroundColor: "red",
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  card: {
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginVertical: 5,
  },
  unread: { backgroundColor: "#e0f7fa" },
  title: { fontSize: 16, fontWeight: "bold" },
  time: { fontSize: 12, color: "#888", marginTop: 5 },
});

export default AppNavigator;
