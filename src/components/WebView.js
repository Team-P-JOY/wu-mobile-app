import React, { useState } from "react";
import { View, ScrollView, RefreshControl, StyleSheet } from "react-native";
import { WebView as ShowWeb } from "react-native-webview";

const WebViewScreen = ({ url }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [key, setKey] = useState(0);

  const onRefresh = () => {
    setRefreshing(true);
    setKey((prevKey) => prevKey + 1);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.webViewContainer}>
        <ShowWeb key={key} source={{ uri: url }} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  webViewContainer: {
    flex: 1,
    height: "100%",
  },
});

export default WebViewScreen;
