import React, { useContext, useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList
} from "react-native";
import {
  Avatar,
  Card,
  IconButton,
  Button,
  List,
  Divider,
  Text
} from "react-native-paper";
import Background from "../../components/Background";
import TopBar from "../../components/TopBar";
import { AuthContext } from "../../context/AuthContext";
import { getDatetext } from "../../core/utils";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuContent from "./MenuContent";

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  text: {
    fontSize: 18,
  },
  dropdownMonth: {
    marginBottom: "10",
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
    flexDirection: "row", // จัดเรียง text ในแนวนอน
    //justifyContent: 'center', // จัดให้อยู่ตรงกลาง
    //alignItems: 'left',
  },
  labelShift: {
    color: "steelblue",
    fontSize: 14,
  },
  labelClockIn: {
    color: "#32cd32",
    width: "120",
    fontSize: 16,
    // marginLeft: 2
  },
  labelClockOut: {
    color: "#db2828",
    width: "120",
    fontSize: 16,
  },
  textLastUpdate: {
    color: "lightgray",
    fontSize: 12,
    textAlign: "right",
    marginTop:10
  },
  containnerTitle: {
    flexDirection: "row",
    marginTop: 10,
    backgroundColor: "#FF8C00",
    padding: 10
  },
  textName: {
    fontSize: 18,
    color: "#696969"
  },
  textWorkTotal:{
    color: "#FF8C00",
    fontWeight: "bold",
  },
  textWork1: {
    color: "#000",
    fontWeight: "bold",
  }
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

const Home = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  console.log("user", user);

  let curDate = new Date();
  let curMonth = curDate.getMonth() + 1;
  let curYear = curDate.getFullYear() + 543;
  let monthly = curMonth < 10 ? "0" + curMonth : curMonth;
  monthly = monthly + "-" + curYear;
  const [optionMonth, setOptionMonth] = useState([]);
  const [month, setMonth] = useState(monthly);
  const [shift, setShift] = useState([]);
  const [lastUpdate, setLastUpdate] = useState("");
  const [workTotal, setWorkTotal] = useState(0);
  const [work1, setWork1] = useState(0);
  const [loading, setLoading] = useState(true);
  const [workList, setWorkList] = useState([]);

  const initSelectMonth = () => {
    fetch(
      `https://apisprd.wu.ac.th/tal/tal-timework/${user.person_id}/getWorkmonth`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.code === 200) {
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
          for (var i = 0; i < data.dtMonth.length; i++) {
            var row = data.dtMonth[i];
            arr.push({
              label: row.monthName,
              value: row.monthVal,
            });
          }
          setOptionMonth(arr);
        }
      });
  };

  useEffect(() => {
    if (loading == true) {
      //initSelectMonth();
      // console.log(month);
      fetch(
        `https://apisprd.wu.ac.th/tal/tal-timework/${user.person_id}/2568/getTimeworkSummary`,
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
          setLastUpdate(data.lastUpdate);
          let workTotal = 0; // วันทำการ
          let w1 = 0; //วันทำงาน
          let w2 = 0; //มาสาย
          let w3 = 0; //ออกก่อน
          let w4 = 0; //มาสาย/ออกก่อน
          let w5 = 0; //ไม่ลงเวลาเข้า
          let w6 = 0; //ไม่ลงเวลาออก
          let w7 = 0; //ขาดงาน
          for (var i = 0; i < data.dtTimeworkSummary.length; i++) {
            var row = data.dtTimeworkSummary[i];
            workTotal += parseInt(row.workTotal);
            w1 += parseFloat(row.w1);
            w2 += parseFloat(row.w2);
            w3 += parseFloat(row.w3);
            w4 += parseFloat(row.w4);
            w5 += parseFloat(row.w5);
            w6 += parseFloat(row.w6);
            w7 += parseFloat(row.w7);
          }
          console.log("workTotal", workTotal);
          setWorkTotal(workTotal);
          setWork1(w1);
          const newWorkList = [
            { id: "2", name: "มาสาย", value: w2 },
            { id: "3", name: "ออกก่อน", value: w3 },
            { id: "4", name: "มาสาย/ออกก่อน", value: w4 },
            { id: "5", name: "ไม่ลงเวลาเข้า", value: w5 },
            { id: "6", name: "ไม่ลงเวลาออก", value: w6 },
            { id: "7", name: "ขาดงาน", value: w7 },
          ];
          setWorkList(newWorkList);
          setLoading(false);
        }
      });
    }
  });

  const handleSelect = (e) => {
    setLoading(true);
    setMonth(e);
    console.log(e);
  };

  const Notification = () => {
    navigation.navigate("Notification");
  };

  return (
    <Background>
      {/* Header session */}
      <TopBar
        title="Dashboard"
        // right={() => navigation.navigate("Main")}
        // rightIcon="menu"
      />

      {/* Menu */}
      <MenuContent navigation={navigation} />
      
      {/* Body session */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <View>
            <Card>
              <Card.Content>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text variant="titleLarge">จำนวนวันทำการ</Text>
                  <Text variant="titleLarge"  style={styles.textWorkTotal}>{workTotal}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                  <Text variant="bodyMedium" >จำนวนวันทำงาน</Text>
                  <Text variant="bodyMedium" style={styles.textWork1}>{work1}</Text>
                </View>
                
                {/* <Text variant="bodyMedium">{user && <Text>{user.person_id}</Text>}</Text> */}
              </Card.Content>
            </Card>
            <View style={styles.containnerTitle}>
              <Icon name="av-timer" size={24} color="#fff" />
              <Text variant="titleMedium" style={{color: "#fff"}}> สรุปการปฏิบัติงาน</Text>
            </View>
            <List.Section>
              {workList.map((row, index) => (
                <View key={index}>
                  <List.Item
                    title={
                      <Text style={styles.textName}>
                        {row.name}
                      </Text>
                    }
                    description={
                      <View>
                        <Text></Text>
                      </View>
                    }
                    right={(props) => (
                      <View style={{ textAlign: "center" }}>
                        <Avatar.Text size={50} label={row.value} />
                      </View>
                    )}
                    // style={styles.listShift}
                  />
                  <Divider />
                </View>
              ))}
            </List.Section>
            <Text style={styles.textLastUpdate}>{lastUpdate}</Text>
          </View>
        )}
      </ScrollView>
      {/* <View style={styles.container2}>
        <View style={styles.box2}>
          <Text style={styles.text2}>1</Text>
        </View>
        <View style={styles.box2}>
          <Text style={styles.text2}>2</Text>
        </View>
        <View style={styles.box2}>
          <Text style={styles.text2}>3</Text>
        </View>
        <View style={styles.box2}>
          <Text style={styles.text2}>4</Text>
        </View>
      </View> */}
    </Background>
  );
};

export default Home;
