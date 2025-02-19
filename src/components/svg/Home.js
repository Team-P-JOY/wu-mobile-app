import * as React from "react";
import Svg, { Path, G, Defs, Stop, LinearGradient } from "react-native-svg";

const Icon = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" {...props}>
    <G fill="none">
      <Path fill="url(#fluentColorHome480)" d="M18.067 27h12v16h-12z"></Path>
      <Path
        fill="url(#fluentColorHome481)"
        d="M26.461 7.855a3.78 3.78 0 0 0-4.787 0L8.499 18.597a3.91 3.91 0 0 0-1.432 3.031v17.485C7.067 41.26 8.78 43 10.892 43h8.175V30.5a2.5 2.5 0 0 1 2.5-2.5h5a2.5 2.5 0 0 1 2.5 2.5V43h8.175c2.113 0 3.825-1.74 3.825-3.887V21.628a3.91 3.91 0 0 0-1.43-3.031z"
      ></Path>
      <Path
        fill="url(#fluentColorHome482)"
        fillRule="evenodd"
        d="m24.068 9.329l-16 13.215a2.054 2.054 0 0 1-2.852-.262a1.956 1.956 0 0 1 .267-2.794L22.28 5.628a2.83 2.83 0 0 1 3.523-.024l16.805 13.588a1.957 1.957 0 0 1 .307 2.79a2.054 2.054 0 0 1-2.848.3z"
        clipRule="evenodd"
      ></Path>
      <Defs>
        <LinearGradient
          id="fluentColorHome480"
          x1={24.067}
          x2={13.481}
          y1={27}
          y2={44.65}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#944600"></Stop>
          <Stop offset={1} stopColor="#cd8e02"></Stop>
        </LinearGradient>
        <LinearGradient
          id="fluentColorHome481"
          x1={10.313}
          x2={45.173}
          y1={5.24}
          y2={32}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#ffd394"></Stop>
          <Stop offset={1} stopColor="#ffb357"></Stop>
        </LinearGradient>
        <LinearGradient
          id="fluentColorHome482"
          x1={17.817}
          x2={25.308}
          y1={0.725}
          y2={22.452}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#ff921f"></Stop>
          <Stop offset={1} stopColor="#eb4824"></Stop>
        </LinearGradient>
      </Defs>
    </G>
  </Svg>
);

export default Icon;
