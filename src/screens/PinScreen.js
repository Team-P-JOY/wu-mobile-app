import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import BackgroundImage from "../components/BackgroundImage";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import Header from "../components/Header";
import PinButton from "../components/PinButton";
import { AuthContext } from "../context/AuthContext";
import Logo from "../components/Logo";
import ConfirmModal from "../components/ConfirmModal";

const PinScreen = ({ navigation }) => {
  const { pin, logout, setPinAccess } = useContext(AuthContext);
  const [pinCheck, setPin] = useState("");
  const [pinStatus, setPinStatus] = useState("กรุณากรอก PIN");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (pinCheck.length === 6) {
      checkPin();
    }
  }, [pinCheck]);

  const handlePress = (num) => {
    if (pinCheck.length < 6) {
      setPin(pinCheck + num);
    }
  };

  const handleDelete = () => {
    setPin(pinCheck.slice(0, -1));
  };

  const checkPin = async () => {
    if (pin === pinCheck) {
      setPinAccess(true);
    } else {
      setPinStatus("รหัส Pin ไม่ถูกต้อง");
    }
    setPin("");
  };

  return (
    <BackgroundImage>
      <View style={styles.container}>
        <Logo />
        <Header>{pinStatus}</Header>
        <Text style={styles.pinDisplay}> {"*".repeat(pinCheck.length)} </Text>

        {/* 🔒 ปุ่มลืมรหัส PIN */}
        <TouchableOpacity
          style={styles.forgotPinButton}
          onPress={() => setModalVisible(true)}
        >
          <MaterialCommunityIcons name="lock-question" size={20} color="red" />
          <Text style={styles.forgotPinText}>ลืมรหัส Pin</Text>
        </TouchableOpacity>
      </View>
      <ConfirmModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={() => {
          setModalVisible(false);
          logout();
        }}
        message="คุณต้องการออกจากระบบเพื่อตั้งค่า PIN ใหม่หรือไม่?"
      />

      <View style={styles.buttonContainer}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, "Reset", 0, "⌫"].map((item, index) => (
          <PinButton
            key={index}
            mode="contained"
            onPress={() =>
              item === "⌫"
                ? handleDelete()
                : item !== "Reset"
                ? handlePress(item)
                : setPin("")
            }
          >
            {item}
          </PinButton>
        ))}
      </View>
    </BackgroundImage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  pinDisplay: {
    fontSize: 32,
    letterSpacing: 10,
    marginBottom: 20,
  },
  forgotPinButton: {
    flexDirection: "row", // ทำให้ไอคอนกับข้อความอยู่ในบรรทัดเดียวกัน
    alignItems: "center",
    marginTop: 10,
  },
  forgotPinText: {
    fontSize: 16,
    color: "red",
    marginLeft: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
  },
});

export default PinScreen;
