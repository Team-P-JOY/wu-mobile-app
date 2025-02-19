import React, { memo } from "react";
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  View,
} from "react-native";
import { useTheme } from "react-native-paper";

const BackgroundImage = ({ children }) => {
  const theme = useTheme();
  return (
    <ImageBackground
      source={require("../assets/wallpaper.jpg")}
      resizeMode="cover"
      style={styles.background}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  container: {
    flex: 1,

    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
  },
});

export default memo(BackgroundImage);
