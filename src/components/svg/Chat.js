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
        fill="url(#fluentColorChatMultiple240)"
        fillRule="evenodd"
        d="M22 13.5a7.5 7.5 0 1 0-4.411 6.836c1.258.29 2.613.54 3.236.652a.996.996 0 0 0 1.153-1.17a68 68 0 0 0-.681-3.143A7.5 7.5 0 0 0 22 13.5M14.517 18h-.034z"
        clipRule="evenodd"
      ></Path>
      <Path
        fill="url(#fluentColorChatMultiple241)"
        fillRule="evenodd"
        d="M2 10.5a7.5 7.5 0 1 1 4.411 6.836c-1.258.29-2.613.54-3.236.652a.996.996 0 0 1-1.153-1.17a68 68 0 0 1 .681-3.143A7.5 7.5 0 0 1 2 10.5M9.483 15h.034z"
        clipRule="evenodd"
      ></Path>
      <Defs>
        <RadialGradient
          id="fluentColorChatMultiple240"
          cx={0}
          cy={0}
          r={1}
          gradientTransform="matrix(6.90278 8.0094 -8.01592 6.9084 11.027 10.005)"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.63} stopColor="#3d35b1"></Stop>
          <Stop offset={0.85} stopColor="#6553c9"></Stop>
          <Stop offset={1} stopColor="#7660d3"></Stop>
        </RadialGradient>
        <LinearGradient
          id="fluentColorChatMultiple241"
          x1={2}
          x2={17.003}
          y1={3}
          y2={18}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#0fafff"></Stop>
          <Stop offset={1} stopColor="#2764e7"></Stop>
        </LinearGradient>
      </Defs>
    </G>
  </Svg>
);

export default Icon;
