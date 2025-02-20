import { View, Text } from "react-native";
import Logo from "../components/Logo";

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
      {/* <Logo /> */}
      <Text style={{ fontSize: 60, fontWeight: "bold", color: "red" }}>X</Text>
      <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
        แอปนี้ไม่สามารถใช้งานใน Dev Mode ได้
      </Text>
    </View>
  );
};

export default DevBlockedScreen;
