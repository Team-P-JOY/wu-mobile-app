import * as React from "react";
import Svg, {
  Path,
  G,
  Defs,
  Stop,
  LinearGradient,
  RadialGradient,
} from "react-native-svg";

const Icon = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <G fill="none">
      <Path
        fill="url(#fluentColorReward240)"
        d="m16 11.65l4.662-2.448A2.5 2.5 0 0 0 22 6.99V3.75A1.75 1.75 0 0 0 20.25 2H16l-1 5z"
      ></Path>
      <Path
        fill="url(#fluentColorReward241)"
        d="M8 2H3.75A1.75 1.75 0 0 0 2 3.75v3.239a2.5 2.5 0 0 0 1.338 2.213L8 11.65l1-4.661z"
      ></Path>
      <Path
        fill="url(#fluentColorReward242)"
        d="M8 11.65V2h8v9.65l-3.187 1.673a1.75 1.75 0 0 1-1.626 0z"
      ></Path>
      <Path
        fill="url(#fluentColorReward243)"
        d="M17 17a5 5 0 1 1-10 0a5 5 0 0 1 10 0"
      ></Path>
      <Defs>
        <LinearGradient
          id="fluentColorReward240"
          x1={22}
          x2={14.966}
          y1={2.858}
          y2={10.309}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#52d17c"></Stop>
          <Stop offset={1} stopColor="#1a7f7c"></Stop>
        </LinearGradient>
        <LinearGradient
          id="fluentColorReward241"
          x1={2}
          x2={9.064}
          y1={4.599}
          y2={9.274}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#52d17c"></Stop>
          <Stop offset={1} stopColor="#1a7f7c"></Stop>
        </LinearGradient>
        <LinearGradient
          id="fluentColorReward242"
          x1={12}
          x2={15.64}
          y1={0.559}
          y2={12.405}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#76eb95"></Stop>
          <Stop offset={1} stopColor="#1ec8b0"></Stop>
        </LinearGradient>
        <RadialGradient
          id="fluentColorReward243"
          cx={0}
          cy={0}
          r={1}
          gradientTransform="rotate(56.615 14.048 -25.06)scale(55.8175 47.8051)"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.772} stopColor="#ffcd0f"></Stop>
          <Stop offset={0.991} stopColor="#e67505"></Stop>
        </RadialGradient>
      </Defs>
    </G>
  </Svg>
);

export default Icon;
