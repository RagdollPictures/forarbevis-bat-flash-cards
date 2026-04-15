import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgTransitionWaterFront = (props) => (
  <Svg
    viewBox="0 0 375 1500"
    {...props}
  >
    <Path
      d="M0 0h375v1500H0z"
      fill={props.color ?? "#00ff00"}
    />
  </Svg>
);

export default SvgTransitionWaterFront;