import * as React from "react";
import Svg, { G, Path, Circle } from "react-native-svg";
import type { SvgProps } from "react-native-svg";

type SharedLevelSvgProps = SvgProps & {
  visibleLayerIds?: string[];
  decoCount?: number;
  layerColors?: Partial<Record<string, string>>;
};

function isVisible(id: string, visibleLayerIds?: string[], decoCount?: number) {
  if (id.startsWith("deco_")) {
    const numberMatch = id.match(/^deco_(\d+)/);

    if (numberMatch) {
      const index = Number(numberMatch[1]);

      if (typeof decoCount === "number") {
        return index <= decoCount;
      }
    }

    return true;
  }

  if (visibleLayerIds && visibleLayerIds.length > 0) {
    return visibleLayerIds.some((visibleId) => id === visibleId || id.startsWith(`${visibleId}_`));
  }

  return true;
}

const SharedLevelSvg = (props: SharedLevelSvgProps) => (
  <Svg viewBox="0 0 375 4608" {...props}>
    <G id="path">
      <Path
        d="M125 162.34c0 93.24 128 162.76 128 256s-128 162.76-128 256 128 162.76 128 256-128 162.76-128 256 128 162.76 128 256-128 162.76-128 256 128 162.76 128 256-128 162.76-128 256 128 162.76 128 256-128 162.76-128 256 128 162.76 128 256-128 162.76-128 256 128 162.76 128 256-128 162.76-128 256 128 162.76 128 256-128 162.76-128 256"
        fill="none"
        stroke="#000"
      />
    </G>
    <G id="anchor_read_001">
      <Circle
        cx={125}
        cy={162.34}
        r={8.06}
        fill={props.layerColors?.["anchor_read_001"] ?? "#dd17dd"}
      />
    </G>
    <G id="anchor_quiz_001">
      <Circle
        cx={189}
        cy={290.34}
        r={8.06}
        fill={props.layerColors?.["anchor_quiz_001"] ?? "#dd17dd"}
      />
    </G>
    <G id="anchor_read_002">
      <Circle
        cx={253}
        cy={418.34}
        r={8.06}
        fill={props.layerColors?.["anchor_read_002"] ?? "#dd17dd"}
      />
    </G>
    <G id="anchor_chapter_test_01">
      <Circle
        cx={253}
        cy={418.34}
        r={8.06}
        fill={props.layerColors?.["anchor_chapter_test_01"] ?? "#dd17dd"}
      />
    </G>
    <G id="anchor_quiz_002">
      <Circle
        cx={189}
        cy={546.34}
        r={8.06}
        fill={props.layerColors?.["anchor_quiz_002"] ?? "#dd17dd"}
      />
    </G>
    <G id="anchor_read_003">
      <Circle
        cx={125}
        cy={674.34}
        r={8.06}
        fill={props.layerColors?.["anchor_read_003"] ?? "#dd17dd"}
      />
    </G>
    <G id="anchor_chapter_test_02">
      <Circle
        cx={125}
        cy={674.34}
        r={8.06}
        fill={props.layerColors?.["anchor_chapter_test_02"] ?? "#dd17dd"}
      />
    </G>
    <G id="anchor_quiz_003">
      <Circle
        cx={189.31}
        cy={802.34}
        r={9.08}
        fill={props.layerColors?.["anchor_quiz_003"] ?? "#dd17dd"}
      />
    </G>
    <G id="anchor_read_004">
      <Circle
        cx={253}
        cy={930.34}
        r={8.06}
        fill={props.layerColors?.["anchor_read_004"] ?? "#dd17dd"}
      />
    </G>
    <G id="anchor_chapter_test_03">
      <Circle
        cx={253}
        cy={930.34}
        r={8.06}
        fill={props.layerColors?.["anchor_chapter_test_03"] ?? "#dd17dd"}
      />
    </G>
    <G id="anchor_quiz_004">
      <Circle
        cx={189.08}
        cy={1058.34}
        r={8.06}
        fill={props.layerColors?.["anchor_quiz_004"] ?? "#dd17dd"}
      />
    </G>
    <G id="anchor_read_005">
      <Circle
        cx={125}
        cy={1186.34}
        r={8.06}
        fill={props.layerColors?.["anchor_read_005"] ?? "#dd17dd"}
      />
    </G>
    <G id="anchor_chapter_test_04">
      <Circle
        cx={125}
        cy={1186.34}
        r={8.06}
        fill={props.layerColors?.["anchor_chapter_test_04"] ?? "#dd17dd"}
      />
    </G>
    <G id="anchor_quiz_005">
      <Circle
        cx={188.91}
        cy={1314.34}
        r={9.36}
        fill={props.layerColors?.["anchor_quiz_005"] ?? "#dd17dd"}
      />
    </G>
    <G id="anchor_read_006">
      <Circle
        cx={253}
        cy={1442.34}
        r={8.06}
        fill={props.layerColors?.["anchor_read_006"] ?? "#dd17dd"}
      />
    </G>
    <G id="anchor_chapter_test_05">
      <Circle
        cx={253}
        cy={1442.34}
        r={8.06}
        fill={props.layerColors?.["anchor_chapter_test_05"] ?? "#dd17dd"}
      />
    </G>
    <G id="anchor_quiz_006">
      <Circle
        cx={189.35}
        cy={1570.34}
        r={8.76}
        fill={props.layerColors?.["anchor_quiz_006"] ?? "#dd17dd"}
      />
    </G>
    <G id="anchor_read_007">
      <Circle
        cx={125}
        cy={1698.34}
        r={8.06}
        fill={props.layerColors?.["anchor_read_007"] ?? "#dd17dd"}
      />
    </G>
    <G id="anchor_chapter_test_06">
      <Circle
        cx={125}
        cy={1698.34}
        r={8.06}
        fill={props.layerColors?.["anchor_chapter_test_06"] ?? "#dd17dd"}
      />
    </G>
    <G id="anchor_quiz_007">
      <Circle
        cx={188.85}
        cy={1826.34}
        r={8.06}
        fill={props.layerColors?.["anchor_quiz_007"] ?? "#dd17dd"}
      />
    </G>
    <G id="anchor_read_008">
      <Circle
        cx={253}
        cy={1954.34}
        r={8.06}
        fill={props.layerColors?.["anchor_read_008"] ?? "#dd17dd"}
      />
    </G>
    <G id="anchor_chapter_test_07">
      <Circle
        cx={253}
        cy={1954.34}
        r={8.06}
        fill={props.layerColors?.["anchor_chapter_test_07"] ?? "#dd17dd"}
      />
    </G>
    <G id="anchor_quiz_008">
      <Circle
        cx={189.06}
        cy={2083.34}
        r={8.53}
        fill={props.layerColors?.["anchor_quiz_008"] ?? "#dd17dd"}
      />
    </G>
    <G id="anchor_read_009">
      <Circle
        cx={125}
        cy={2210.34}
        r={8.06}
        fill={props.layerColors?.["anchor_read_009"] ?? "#dd17dd"}
      />
    </G>
    <G id="anchor_chapter_test_08">
      <Circle
        cx={125}
        cy={2210.34}
        r={8.06}
        fill={props.layerColors?.["anchor_chapter_test_08"] ?? "#dd17dd"}
      />
    </G>
    <G id="anchor_quiz_009">
      <Circle
        cx={189}
        cy={2338.37}
        r={8.06}
        fill={props.layerColors?.["anchor_quiz_009"] ?? "#dd17dd"}
      />
    </G>
    <G id="anchor_chapter_test_09">
      <Circle
        cx={253}
        cy={2466.34}
        r={10}
        fill={props.layerColors?.["anchor_chapter_test_09"] ?? "#e20caa"}
      />
    </G>
  </Svg>
);
export default SharedLevelSvg;
