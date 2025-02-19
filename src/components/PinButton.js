import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { theme } from "../core/theme";

const PinButton = ({ mode, style, children, ...props }) => {
  return (
    <PaperButton
      style={[
        styles.button,
        mode === "outlined" && { backgroundColor: theme.colors.surface },
        style,
      ]}
      labelStyle={styles.text}
      mode={mode}
      {...props}
    >
      {children}
    </PaperButton>
  );
};

export default memo(PinButton);

const styles = StyleSheet.create({
  button: {
    width: "30%",
    marginVertical: 6,
    marginHorizontal: 6,
    margin: 4,
  },
  text: {
    fontWeight: "bold",
    fontSize: 24,
    lineHeight: 26,
    lineHeight: 32,
  },
});
