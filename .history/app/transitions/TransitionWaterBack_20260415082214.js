import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgTransitionWaterBack = (props) => (
  <Svg
    viewBox="0 0 375 1500"
    {...props}
  >
    <Path
      d="M0 0h375v1500H0z"
      fill={props.color ?? "#1E5A85"}
    />
  </Svg>
);

export default SvgTransitionWaterBack;