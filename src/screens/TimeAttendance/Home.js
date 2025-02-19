import React, { useContext, useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { Avatar, Card, IconButton, Button, List, Divider } from 'react-native-paper';
import { Dropdown } from 'react-native-paper-dropdown';
import Background from "../../components/Background";
import TopBar from "../../components/TopBar";
import { AuthContext } from "../../context/AuthContext";
import { getDatetext } from "../../core/utils";

const styles = StyleSheet.create({
  container: {
    flex: 1, // Makes the container take up the full screen
    padding: 15
  },
  text: { 
    fontSize: 18 
  },
  dropdownMonth: {
    marginBottom: "10"
  },
  listShift: {
    // borderBottomColor: "#ccc",
    // borderBottomWidth: 2
  },
  iconStatus: {
    width: "20",
    height: "20",
  },
  labelDate: {
    color: "gray",
    fontSize: "14",
  },
  textStatus: {
    textAlign: "center",
    color: "gray",
    fontSize: "12",
  },
  container2: {
    flexDirection: "row",
    flexWrap: "wrap", // ทำให้ไปขึ้นบรรทัดใหม่อัตโนมัติ
    justifyContent: "space-around",
    padding: 10,
  },
  box2: {
    width: "45%", // ขนาดกล่องแต่ละอัน
    height: 100,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  text2: {
    color: "white",
    fontSize: 18,
  },
  containerTime: {
    flexDirection: 'row', // จัดเรียง text ในแนวนอน
    //justifyContent: 'center', // จัดให้อยู่ตรงกลาง
    //alignItems: 'left',
  },
  labelShift: {
    color: 'steelblue', 
    fontSize: 14, 
  },
  labelClockIn: { 
    color: '#32cd32', 
    width: '120',
    fontSize: 16, 
    // marginLeft: 2 
  },
  labelClockOut: { 
    color: '#db2828', 
    width: '120',
    fontSize: 16 
  },
});

// const optionMonth = [
//   { label: 'ธันวาคม 2567', value: '12-2567' },
//   { label: 'มกราคม 2568', value: '01-2568' },
//   { label: 'กุมภาพันธ์ 2568', value: '02-2568' },
//   { label: 'มีนาคม 2568', value: '03-2568' },
//   { label: 'เมษายน 2568', value: '04-2568' },
//   { label: 'พฤษภาคม 2568', value: '05-2568' },
//   { label: 'มิถุนายน 2568', value: '06-2568' },
//   { label: 'กรกฎาคม 2568', value: '07-2568' },
//   { label: 'สิงหาคม 2568', value: '08-2568' },
//   { label: 'กันยายน 2568', value: '09-2568' },
//   { label: 'ตุลาคม 2568', value: '10-2568' },
//   { label: 'พฤษจิกายน 2568', value: '11-2568' },
//   { label: 'ธันวาคม 2568', value: '12-2568' },
// ];

const statusColor = (status, leaveday) => {
  let color = "white";
  
  if(leaveday){
    //ลางาน
    return "yellow";
  }
  else{
    if(status == 0)
      //วันหยุด
      color = "white";
    else if(status == 1)
      //ปกติ
      color = "green";
    else if(status >= 2)
      //ไม่ปกติ
      color = "red";
  }
  return color;
};

const Home = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  console.log("user", user);

  let curDate = new Date();
  let curMonth = curDate.getMonth() + 1;
  let curYear = curDate.getFullYear() + 543;
  let monthly = curMonth < 10 ? "0" + curMonth : curMonth;
  monthly = monthly + "-" + curYear
  console.log("this month " + monthly);
  const [optionMonth, setOptionMonth] = useState([]);
  const [month, setMonth] = useState(monthly);
  const [shift, setShift] = useState([]);
  const [loading, setLoading] = useState(true);

  const initSelectMonth = () => {
    fetch(`https://apisprd.wu.ac.th/tal/tal-timework/${user.person_id}/getWorkmonth`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if(data.code === 200){
        //V1
        // let arr = [];
        // arr.push(
        //   { label: 'ธันวาคม 2567', value: '12-2567' },
        //   { label: 'มกราคม 2568', value: '01-2568' },
        //   { label: 'กุมภาพันธ์ 2568', value: '02-2568' },
        //   { label: 'มีนาคม 2568', value: '03-2568' },
        //   { label: 'เมษายน 2568', value: '04-2568' },
        //   { label: 'พฤษภาคม 2568', value: '05-2568' },
        //   { label: 'มิถุนายน 2568', value: '06-2568' },
        //   { label: 'กรกฎาคม 2568', value: '07-2568' },
        //   { label: 'สิงหาคม 2568', value: '08-2568' },
        //   { label: 'กันยายน 2568', value: '09-2568' },
        //   { label: 'ตุลาคม 2568', value: '10-2568' },
        //   { label: 'พฤษจิกายน 2568', value: '11-2568' },
        //   { label: 'ธันวาคม 2568', value: '12-2568' },
        // );
        // setOptionMonth(arr);

        //V2
        let arr = [];
        for(var i = 0; i < data.dtMonth.length; i++){
          var row = data.dtMonth[i];
          arr.push({
            label: row.monthName,
            value: row.monthVal,
          });
        }
        setOptionMonth(arr);
      }
    })
  }

  useEffect(() => {
    if(loading == true){
      initSelectMonth();
      console.log(month);
      fetch(`https://apisprd.wu.ac.th/tal/tal-timework/get-schedule?personId=${user.person_id}&month=${month}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if(data.code === 200){
          setShift(data.dtSchedule);
          setLoading(false);
        }
      })
    }
  });

  const handleSelect = (e) => {
    setLoading(true);
    setMonth(e);
    console.log(e);
  }

  const Notification = () => {

    navigation.navigate("Notification");
  };

  return (
    <Background>
      {/* Header session */}
      <TopBar title="Dashboard" right={() => navigation.navigate("Main")} rightIcon="menu" />

      {/* Body session */}
      <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 50}}>
        {
          (loading 
            ? <ActivityIndicator size="large" color="blue" /> 
            : <View>
                <Card>
                  <Card.Content>
                    <Text>Card title</Text>
                    <Text>{user && <Text>{user.person_id}</Text>}</Text>
                  </Card.Content>
                </Card>
            </View>)
        }
      </ScrollView>
      <View style={styles.container2}>
        <View style={styles.box2}><Text style={styles.text2}>1</Text></View>
        <View style={styles.box2}><Text style={styles.text2}>2</Text></View>
        <View style={styles.box2}><Text style={styles.text2}>3</Text></View>
        <View style={styles.box2}><Text style={styles.text2}>4</Text></View>
      </View>
    </Background>
  );
};

export default Home;
