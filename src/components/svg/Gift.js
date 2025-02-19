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
        fill="#cecece"
        d="M5.25 4A3.25 3.25 0 0 0 2 7.25v8.5A3.25 3.25 0 0 0 5.25 19h13.5A3.25 3.25 0 0 0 22 15.75v-8.5A3.25 3.25 0 0 0 18.75 4z"
      ></Path>
      <Path
        fill="url(#fluentColorGiftCard240)"
        d="M5.25 4A3.25 3.25 0 0 0 2 7.25v8.5A3.25 3.25 0 0 0 5.25 19h13.5A3.25 3.25 0 0 0 22 15.75v-8.5A3.25 3.25 0 0 0 18.75 4z"
      ></Path>
      <Path
        fill="#000"
        d="M7.986 10L8 3.998l1.5.004L9.486 10H22v1.5H9.482l-.017 7.502l-1.5-.004l.017-7.498H2V10z"
      ></Path>
      <Path
        fill="url(#fluentColorGiftCard242)"
        d="M7.986 10L8 3.998l1.5.004L9.486 10H22v1.5H9.482l-.017 7.502l-1.5-.004l.017-7.498H2V10z"
      ></Path>
      <Path
        fill="#515151"
        fillRule="evenodd"
        d="M6.94 11.5a2.5 2.5 0 1 1 1.81-4.285a2.5 2.5 0 1 1 1.81 4.285l1.72 1.72a.75.75 0 1 1-1.06 1.06l-2.47-2.47l-2.47 2.47a.75.75 0 0 1-1.06-1.06zM7 8a1 1 0 0 0 0 2h1V9a1 1 0 0 0-1-1m3.5 2h-1V9a1 1 0 1 1 1 1"
        clipRule="evenodd"
      ></Path>
      <Path
        fill="url(#fluentColorGiftCard241)"
        fillRule="evenodd"
        d="M6.94 11.5a2.5 2.5 0 1 1 1.81-4.285a2.5 2.5 0 1 1 1.81 4.285l1.72 1.72a.75.75 0 1 1-1.06 1.06l-2.47-2.47l-2.47 2.47a.75.75 0 0 1-1.06-1.06zM7 8a1 1 0 0 0 0 2h1V9a1 1 0 0 0-1-1m3.5 2h-1V9a1 1 0 1 1 1 1"
        clipRule="evenodd"
      ></Path>
      <Defs>
        <LinearGradient
          id="fluentColorGiftCard240"
          x1={2}
          x2={14.41}
          y1={-0.688}
          y2={24.366}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.125} stopColor="#bb45ea"></Stop>
          <Stop offset={0.468} stopColor="#8b57ed"></Stop>
          <Stop offset={1} stopColor="#5b2ab5"></Stop>
        </LinearGradient>
        <LinearGradient
          id="fluentColorGiftCard241"
          x1={9.033}
          x2={8.457}
          y1={-16.928}
          y2={23.071}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#ff6f47"></Stop>
          <Stop offset={0.804} stopColor="#ffcd0f"></Stop>
        </LinearGradient>
        <RadialGradient
          id="fluentColorGiftCard242"
          cx={0}
          cy={0}
          r={1}
          gradientTransform="matrix(25.625 0 0 17.0873 9.5 11.5)"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fb5937"></Stop>
          <Stop offset={0.378} stopColor="#ffcd0f"></Stop>
        </RadialGradient>
      </Defs>
    </G>
  </Svg>
);

export default Icon;
