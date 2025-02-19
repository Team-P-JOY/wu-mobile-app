import * as React from "react";
import Svg, {
  Path,
  Circle,
  G,
  LinearGradient,
  Defs,
  Stop,
} from "react-native-svg";

const Icon = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <G fill="none">
      <Path
        fill="url(#fluentColorGuest240)"
        fillRule="evenodd"
        d="M19.995 4.096A2.25 2.25 0 0 0 17.75 2H6.25l-.154.005A2.25 2.25 0 0 0 4 4.25v15.505l.005.154a2.25 2.25 0 0 0 2.245 2.096h11.5l.154-.006A2.25 2.25 0 0 0 20 19.755V4.25zM10.75 5a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5z"
        clipRule="evenodd"
      ></Path>
      <Path
        fill="url(#fluentColorGuest241)"
        fillOpacity={0.7}
        fillRule="evenodd"
        d="M19.995 4.096A2.25 2.25 0 0 0 17.75 2H6.25l-.154.005A2.25 2.25 0 0 0 4 4.25v15.505l.005.154a2.25 2.25 0 0 0 2.245 2.096h11.5l.154-.006A2.25 2.25 0 0 0 20 19.755V4.25zM10.75 5a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5z"
        clipRule="evenodd"
      ></Path>
      <Path
        fill="url(#fluentColorGuest242)"
        fillOpacity={0.9}
        d="M14.75 14.996c.69 0 1.25.56 1.25 1.25v.499c0 1.846-1.472 2.754-4 2.754s-4-.909-4-2.756v-.497c0-.69.56-1.25 1.25-1.25z"
      ></Path>
      <Path
        fill="url(#fluentColorGuest243)"
        fillOpacity={0.9}
        d="M12 8.996a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5"
      ></Path>
      <Defs>
        <LinearGradient
          id="fluentColorGuest240"
          x1={-1.333}
          x2={18.824}
          y1={-2.374}
          y2={16.454}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#36dff1"></Stop>
          <Stop offset={1} stopColor="#2764e7"></Stop>
        </LinearGradient>
        <LinearGradient
          id="fluentColorGuest241"
          x1={14.476}
          x2={20.452}
          y1={4.457}
          y2={24.832}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.619} stopColor="#ff6ce8" stopOpacity={0}></Stop>
          <Stop offset={1} stopColor="#ff6ce8"></Stop>
        </LinearGradient>
        <LinearGradient
          id="fluentColorGuest242"
          x1={18.004}
          x2={13.237}
          y1={23.36}
          y2={7.832}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#9deaff"></Stop>
          <Stop offset={1} stopColor="#fff"></Stop>
        </LinearGradient>
        <LinearGradient
          id="fluentColorGuest243"
          x1={15.752}
          x2={7.824}
          y1={18.281}
          y2={3.741}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#9deaff"></Stop>
          <Stop offset={1} stopColor="#fff"></Stop>
        </LinearGradient>
      </Defs>
    </G>
  </Svg>
);

export default Icon;
