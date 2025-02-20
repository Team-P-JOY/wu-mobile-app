import { View, Text, Button } from "react-native";
import { BackHandler } from "react-native";

const DevBlockedScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6a11cb",
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold", color: "red" }}>
        แอปนี้ไม่สามารถใช้งานใน Dev Mode ได้
      </Text>
      {/* <Button title="ออกจากแอป" onPress={() => BackHandler.exitApp()} /> */}
    </View>
  );
};

export default DevBlockedScreen;
