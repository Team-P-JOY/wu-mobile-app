import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView as ShowWeb } from "react-native-webview";

const WebView = ({ url }) => {
  return (
    <View style={styles.webViewContainer}>
      <ShowWeb source={{ uri: url }} />
    </View>
  );
};

const styles = StyleSheet.create({
  webViewContainer: {
    flex: 1,
  },
});

export default WebView;
