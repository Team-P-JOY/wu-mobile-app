import React, { useContext, useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Text, List, Divider, Menu, Button } from "react-native-paper";
import Background from "../../components/Background";
import TopBar from "../../components/TopBar";
import { AuthContext } from "../../context/AuthContext";
import { getDatetext } from "../../core/utils";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuContent from "./MenuContent";

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

const Schedule = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  console.log("user", user);

  let curDate = new Date();
  let curMonth = curDate.getMonth() + 1;
  let curYear = curDate.getFullYear() + 543;
  let monthly = curMonth < 10 ? "0" + curMonth : curMonth;
  monthly = monthly + "-" + curYear;
  console.log("this month " + monthly);

  const [optionMonth, setOptionMonth] = useState([]);
  const [month, setMonth] = useState(monthly);
  const [timestamp, setTimestamp] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ State ควบคุมการเปิด/ปิด Menu
  const [menuVisible, setMenuVisible] = useState(false);

  // ✅ ฟังก์ชันเปิด-ปิด Menu
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

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
      initSelectMonth();
      fetch(
        `https://apisprd.wu.ac.th/tal/tal-timework/get-timestamp?personId=${user.person_id}&month=${month}`,
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
            setTimestamp(data.dtTimestamp);
            setLoading(false);
          }
        });
    }
  }, [loading]);

  const handleSelect = (value) => {
    setLoading(true);
    setMonth(value);
    closeMenu();
  };

  return (
    <Background>
      {/* Header session */}
      <TopBar 
        title="สแกนนิ้ว เข้า/ออก" 
        // right={() => navigation.navigate("Main")} 
        // rightIcon="menu" 
      />

      {/* Menu */}
      <MenuContent navigation={navigation} />

      {/* ✅ เปลี่ยน Dropdown เป็น Menu */}
      <View style={styles.dropdownMonth}>
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <Button mode="outlined" onPress={openMenu}>
              เลือกเดือน:{" "}
              {optionMonth.find((m) => m.value === month)?.label ||
                "กรุณาเลือกเดือน"}
            </Button>
          }
        >
          {optionMonth.map((item, index) => (
            <Menu.Item
              key={index}
              onPress={() => handleSelect(item.value)}
              title={item.label}
            />
          ))}
        </Menu>
      </View>

      {/* Body session */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
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
                    <Text variant="labelSmall" style={styles.textStatus}>
                      {row.timeCheckin + " น."}
                    </Text>
                  )}
                  style={styles.listShift}
                />
                <Divider />
              </View>
            ))}
          </List.Section>
        )}
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  dropdownMonth: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  listShift: {},
  iconStatus: {
    width: 20,
    height: 20,
  },
  labelDate: {
    color: "gray",
    fontSize: 14,
  },
  textStatus: {
    textAlign: "center",
    color: "gray",
  },
  containerTime: {
    flexDirection: "row",
    marginTop: 5,
  },
  labelShift: {
    color: "steelblue",
    fontSize: 14,
    marginTop:5,
  },
  labelClockIn: {
    color: "#32cd32",
    width: 120,
    fontSize: 16,
  },
  labelClockOut: {
    color: "#db2828",
    width: 120,
    fontSize: 16,
  },
});

export default Schedule;
