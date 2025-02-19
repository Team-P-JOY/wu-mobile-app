import * as React from "react";
import Svg, {
  Path,
  G,
  Defs,
  LinearGradient,
  Stop,
  RadialGradient,
} from "react-native-svg";

const Icon = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <G fill="none">
      <Path
        fill="url(#fluentColorPersonAvailable240)"
        d="M15.755 14a2.25 2.25 0 0 1 2.248 2.249v.918a2.75 2.75 0 0 1-.512 1.6C15.945 20.928 13.42 22 10 22c-3.422 0-5.945-1.072-7.487-3.236a2.75 2.75 0 0 1-.51-1.596v-.92a2.25 2.25 0 0 1 2.249-2.25z"
      ></Path>
      <Path
        fill="url(#fluentColorPersonAvailable241)"
        d="M15.755 14a2.25 2.25 0 0 1 2.248 2.249v.918a2.75 2.75 0 0 1-.512 1.6C15.945 20.928 13.42 22 10 22c-3.422 0-5.945-1.072-7.487-3.236a2.75 2.75 0 0 1-.51-1.596v-.92a2.25 2.25 0 0 1 2.249-2.25z"
      ></Path>
      <Path
        fill="url(#fluentColorPersonAvailable245)"
        fillOpacity={0.5}
        d="M15.755 14a2.25 2.25 0 0 1 2.248 2.249v.918a2.75 2.75 0 0 1-.512 1.6C15.945 20.928 13.42 22 10 22c-3.422 0-5.945-1.072-7.487-3.236a2.75 2.75 0 0 1-.51-1.596v-.92a2.25 2.25 0 0 1 2.249-2.25z"
      ></Path>
      <Path
        fill="url(#fluentColorPersonAvailable242)"
        d="M10 2.005a5 5 0 1 1 0 10a5 5 0 0 1 0-10"
      ></Path>
      <Path
        fill="url(#fluentColorPersonAvailable243)"
        d="M17.5 12a5.5 5.5 0 1 1 0 11a5.5 5.5 0 0 1 0-11"
      ></Path>
      <Path
        fill="url(#fluentColorPersonAvailable244)"
        fillRule="evenodd"
        d="M20.854 15.146a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708l1.646 1.647l3.646-3.647a.5.5 0 0 1 .708 0"
        clipRule="evenodd"
      ></Path>
      <Defs>
        <LinearGradient
          id="fluentColorPersonAvailable240"
          x1={5.809}
          x2={8.394}
          y1={15.063}
          y2={23.319}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.125} stopColor="#9c6cfe"></Stop>
          <Stop offset={1} stopColor="#7a41dc"></Stop>
        </LinearGradient>
        <LinearGradient
          id="fluentColorPersonAvailable241"
          x1={10.004}
          x2={13.624}
          y1={13.047}
          y2={26.573}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#885edb" stopOpacity={0}></Stop>
          <Stop offset={1} stopColor="#e362f8"></Stop>
        </LinearGradient>
        <LinearGradient
          id="fluentColorPersonAvailable242"
          x1={7.378}
          x2={12.474}
          y1={3.334}
          y2={11.472}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.125} stopColor="#9c6cfe"></Stop>
          <Stop offset={1} stopColor="#7a41dc"></Stop>
        </LinearGradient>
        <LinearGradient
          id="fluentColorPersonAvailable243"
          x1={12.393}
          x2={19.984}
          y1={14.063}
          y2={21.95}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#52d17c"></Stop>
          <Stop offset={1} stopColor="#22918b"></Stop>
        </LinearGradient>
        <LinearGradient
          id="fluentColorPersonAvailable244"
          x1={15.313}
          x2={16.45}
          y1={15.51}
          y2={21.13}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fff"></Stop>
          <Stop offset={1} stopColor="#e3ffd9"></Stop>
        </LinearGradient>
        <RadialGradient
          id="fluentColorPersonAvailable245"
          cx={0}
          cy={0}
          r={1}
          gradientTransform="matrix(0 8.5 -8.49852 0 17.5 18.5)"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.493} stopColor="#30116e"></Stop>
          <Stop offset={0.912} stopColor="#30116e" stopOpacity={0}></Stop>
        </RadialGradient>
      </Defs>
    </G>
  </Svg>
);

export default Icon;
