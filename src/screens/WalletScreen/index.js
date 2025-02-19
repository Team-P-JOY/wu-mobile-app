import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WalletMain from "./Main";
import WalletMain2 from "./Main2";

const Tab = createBottomTabNavigator();

export default function WalletScreen() {
  return (
    <Tab.Navigator
      tabBar={(props) => null}
      initialRouteName="Wallet1"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Wallet1" component={WalletMain} />
      <Tab.Screen name="Wallet2" component={WalletMain2} />
    </Tab.Navigator>
  );
}
