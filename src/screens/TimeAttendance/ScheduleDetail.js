import React, { useState, useEffect, useContext } from "react";
import Background from "../../components/Background";
import TopBar from "../../components/TopBar";
import { View, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import { Text, List, Switch, Divider } from "react-native-paper";
import { AuthContext } from "../../context/AuthContext";
import { getDatetext } from "../../core/utils";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ScheduleDetail = ({ navigation, route }) => {
  const { id, personId, startDate, shiftId } = route.params; // ดึงค่าจาก params
  const { user } = useContext(AuthContext);

  const [schedule, setSchedule] = useState([]);// ตารางปฏิบัติงาน
  const [timestamp, setTimestamp] = useState([]);// ข้อมูลการลงเวลางาน
  const [loading, setLoading] = useState(true);// สถานะการโหลดข้อมูล

  const [test, setTest] = useState("red");

  const getStyles = (status) => {
    return [
      styles.textStatus,
      status == 0 && styles.textStatusGray,
      status == 1 && styles.textStatusGreen,
      status >= 2 && styles.textStatusRed,
    ].filter(Boolean);
  };

  const statusColor = (status, leaveday) => {
    let color = "textStatusGreen";
    
    // if(leaveday){
    //   //ลางาน
    //   return "yellow";
    // }
    // else{
    //   if(status == 0)
    //     //วันหยุด
    //     color = "white";
    //   else if(status == 1)
    //     //ปกติ
    //     color = "green";
    //   else if(status >= 2)
    //     //ไม่ปกติ
    //     color = "red";
    // }
    return color;
  };

  const getBackgroundColor = (isDarkMode, isError) => {
    isDarkMode ? 'black' : isError ? 'red' : 'white';
  }
    

  const fetchData = () => {
    //if (loading == true) {
      fetch(
        `https://apisprd.wu.ac.th/tal/tal-timework/get-schedule-detail?personId=${user.person_id}&date=${startDate}&shiftId=${shiftId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        if (data.code === 200) {
          setSchedule(data.dtScheduleDetail[0]);
          setTimestamp(data.dtTimestamp);
        }
      });
    //}
  }

  useEffect(() => {
    if(route.params?.id){
      fetchData();
    }
  }, [route.params?.id]);

  // useEffect(() => {
  //   useCallback(() => {
  //     // fetchData();
  //     setLoading(true);
  //   }, [])
    
  //   if (loading == true) {
  //     fetch(
  //       `https://apisprd.wu.ac.th/tal/tal-timework/get-schedule-detail?personId=${user.person_id}&date=${startDate}&shiftId=${shiftId}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         //console.log(data);
  //         if (data.code === 200) {
  //           setSchedule(data.dtScheduleDetail[0]);
            
  //           setLoading(false);
  //         }
          
  //       });
  //   }
  // }, [loading]);

  console.log(schedule);
  //console.log(schedule.find((item) => item.personId === personId)?.personId);
  //console.log(schedule.find((item) => item.personId === personId)?.timeworkId);
  //const x1 = schedule.map(item => item.timeworkId);
  //console.log(x1);
  //console.log(schedule?.timeworkId); // "Jane"

  // const layout = useWindowDimensions();
  // const [index, setIndex] = useState(0);
  // const [routes] = useState([
  //   { key: 'home', title: 'Home' },
  //   { key: 'profile', title: 'Profile' },
  //   { key: 'settings', title: 'Settings' },
  // ]);
  //console.log(id);
  return (
    <Background>
      {/* <TopBar title="ตารางปฏิบัติงาน" /> */}
      <TopBar title="รายละเอียด" back={() => navigation.navigate("Schedule")} />
      <View style={styles.container}>
        <View>
          <Text style={styles.textDate}>{getDatetext(startDate, "th", "l")}</Text>
        </View>
        <View style={styles.containerTime}>
          <View style={styles.box1}>
            <Text>{getDatetext(schedule.dateCheckin, "th", "l")}</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
              <Icon name="login" size={26} color="#32cd32" />
              <Text variant="titleLarge">{schedule.timeCheckin}</Text>
            </View>
          </View>
          <View style={styles.box2}>
            <Text>{getDatetext(schedule.dateCheckout, "th", "l")}</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
              <Icon name="logout" size={26} color="#db2828" />
              <Text variant="titleLarge">{schedule.timeCheckout}</Text>
            </View>
          </View>
        </View>
        {/* <View style={styles.textStatus}>
          <Text  variant="headlineMedium" style={{textAlign: "center", color: "green"}}>{(schedule.statusNameTh) ? schedule.statusNameTh : "-"}</Text>
        </View> */}
        <View>
          <Text  variant="headlineMedium" style={getStyles(schedule.status)}>{(schedule.statusNameTh) ? schedule.statusNameTh : "-"}</Text>
        </View>
        <View style={styles.containnerTitle}>
          <Icon name="av-timer" size={24} color="#fff" />
          <Text variant="titleMedium" style={{color: "#fff"}}> สแกนนิ้ว เข้า/ออก</Text>
        </View>
        <ScrollView>
          <List.Section>
            {timestamp.map((row, index) => (
              <View key={index}>
                <List.Item
                  title={
                    <Text variant="bodyMedium">{"วันที่ " + getDatetext(row.dateCheckin, "th", "l")}</Text>
                  }
                  description={
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <Icon name={row.unitNameFin ? "fingerprint" : "map-marker-radius"} size={22} color="#FA8072" />
                      <Text style={styles.labelShift}>
                        {row.unitNameFin ? row.unitNameFin : row.unitNameGps}
                      </Text>
                    </View>
                  }
                  left={(props) => (
                    <List.Icon
                      {...props}
                      icon={row.checktype === "0" ? "logout" : "login"}
                      color={row.checktype === "0" ? "#db2828" : "#32cd32"}
                    />
                  )}
                  right={(props) => (
                    <Text variant="labelSmall" style={{textAlign: "center", color: "gray"}}>
                      {row.timeCheckin + " น."}
                    </Text>
                  )}
                />
                <Divider />
              </View>
            ))}
          </List.Section>
        </ScrollView>
      </View>
    </Background>
  );
};

export default ScheduleDetail;

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flex: 1,
    padding: 15,
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
  },
  containerTime: {
    flexDirection: "row",
    marginTop: 20,
    // backgroundColor: "#f0f0f0",
  },
  box1: {
    width: "50%", // ขนาดกล่องแต่ละอัน
    height: 100,
    // backgroundColor: "#ff0000",
    justifyContent: "center",
    alignItems: "center",
    // marginBottom: 10,
  },
  box2: {
    width: "50%", // ขนาดกล่องแต่ละอัน
    height: 100,
    // backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    borderLeftColor: "#808080",
    borderLeftWidth: 2,
    // marginBottom: 10,
  },
  textStatus: {
    marginTop: 20,
    textAlign: "center",
    // color: getBackgroundColor(isDarkMode, isError),
    // backgroundColor: "#f0f0f0",
    // backgroundColor: "red",
    // color: "green",
    padding: 10,
    width: "90%",
    // fontSize: 16,
    fontWeight: "bold",
    borderRadius: 50,
    margin: "auto",
  },
  textStatusGreen:{
    color: "white",
    backgroundColor: "green",
  },
  textStatusGray:{
    color: "white",
    backgroundColor: "gray",
  },
  textStatusRed:{
    color: "white",
    backgroundColor: "ref",
  },
  containnerTitle: {
    flexDirection: "row",
    marginTop: 10,
    backgroundColor: "#FF8C00",
    padding: 10
  },
  labelShift: {
    color: "steelblue",
    fontSize: 14,
    marginTop:5,
  },
});
