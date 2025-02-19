import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import Schedule from "./Schedule";
import Timestamp from "./Timestamp";
import Main from "./Main";

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
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Schedule" component={Schedule} />
      <Tab.Screen name="Timestamp" component={Timestamp} />
      <Tab.Screen name="Main" component={Main} />
    </Tab.Navigator>
  );
}


// import React, { useState } from "react";
// import Background from "../../components/Background";
// import TopBar from "../../components/TopBar";
// import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
// import { TabView, SceneMap, TabBar  } from "react-native-tab-view";
// import Home from "./Home";
// import Schedule from "./Schedule";
// import Timestamp3 from "./Timestamp";

// const styles = StyleSheet.create({
//   scene: { flex: 1, justifyContent: 'center', alignItems: 'center' },
// });

// const FirstRoute = () => {
//   <View style={[styles.scene, { backgroundColor: '#ff4081' }]}>
//     <Text>🏠 Home Screen</Text>
//   </View>
// }

// const SecondRoute = () => {
//   <View style={[styles.scene, { backgroundColor: '#673ab7' }]}>
//     <Text>📄 Profile Screen</Text>
//   </View>
// }

// const ThirdRoute = () => (
//   <View style={[styles.scene, { backgroundColor: '#2196f3' }]}>
//     <Text>⚙️ Settings Screen</Text>
//   </View>
// );

// // const renderScene = SceneMap({
// //   home: Home,
// //   schedule: Schedule,
// //   timestamp: Timestamp,
// // });

// const renderScene = SceneMap({
//   home: FirstRoute,
//   schedule: SecondRoute,
//   timestamp: ThirdRoute,
// });

// const Timestamp = ({ navigation }) => {
//   const layout = useWindowDimensions();
//   const [index, setIndex] = useState(0);
//   const [routes] = useState([
//     { key: 'home', title: 'Home' },
//     { key: 'profile', title: 'Profile' },
//     { key: 'settings', title: 'Settings' },
//   ]);

//   return (
//     <Background>
//       <TopBar title="Timestamp" back={() => navigation.navigate("Schedule")} />
//       {/* <TabView
//         navigationState={{ index, routes }}
//         renderScene={renderScene}
//         onIndexChange={setIndex}
//         initialLayout={{ width: layout.width }}
//         renderTabBar={(props) => (
//           <TabBar
//             {...props}
//             indicatorStyle={{ backgroundColor: 'white' }}
//             style={{ backgroundColor: 'black' }}
//           />
//         )}
//       /> */}
//     </Background>
//   );
// };

// export default Timestamp;

// export default function TimeAttendanceScreen() {
//   const layout = useWindowDimensions();
//   const [index, setIndex] = useState(0);
//   const [routes] = useState([
//     { key: 'home', title: 'Dashboard' },
//     { key: 'schedule', title: 'ตารางปฏิบัติงาน' },
//     { key: 'timestamp', title: 'เช็คอิน' },
//   ]);

//   return (
//     <Background>
//       {/* <TopBar title="Timestamp" back={() => navigation.navigate("Schedule")} /> */}
//       <TopBar title="บันทึกการลงเวลาปฏิบัติงาน" />
//       <TabView
//         navigationState={{ index, routes }}
//         renderScene={renderScene}
//         onIndexChange={setIndex}
//         initialLayout={{ width: layout.width }}
//         renderTabBar={(props) => (
//           <TabBar
//             {...props}
//             indicatorStyle={{ backgroundColor: 'white' }}
//             style={{ backgroundColor: 'black' }}
//           />
//         )}
//       />
//     </Background>
//   );
// }

//V5
// import * as React from 'react';
// import {
//   Animated,
//   View,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar, Text
// } from 'react-native';
// import { TabView, SceneMap } from 'react-native-tab-view';
// import Background from '../../components/Background';
// import TopBar from "../../components/TopBar";

// const FirstRoute = () => (
//   <View style={[styles.container, { backgroundColor: '#ff4081' }]} ><Text>123</Text></View>
// );
// const SecondRoute = () => (
//   <View style={[styles.container, { backgroundColor: '#673ab7' }]} ><Text>456</Text></View>
// );

// export default class TabViewExample extends React.Component {
//   state = {
//     index: 0,
//     routes: [
//       { key: 'first', title: 'First' },
//       { key: 'second', title: 'Second' },
//     ],
//   };

//   _handleIndexChange = (index) => this.setState({ index });

//   _renderTabBar = (props) => {
//     const inputRange = props.navigationState.routes.map((x, i) => i);

//     return (
//       <View style={styles.tabBar}>
//         {props.navigationState.routes.map((route, i) => {
//           const opacity = props.position.interpolate({
//             inputRange,
//             outputRange: inputRange.map((inputIndex) =>
//               inputIndex === i ? 1 : 0.5
//             ),
//           });

//           return (
//             <TouchableOpacity
//               style={styles.tabItem}
//               onPress={() => this.setState({ index: i })}>
//               <Animated.Text style={{ opacity }}>{route.title}</Animated.Text>
//             </TouchableOpacity>
//           );
//         })}
//       </View>
//     );
//   };

//   _renderScene = SceneMap({
//     first: FirstRoute,
//     second: SecondRoute,
//   });

//   render() {
//     return (
//       <Background>
//         {/* <TopBar title="Timestamp" back={() => navigation.navigate("Schedule")} /> */}
//         <TopBar2 title="แจ้งเตือน" />
//       <TabView
//         navigationState={this.state}
//         renderScene={this._renderScene}
//         renderTabBar={this._renderTabBar}
//         onIndexChange={this._handleIndexChange}
//       />
//       </Background>
      
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   tabBar: {
//     flexDirection: 'row',
//     paddingTop: StatusBar.currentHeight,
//   },
//   tabItem: {
//     flex: 1,
//     alignItems: 'center',
//     padding: 16,
//   },
// });


// const TopBar2 = ({ title }) => (
//   <View style={{ padding: 15, backgroundColor: '#6200ee' }}>
//     <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
//   </View>
// );


