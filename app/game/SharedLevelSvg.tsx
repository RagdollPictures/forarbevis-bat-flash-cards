import * as React from "react";
import Svg, { G, Path, Circle } from "react-native-svg";
import type { SvgProps } from "react-native-svg";

type SharedLevelSvgProps = SvgProps & {
  visibleLayerIds?: string[];
  decoCount?: number;
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
        fill="none"
        stroke="#0f1f22"
        strokeWidth={8}
        d="M125 162.335c0 93.238 128 162.762 128 256s-128 162.762-128 256 128 162.762 128 256-128 162.762-128 256 128 162.762 128 256-128 162.762-128 256 128 162.762 128 256-128 162.762-128 256 128 162.762 128 256-128 162.762-128 256 128 162.762 128 256-128 162.762-128 256 128 162.762 128 256-128 162.762-128 256 128 162.762 128 256-128 162.762-128 256"
      />
    </G>
    <G id="anchor_read_001">
      <Circle cx={125} cy={162.335} r={8.064} fill="#0f1f22" />
    </G>
    <G id="anchor_quiz_001">
      <Circle cx={189} cy={290.335} r={8.064} fill="#0f1f22" />
    </G>
    <G id="anchor_read_002">
      <Circle cx={253} cy={418.335} r={8.064} fill="#0f1f22" />
    </G>
    <G id="anchor_chapter_test_01">
      <Circle cx={253} cy={418.335} r={8.064} fill="#0f1f22" />
    </G>
    <G id="anchor_quiz_002">
      <Circle cx={189} cy={546.335} r={8.064} fill="#0f1f22" />
    </G>
    <G id="anchor_read_003">
      <Circle cx={125} cy={674.335} r={8.064} fill="#0f1f22" />
    </G>
    <G id="anchor_chapter_test_02">
      <Circle cx={125} cy={674.335} r={8.064} fill="#0f1f22" />
    </G>
    <G id="anchor_quiz_003">
      <Circle cx={189.306} cy={802.335} r={9.078} fill="#0f1f22" />
    </G>
    <G id="anchor_read_004">
      <Circle cx={253} cy={930.335} r={8.064} fill="#0f1f22" />
    </G>
    <G id="anchor_chapter_test_03">
      <Circle cx={253} cy={930.335} r={8.064} fill="#0f1f22" />
    </G>
    <G id="anchor_quiz_004">
      <Circle cx={189.08} cy={1058.335} r={8.064} fill="#0f1f22" />
    </G>
    <G id="anchor_read_005">
      <Circle cx={125} cy={1186.335} r={8.064} fill="#0f1f22" />
    </G>
    <G id="anchor_chapter_test_04">
      <Circle cx={125} cy={1186.335} r={8.064} fill="#0f1f22" />
    </G>
    <G id="anchor_quiz_005">
      <Circle cx={188.908} cy={1314.335} r={9.359} fill="#0f1f22" />
    </G>
    <G id="anchor_read_006">
      <Circle cx={253} cy={1442.335} r={8.064} fill="#0f1f22" />
    </G>
    <G id="anchor_chapter_test_05">
      <Circle cx={253} cy={1442.335} r={8.064} fill="#0f1f22" />
    </G>
    <G id="anchor_quiz_006">
      <Circle cx={189.353} cy={1570.335} r={8.757} fill="#0f1f22" />
    </G>
    <G id="anchor_read_007">
      <Circle cx={125} cy={1698.335} r={8.064} fill="#0f1f22" />
    </G>
    <G id="anchor_chapter_test_06">
      <Circle cx={125} cy={1698.335} r={8.064} fill="#0f1f22" />
    </G>
    <G id="anchor_quiz_007">
      <Circle cx={188.847} cy={1826.335} r={8.064} fill="#0f1f22" />
    </G>
    <G id="anchor_read_008">
      <Circle cx={253} cy={1954.335} r={8.064} fill="#0f1f22" />
    </G>
    <G id="anchor_chapter_test_07">
      <Circle cx={253} cy={1954.335} r={8.064} fill="#0f1f22" />
    </G>
    <G id="anchor_quiz_008">
      <Circle cx={189.063} cy={2083.335} r={8.528} fill="#0f1f22" />
    </G>
    <G id="anchor_read_009">
      <Circle cx={125} cy={2210.335} r={8.064} fill="#0f1f22" />
    </G>
    <G id="anchor_chapter_test_08">
      <Circle cx={125} cy={2210.335} r={8.064} fill="#0f1f22" />
    </G>
    <G id="anchor_quiz_009">
      <Circle cx={189} cy={2338.367} r={8.064} fill="#0f1f22" />
    </G>
    <G id="anchor_chapter_test_09">
      <Circle cx={253} cy={2466.335} r={10} fill="#0f1f22" />
    </G>
  </Svg>
);
export default SharedLevelSvg;
