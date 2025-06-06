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
        fill="url(#fluentColorLocationRipple242)"
        d="M21 19c0 2.5-4.03 4-9 4s-9-1.5-9-4c0-2.406 4.03-4 9-4s9 1.5 9 4"
      ></Path>
      <Path
        fill="url(#fluentColorLocationRipple240)"
        d="M12 2a7.5 7.5 0 0 0-7.5 7.5c0 1.932 1.064 3.8 2.268 5.316c1.22 1.537 2.678 2.829 3.655 3.622c.926.75 2.228.75 3.154 0c.977-.793 2.435-2.085 3.655-3.622C18.436 13.301 19.5 11.432 19.5 9.5A7.5 7.5 0 0 0 12 2"
      ></Path>
      <Path
        fill="url(#fluentColorLocationRipple241)"
        d="M14.5 9.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0"
      ></Path>
      <Defs>
        <LinearGradient
          id="fluentColorLocationRipple240"
          x1={1.219}
          x2={13.202}
          y1={-2.857}
          y2={16.549}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#f97dbd"></Stop>
          <Stop offset={1} stopColor="#d7257d"></Stop>
        </LinearGradient>
        <LinearGradient
          id="fluentColorLocationRipple241"
          x1={9.79}
          x2={12.394}
          y1={9.721}
          y2={12.428}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fdfdfd"></Stop>
          <Stop offset={1} stopColor="#fecbe6"></Stop>
        </LinearGradient>
        <RadialGradient
          id="fluentColorLocationRipple242"
          cx={0}
          cy={0}
          r={1}
          gradientTransform="rotate(-10.678 100.2 -51.93)scale(14.3921 6.38107)"
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#7b7bff"></Stop>
          <Stop offset={0.502} stopColor="#a3a3ff"></Stop>
          <Stop offset={1} stopColor="#ceb0ff"></Stop>
        </RadialGradient>
      </Defs>
    </G>
  </Svg>
);

export default Icon;
