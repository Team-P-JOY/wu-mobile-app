import React, { memo } from "react";
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  View,
} from "react-native";
import { useTheme } from "react-native-paper";

const Background = ({ children }) => {
  const theme = useTheme();
  return (
    // <ImageBackground
    //   source={require("../assets/background_dot.png")}
    //   resizeMode="repeat"
    //   style={styles.background}
    // >
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      behavior="padding"
    >
      {children}
    </KeyboardAvoidingView>
    // </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,

    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
  },
});

export default memo(Background);
