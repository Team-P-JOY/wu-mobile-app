import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Dashboard,
  ProfileScreen,
  SettingsScreen,
  QrScreen,
  WalletScreen,
  NewsScreen,
  TimeAttendanceScreen,
  DevBlockedScreen,
  WelfareScreen,
  NotificationScreen,
  CheckInScreen,
  ChatScreen,
  PinResetScreen,
  WuhcareScreen,
  WebPortalScreen,
} from "../screens";
import FooterBar from "../components/FooterBar";

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <FooterBar {...props} route={props.route} />}
      screenOptions={{
        headerShown: false,
        unmountOnBlur: true,
      }}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="DevBlocked" component={DevBlockedScreen} />
      <Tab.Screen name="Qr" component={QrScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="News" component={NewsScreen} />
      <Tab.Screen name="TimeAttendance" component={TimeAttendanceScreen} />
      <Tab.Screen name="Welfare" component={WelfareScreen} />
      <Tab.Screen name="Notification" component={NotificationScreen} />
      <Tab.Screen name="CheckIn" component={CheckInScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="PinReset" component={PinResetScreen} />
      <Tab.Screen name="Wuhcare" component={WuhcareScreen} />
      <Tab.Screen name="WebPortal" component={WebPortalScreen} />
    </Tab.Navigator>
  );
}
