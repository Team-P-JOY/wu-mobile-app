import React, { memo } from "react";
import { TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { theme } from "../core/theme";

const BackButton = ({ goBack, textValue }) => (
  <TouchableOpacity onPress={goBack} style={styles.container}>
    {textValue ? (
      <Text style={styles.text}>{textValue}</Text>
    ) : (
      <Image
        style={styles.image}
        source={require("../assets/arrow_back.png")}
      />
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 10 + getStatusBarHeight(),
    left: 10,
  },
  text: {
    fontSize: 16,
    color: theme.colors.primary,
    fontWeight: "bold",
  },
  image: {
    width: 24,
    height: 24,
  },
});

export default memo(BackButton);
