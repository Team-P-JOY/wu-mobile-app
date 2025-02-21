import React, { useState } from "react";
import Background from "../../components/Background";
import TopBar from "../../components/TopBar";
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { List, Switch, Divider } from "react-native-paper";
import { getDatetext } from "../../core/utils";
// import { TabView, SceneMap, TabBar  } from "react-native-tab-view";

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

// const renderScene = SceneMap({
//   home: FirstRoute,
//   profile: SecondRoute,
//   settings: ThirdRoute,
// });

const ScheduleDetail = ({ navigation, route }) => {
  const { id, personId, startDate } = route.params; // ดึงค่าจาก params
  // const layout = useWindowDimensions();
  // const [index, setIndex] = useState(0);
  // const [routes] = useState([
  //   { key: 'home', title: 'Home' },
  //   { key: 'profile', title: 'Profile' },
  //   { key: 'settings', title: 'Settings' },
  // ]);
  console.log(id);
  return (
    <Background>
      {/* <TopBar title="ตารางปฏิบัติงาน" /> */}
      <TopBar title="รายละเอียด" back={() => navigation.navigate("Schedule")} />
      <View>
        <Text style={styles.textDate}>{getDatetext(startDate, "th", "l")}</Text>
      </View>
    </Background>
  );
};

export default ScheduleDetail;

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
  },
  title: {
    marginBottom: 20,
  },
  textDate:{
    fontSize: 16,
    fontWeight: "bold",
    color: "steelblue",
    textAlign: "center",
    marginTop: 20,
  }
});
