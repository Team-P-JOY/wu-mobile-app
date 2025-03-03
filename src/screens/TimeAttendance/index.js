import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Main from "./Main";
import Home from "./Home";
import Schedule from "./Schedule";
import ScheduleDetail from "./ScheduleDetail";
import Timestamp from "./Timestamp";
import Leave from "./Leave";

const Tab = createBottomTabNavigator();

export default function TimeAttendanceScreen() {
  return (
    <Tab.Navigator
      tabBar={(props) => null}
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Main" component={Main} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Schedule" component={Schedule} />
      <Tab.Screen name="ScheduleDetail" component={ScheduleDetail} />
      <Tab.Screen name="Timestamp" component={Timestamp} />
      <Tab.Screen name="Leave" component={Leave} />
    </Tab.Navigator>
  );
}