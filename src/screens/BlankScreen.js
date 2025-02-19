import React, { memo } from "react";
import { View } from "react-native";
import BackgroundImage from "../components/BackgroundImage";
import Logo from "../components/Logo";
import Header from "../components/Header";

const BlankScreen = ({ navigation }) => {
  return (
    // <BackgroundImage style={{ backgroundColor: "#fff" }}>
    <View
      style={{
        flex: 1,
        padding: 5,
        width: "100%",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#6a11cb",
      }}
    >
      <Logo />
      {/* <Header>WU App</Header> */}
    </View>
    // </BackgroundImage>
  );
};

export default memo(BlankScreen);
