import React, { memo } from "react";
import { Image } from "react-native";

const Logo = (props) => (
  <Image source={require("../../assets/WUH.png")} style={props} />
);

export default memo(Logo);
