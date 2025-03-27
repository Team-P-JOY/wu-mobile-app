import React, { useCallback, memo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { WebView } from "react-native-webview";
import Background from "../../components/Background";
import TopBar from "../../components/TopBar";
import { Avatar, Card, Button, IconButton  } from 'react-native-paper';
import { sendPushNotifications } from "../../core/notifications";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

// Mock data
const MOCK_TASKS = [
  {
    id: "1",
    title: "อนุมัติลา",
    description: "ตรวจสอบและอนุมัติการลาของพนักงาน",
    subTasks: [
      { id: "1-1", title: "คำขอจาก A", url: "https://example.com/leave-approval-a" },
      { id: "1-2", title: "คำขอจาก B", url: "https://example.com/leave-approval-b" },
    ],
    initiallyVisible: true,
  },
  {
    id: "2",
    title: "อนุมัติแก้ไขเวลา",
    description: "ตรวจสอบและอนุมัติการแก้ไขเวลาทำงาน",
    subTasks: [
      { id: "2-1", title: "คำขอจาก C", url: "https://example.com/time-adjustment-c" },
      { id: "2-2", title: "คำขอจาก D", url: "https://example.com/time-adjustment-d" },
    ],
    initiallyVisible: false,
  },
];

const MOCK_NOTIFICATIONS = [
  { id: "1", title: "อนุมัติการลา", message: "นายณัฐดนัย สุวรรณโชติ ลาพักผ่อน 2 วัน", time: "10 นาทีที่แล้ว", expoToken: "ExponentPushToken[IO6DzaLFeT9jfN3yrlUsaW]" },
  { id: "2", title: "ให้ความเห็นเบื้องต้น", message: "นายฮากิม มูดอ ลาป่วย 1 วัน", time: "30 นาทีที่แล้ว", expoToken: "ExponentPushToken[PAPrjgF07mb8hkFPBCIsH2]" },
];

const sendMessage = (iTitle, iExpoToken) => {
  const title = iTitle;
  const body = "นายณัฐดนัย สุวรรณโชติ ได้" + title;
  sendPushNotifications(iExpoToken, title, body);
};

const TaskList = memo(({ navigation }) => {
const [taskVisibility, setTaskVisibility] = useState(
  MOCK_TASKS.reduce((acc, task) => ({ ...acc, [task.id]: task.initiallyVisible }), {})
);
const [showAll, setShowAll] = useState(false);

const toggleTaskVisibility = useCallback((taskId) => {
  setTaskVisibility(prev => ({
    ...prev,
    [taskId]: !prev[taskId]
  }));
}, []);

  const renderItem = useCallback(({ item }) => {
    if (!showAll && !taskVisibility[item.id]) {
      return null; // ไม่แสดงการ์ดถ้าปิดและไม่ได้เปิด "แสดงทั้งหมด"
    }

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <TouchableOpacity 
            style={styles.titleContainer}
            onPress={() => navigation.navigate("TaskDetail", { task: item })}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Icon name="chevron-right" size={24} color="#007AFF" />
          </TouchableOpacity>
          <Switch
            value={taskVisibility[item.id]}
            onValueChange={() => toggleTaskVisibility(item.id)}
          />
        </View>
        {showAll && (
          <View style={styles.cardContent}>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.subTaskCount}>
              {`${item.subTasks.length} รายการที่ต้องดำเนินการ`}
            </Text>
          </View>
        )}
      </View>
    );
  }, [navigation, taskVisibility, toggleTaskVisibility, showAll]);

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <Text>แสดงทั้งหมด</Text>
        <Switch value={showAll} onValueChange={setShowAll} />
      </View>
      <FlatList
        data={MOCK_TASKS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
});

const NotificationList = memo(() => {
  const renderItem = useCallback(({ item }) => (
    // <View style={styles.card}>
    //   <Text style={styles.title}>{item.title}</Text>
    //   <Text style={styles.description}>{item.message}</Text>
    //   <Text style={styles.time}>{item.time}</Text>
    //   <Button mode="outlined" style={{ marginTop: 8 }}>ดูรายละเอียด</Button>
    // </View>
    <Card style={styles.notificationContainer}>
      <Card.Title
        title={item.title}
        subtitle={item.message}
        left={(props) => <Avatar.Icon {...props} icon="folder" />}
        right={(props) => <Button mode="outlined" style={{ marginRight: 8 }} onPress={() => sendMessage(item.title, item.expoToken)}>อนุมัติ</Button>}
        // right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
      />
    </Card>
  ), []);

  return (
    <FlatList
      data={MOCK_NOTIFICATIONS}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.listContent}
    />
  );
});

const TaskDetail = memo(({ route, navigation }) => {
  const { task } = route.params;

  const renderItem = useCallback(({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("WebViewScreen", { url: item.url })}
    >
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  ), [navigation]);

  return (
    <FlatList
      data={task.subTasks}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.listContent}
    />
  );
});

const WebViewScreen = memo(({ route }) => {
  const { url } = route.params;
  return <WebView source={{ uri: url }} style={styles.webview} />;
});

const NotificationScreen = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarLabelStyle: styles.tabLabel,
      tabBarStyle: styles.tabBar,
      tabBarIndicatorStyle: styles.tabIndicator,
    }}
  >
    <Tab.Screen
      name="งานที่ต้องทำ"
      component={TaskList}
      options={{
        tabBarIcon: ({ color }) => (
          <Icon name="clipboard-text-outline" size={20} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="แจ้งเตือน"
      component={NotificationList}
      options={{
        tabBarIcon: ({ color }) => (
          <Icon name="bell-outline" size={20} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const AppNavigator = () => (
  <Background>
    <TopBar title="แจ้งเตือน" />
    <Stack.Navigator
      screenOptions={{
        cardStyle: styles.cardStyle,
      }}
    >
      <Stack.Screen 
        name="Notification" 
        component={NotificationScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="TaskDetail" 
        component={TaskDetail}
        options={{
          headerTitle: "รายละเอียด",
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Stack.Screen 
        name="WebViewScreen" 
        component={WebViewScreen}
        options={{
          headerTitle: "เว็บไซต์",
          headerTitleStyle: styles.headerTitle,
        }}
      />
    </Stack.Navigator>
  </Background>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  cardStyle: {
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  cardContent: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  title: { 
    fontSize: 18, 
    fontWeight: "600",
    color: '#1a1a1a',
    flex: 1,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  subTaskCount: {
    fontSize: 12,
    color: '#888888',
  },
  time: { 
    fontSize: 12, 
    color: "#888888", 
    marginTop: 8,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    margin: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  webview: {
    flex: 1,
  },
  tabBar: {
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: '#ffffff',
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  tabIndicator: {
    backgroundColor: '#007AFF',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  notificationContainer: {
    marginBottom: 10
  }
});

export default AppNavigator;
