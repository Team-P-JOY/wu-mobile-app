import { View, Text } from "react-native";

const DevModeScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6a11cb",
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
        โหมดนักพัฒนา (Developer Mode)
      </Text>
      <Text
        style={{
          fontSize: 30,
          paddingTop: 20,
          fontWeight: "bold",
          color: __DEV__ ? "red" : "green",
        }}
      >
        {__DEV__ ? "เปิด" : "ปิด"}
      </Text>
    </View>
  );
};

export default DevModeScreen;
