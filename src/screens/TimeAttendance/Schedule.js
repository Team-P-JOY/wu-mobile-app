import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { List, Divider, Menu, Button } from "react-native-paper";
import Background from "../../components/Background";
import TopBar from "../../components/TopBar";
import { AuthContext } from "../../context/AuthContext";
import { getDatetext } from "../../core/utils";

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
  const [shift, setShift] = useState([]);
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
        `https://apisprd.wu.ac.th/tal/tal-timework/get-schedule?personId=${user.person_id}&month=${month}`,
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
            setShift(data.dtSchedule);
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
        title="ตารางปฏิบัติงาน"
        right={() => navigation.navigate("Main")}
        rightIcon="menu"
      />

      {user && <Text>{user.person_id}</Text>}

      <TouchableOpacity onPress={() => navigation.navigate("Timestamp")}>
        <Text>test to go to Timestamp</Text>
      </TouchableOpacity>

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
            {shift.map((row, index) => (
              <View key={index}>
                <List.Item
                  title={
                    <Text style={styles.labelDate}>
                      {"วันที่ " + getDatetext(row.startDate, "th", "l")}
                    </Text>
                  }
                  description={
                    <View>
                      <Text style={styles.labelShift}>
                        {row.shiftTypeName + ": " + row.shiftName}
                      </Text>
                      <View style={styles.containerTime}>
                        <Text style={styles.labelClockIn}>
                          {"เข้า: " + row.timeCheckin}
                        </Text>
                        <Text style={styles.labelClockOut}>
                          {"ออก: " + row.timeCheckout}
                        </Text>
                      </View>
                    </View>
                  }
                  right={(props) => (
                    <View style={{ textAlign: "center" }}>
                      <List.Icon
                        {...props}
                        icon="circle"
                        color="red"
                        style={styles.iconStatus}
                      />
                      <Text style={styles.textStatus}>{row.statusNameTh}</Text>
                    </View>
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
  },
  labelShift: {
    color: "steelblue",
    fontSize: 14,
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
