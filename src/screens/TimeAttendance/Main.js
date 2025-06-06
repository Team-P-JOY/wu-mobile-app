import React, { useState } from "react";
import Background from "../../components/Background";
import TopBar from "../../components/TopBar";
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { List, Switch, Divider } from "react-native-paper";


const Main = ({ navigation }) => {
  return (
    <Background>
      <TopBar title="บันทึกเวลาปฏิบัติงาน" />
      <List.Section style={styles.container}>
        <List.Item
          title="Dashboard"
          description="สถิติบันทึกการปฏิบัติงาน"
          left={(props) => <List.Icon {...props} icon="chart-arc" />}
          onPress={() => navigation.navigate("Home")}
        />
        <Divider />
        <List.Item
          title="ตารางปฏิบัติงาน"
          description="สถานะการปฏิบัติงาน"
          left={(props) => <List.Icon {...props} icon="calendar-month" />}
          onPress={() => navigation.navigate("Schedule")}
        />
        <Divider />
        <List.Item
          title="Timestamp"
          description="สแกนนิ้ว เข้า/ออก"
          left={(props) => <List.Icon {...props} icon="calendar-clock" />}
          onPress={() => navigation.navigate("Timestamp")}
        />
        <Divider />
        <List.Item
          title="บันทึกการลา"
          description="สถิติบันทึกการลา"
          left={(props) => <List.Icon {...props} icon="account-arrow-right" />}
          onPress={() => navigation.navigate("Leave")}
        />
      </List.Section>
    </Background>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
  },
  title: {
    marginBottom: 20,
  },
});
