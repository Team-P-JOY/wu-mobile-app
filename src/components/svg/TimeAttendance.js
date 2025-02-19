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
        fill="url(#fluentColorCalendarClock240)"
        d="M21 7.5v10.25A3.25 3.25 0 0 1 17.75 21H6.25A3.25 3.25 0 0 1 3 17.75V7.5l9-1z"
      ></Path>
      <Path
        fill="url(#fluentColorCalendarClock241)"
        d="M21 7.5v10.25A3.25 3.25 0 0 1 17.75 21H6.25A3.25 3.25 0 0 1 3 17.75V7.5l9-1z"
      ></Path>
      <Path
        fill="url(#fluentColorCalendarClock245)"
        fillOpacity={0.3}
        d="M21 7.5v10.25A3.25 3.25 0 0 1 17.75 21H6.25A3.25 3.25 0 0 1 3 17.75V7.5l9-1z"
      ></Path>
      <Path
        fill="url(#fluentColorCalendarClock242)"
        d="M17.75 3A3.25 3.25 0 0 1 21 6.25V8H3V6.25A3.25 3.25 0 0 1 6.25 3z"
      ></Path>
      <Path
        fill="url(#fluentColorCalendarClock243)"
        d="M17.5 12a5.5 5.5 0 1 1 0 11a5.5 5.5 0 0 1 0-11"
      ></Path>
      <Path
        fill="url(#fluentColorCalendarClock244)"
        fillRule="evenodd"
        d="M17.5 14a.5.5 0 0 1 .5.5V17h2a.5.5 0 0 1 0 1h-2.5a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5"
        clipRule="evenodd"
      ></Path>
      <Defs>
        <LinearGradient
          id="fluentColorCalendarClock240"
          x1={9.429}
          x2={14.137}
          y1={6.5}
          y2={20.932}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#b3e0ff"></Stop>
          <Stop offset={1} stopColor="#8cd0ff"></Stop>
        </LinearGradient>
        <LinearGradient
          id="fluentColorCalendarClock241"
          x1={13.929}
          x2={16.625}
          y1={12.432}
          y2={24.267}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#dcf8ff" stopOpacity={0}></Stop>
          <Stop offset={1} stopColor="#ff6ce8" stopOpacity={0.7}></Stop>
        </LinearGradient>
        <LinearGradient
          id="fluentColorCalendarClock242"
          x1={3.723}
          x2={5.356}
          y1={3}
          y2={11.537}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#0094f0"></Stop>
          <Stop offset={1} stopColor="#2764e7"></Stop>
        </LinearGradient>
        <LinearGradient
          id="fluentColorCalendarClock243"
          x1={13.833}
          x2={19.333}
          y1={11.389}
          y2={23.611}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#1ec8b0"></Stop>
          <Stop offset={1} stopColor="#2764e7"></Stop>
        </LinearGradient>
        <LinearGradient
          id="fluentColorCalendarClock244"
          x1={17.306}
          x2={16.398}
          y1={14.612}
          y2={17.88}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fdfdfd"></Stop>
          <Stop offset={1} stopColor="#d1d1ff"></Stop>
        </LinearGradient>
        <RadialGradient
          id="fluentColorCalendarClock245"
          cx={0}
          cy={0}
          r={1}
          gradientTransform="matrix(0 8.56818 -8.35714 0 17.786 19.023)"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.535} stopColor="#4a43cb"></Stop>
          <Stop offset={1} stopColor="#4a43cb" stopOpacity={0}></Stop>
        </RadialGradient>
      </Defs>
    </G>
  </Svg>
);

export default Icon;
