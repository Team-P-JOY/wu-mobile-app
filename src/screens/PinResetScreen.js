import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import BackgroundImage from "../components/BackgroundImage";
import { Text, Appbar } from "react-native-paper";
import Header from "../components/Header";
import PinButton from "../components/PinButton";
import { AuthContext } from "../context/AuthContext";
import ConfirmModal from "../components/ConfirmModal";
import { theme } from "../core/theme";

const PinResetScreen = ({ navigation }) => {
  const { savePin } = useContext(AuthContext);
  const [pin, setPin] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (pin.length === 6) {
      setModalVisible(true);
    }
  }, [pin]);

  const handlePress = (num) => {
    if (pin.length < 6) {
      setPin(pin + num);
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  const checkPin = async () => {
    await savePin(pin);
    setPin("");
    navigation.navigate("Settings");
  };

  return (
    <BackgroundImage>
      <Appbar.Header style={{ backgroundColor: "transparent", elevation: 0 }}>
        <Appbar.BackAction
          onPress={() => navigation.navigate("Settings")}
          color={theme.colors.myTheme}
        />
        <Appbar.Content
          title="ย้อนกลับ"
          titleStyle={{ fontSize: 18, color: theme.colors.myTheme }}
        />
      </Appbar.Header>
      <View style={styles.container}>
        <Header>เปลี่ยน Pin ใหม่</Header>

        <Text style={styles.pinDisplay}> {"*".repeat(pin.length)} </Text>
      </View>
      <ConfirmModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={() => {
          setModalVisible(false);
          checkPin();
        }}
        message="ยืนยันการเปลี่ยนรหัส PIN ใหม่"
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
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
  },
});

export default PinResetScreen;
