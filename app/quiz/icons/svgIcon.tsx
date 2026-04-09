// app/(tabs)/quiz-menu/icons/SvgIcon.tsx
import CircleQuestionIcon from "@/assets/svg_icons/circle-question.svg";
import React from "react";
import type { SvgProps } from "react-native-svg";
import { svgByName, type SvgName } from "./svgRegistry";

export default function SvgIcon({
  name,
  size,
  color,
}: {
  name: string;
  size: number;
  color: string;
}) {
  const Comp =
    (svgByName as Record<string, React.ComponentType<SvgProps>>)[name] ??
    CircleQuestionIcon;

  return (
    <Comp
      width={size}
      height={size}
      fill={color}
      stroke={color}
    />
  );
}

export type { SvgName };

