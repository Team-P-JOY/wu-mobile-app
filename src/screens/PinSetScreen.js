import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import BackgroundImage from "../components/BackgroundImage";
import { Text, Button } from "react-native-paper";
import Header from "../components/Header";
import PinButton from "../components/PinButton";
import { AuthContext } from "../context/AuthContext";

const PinScreen = ({ navigation }) => {
  const { savePin } = useContext(AuthContext);
  const [pin, setPin] = useState("");

  useEffect(() => {
    if (pin.length === 6) {
      checkPin();
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
  };

  return (
    <BackgroundImage>
      <View style={styles.container}>
        <Header>ตั้งค่า PIN 6 หลัก</Header>

        <Text style={styles.pinDisplay}> {"*".repeat(pin.length)} </Text>
      </View>

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

export default PinScreen;
