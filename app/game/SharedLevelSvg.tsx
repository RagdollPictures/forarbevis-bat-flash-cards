import * as React from "react";
import Svg, { G, Circle } from "react-native-svg";
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
  <Svg id="Layer_1" data-name="Layer 1" viewBox="0 0 375.0001 6107.5988" {...props}>
    <G id="anchor_read_001" data-name="anchor read 001">
      <Circle cx={113.899} cy={140.758} r={8.064} fill="#0f172b" />
    </G>
    <G id="anchor_quiz_001" data-name="anchor quiz 001">
      <Circle cx={250.321} cy={265.688} r={8.064} fill="#0f172b" />
    </G>
    <G id="anchor_read_002" data-name="anchor read 002">
      <Circle cx={113.899} cy={415.128} r={8.064} fill="#0f172b" />
    </G>
    <G id="anchor_chapter_test_001" data-name="anchor chapter test 001">
      <Circle cx={113.899} cy={415.128} r={8.064} fill="#0f172b" />
    </G>
    <G id="anchor_quiz_002" data-name="anchor quiz 002">
      <Circle cx={250.321} cy={553.498} r={8.064} fill="#0f172b" />
    </G>
    <G id="anchor_read_003" data-name="anchor read 003">
      <Circle cx={113.899} cy={698.547} r={8.064} fill="#0f172b" />
    </G>
    <G id="anchor_chapter_test_002" data-name="anchor chapter test 002">
      <Circle cx={113.899} cy={698.547} r={8.064} fill="#0f172b" />
    </G>
    <G id="anchor_quiz_003" data-name="anchor quiz 003">
      <Circle cx={250.321} cy={833.993} r={9.078} fill="#0f172b" />
    </G>
    <G id="anchor_read_004" data-name="anchor read 004">
      <Circle cx={113.899} cy={981.785} r={8.064} fill="#0f172b" />
    </G>
    <G id="anchor_chapter_test_003" data-name="anchor chapter test 003">
      <Circle cx={113.899} cy={981.785} r={8.064} fill="#0f172b" />
    </G>
    <G id="anchor_quiz_004" data-name="anchor quiz 004">
      <Circle cx={250.321} cy={1126.376} r={8.064} fill="#0f172b" />
    </G>
    <G id="anchor_read_005" data-name="anchor read 005">
      <Circle cx={113.899} cy={1270.967} r={8.064} fill="#0f172b" />
    </G>
    <G id="anchor_chapter_test_004" data-name="anchor chapter test 004">
      <Circle cx={113.899} cy={1270.967} r={8.064} fill="#0f172b" />
    </G>
    <G id="anchor_quiz_005" data-name="anchor quiz 005">
      <Circle cx={250.321} cy={1406.871} r={9.359} fill="#0f172b" />
    </G>
    <G id="anchor_read_006" data-name="anchor read 006">
      <Circle cx={113.899} cy={1552.834} r={8.064} fill="#0f172b" />
    </G>
    <G id="anchor_chapter_test_005" data-name="anchor chapter test 005">
      <Circle cx={113.899} cy={1552.834} r={8.064} fill="#0f172b" />
    </G>
    <G id="anchor_quiz_006" data-name="anchor quiz 006">
      <Circle
        cx={250.321}
        cy={1694.224}
        r={8.757}
        fill="#0f172b"
        transform="rotate(-2.199 250.317 1694.192)"
      />
    </G>
    <G id="anchor_read_007" data-name="anchor read 007">
      <Circle cx={113.899} cy={1839.273} r={8.064} fill="#0f172b" />
    </G>
    <G id="anchor_chapter_test_006" data-name="anchor chapter test 006">
      <Circle cx={113.899} cy={1839.273} r={8.064} fill="#0f172b" />
    </G>
    <G id="anchor_quiz_007" data-name="anchor quiz 007">
      <Circle cx={250.321} cy={1978.377} r={8.064} fill="#0f172b" />
    </G>
    <G id="anchor_read_008" data-name="anchor read 008">
      <Circle cx={113.899} cy={2133.027} r={8.064} fill="#0f172b" />
    </G>
    <G id="anchor_chapter_test_007" data-name="anchor chapter test 007">
      <Circle cx={113.899} cy={2133.027} r={8.064} fill="#0f172b" />
    </G>
    <G id="anchor_quiz_008" data-name="anchor quiz 008">
      <Circle
        cx={250.321}
        cy={2268.931}
        r={8.529}
        fill="#0f172b"
        transform="rotate(-88.494 250.321 2268.93)"
      />
    </G>
    <G id="anchor_read_009" data-name="anchor read 009">
      <Circle cx={113.899} cy={2414.893} r={8.064} fill="#0f172b" />
    </G>
    <G id="anchor_chapter_test_008" data-name="anchor chapter test 008">
      <Circle cx={113.899} cy={2414.893} r={8.064} fill="#0f172b" />
    </G>
    <G id="anchor_quiz_009" data-name="anchor quiz 009">
      <Circle cx={250.321} cy={2556.284} r={8.064} fill="#0f172b" />
    </G>
    <G id="anchor_read_010" data-name="anchor read 010">
      <Circle cx={113.899} cy={2701.332} r={8.064} fill="#0f172b" />
    </G>
    <G id="anchor_chapter_test_009" data-name="anchor chapter test 009">
      <Circle cx={113.899} cy={2701.332} r={10} fill="#0f172b" />
    </G>
    <G id="anchor_quiz_010" data-name="anchor quiz 010">
      <Circle cx={250.321} cy={2840.436} r={8.064} fill="#0f172b" />
    </G>
    <G id="anchor_read_011" data-name="anchor read 011">
      <Circle cx={113.899} cy={2965.367} r={8.064} fill="#0f172b" />
    </G>
    <G id="anchor_chapter_test_010" data-name="anchor chapter test 010">
      <Circle cx={113.899} cy={2965.367} r={8.064} fill="#0f172b" />
    </G>
    <G id="anchor_quiz_011" data-name="anchor quiz 011">
      <Circle cx={250.321} cy={3114.807} r={8.064} fill="#0f172b" />
    </G>
    <G id="anchor_read_012" data-name="anchor read 012">
      <Circle cx={113.899} cy={3253.177} r={8.064} fill="#0f172b" />
    </G>
    <G id="anchor_chapter_test_011" data-name="anchor chapter test 011">
      <Circle cx={113.899} cy={3253.177} r={8.064} fill="#0f172b" />
    </G>
    <G id="anchor_quiz_012" data-name="anchor quiz 012">
      <Circle cx={250.321} cy={3398.226} r={9.078} fill="#0f172b" />
    </G>
    <G id="anchor_read_013" data-name="anchor read 013">
      <Circle cx={113.899} cy={3533.672} r={8.064} fill="#0f172b" />
    </G>
    <G id="anchor_chapter_test_012" data-name="anchor chapter test 012">
      <Circle cx={113.899} cy={3533.672} r={8.064} fill="#0f172b" />
    </G>
    <G id="anchor_quiz_013" data-name="anchor quiz 013">
      <Circle cx={250.321} cy={3681.464} r={8.064} fill="#0f172b" />
    </G>
    <G id="anchor_read_014" data-name="anchor read 014">
      <Circle cx={113.899} cy={3826.055} r={8.064} fill="#0f172b" />
    </G>
    <G id="anchor_chapter_test_013" data-name="anchor chapter test 013">
      <Circle cx={113.899} cy={3826.055} r={8.064} fill="#0f172b" />
    </G>
    <G id="anchor_quiz_014" data-name="anchor quiz 014">
      <Circle cx={250.321} cy={3970.646} r={9.359} fill="#0f172b" />
    </G>
    <G id="anchor_read_015" data-name="anchor read 015">
      <Circle cx={113.899} cy={4106.55} r={8.064} fill="#0f172b" />
    </G>
    <G id="anchor_chapter_test_014" data-name="anchor chapter test 014">
      <Circle cx={113.899} cy={4106.55} r={8.064} fill="#0f172b" />
    </G>
    <G id="anchor_quiz_015" data-name="anchor quiz 015">
      <Circle
        cx={250.321}
        cy={4252.513}
        r={8.757}
        fill="#0f172b"
        transform="rotate(-88.494 250.322 4252.513)"
      />
    </G>
    <G id="anchor_read_016" data-name="anchor read 016">
      <Circle cx={113.899} cy={4393.903} r={8.064} fill="#0f172b" />
    </G>
    <G id="anchor_chapter_test_015" data-name="anchor chapter test 015">
      <Circle cx={113.899} cy={4393.903} r={8.064} fill="#0f172b" />
    </G>
    <G id="anchor_quiz_016" data-name="anchor quiz 016">
      <Circle
        cx={250.321}
        cy={4538.952}
        r={8.063}
        fill="#0f172b"
        transform="rotate(-89.182 250.322 4538.952)"
      />
    </G>
    <G id="anchor_read_017" data-name="anchor read 017">
      <Circle cx={113.899} cy={4678.056} r={8.063} fill="#0f172b" />
    </G>
    <G id="anchor_chapter_test_016" data-name="anchor chapter test 016">
      <Circle cx={113.899} cy={4678.056} r={8.063} fill="#0f172b" />
    </G>
    <G id="anchor_quiz_017" data-name="anchor quiz 017">
      <Circle cx={250.321} cy={4832.706} r={8.528} fill="#0f172b" />
    </G>
    <G id="anchor_read_018" data-name="anchor read 018">
      <Circle cx={113.899} cy={4968.61} r={8.063} fill="#0f172b" />
    </G>
    <G id="anchor_chapter_test_017" data-name="anchor chapter test 017">
      <Circle cx={113.899} cy={4968.61} r={8.063} fill="#0f172b" />
    </G>
    <G id="anchor_quiz_018" data-name="anchor quiz 018">
      <Circle
        cx={250.321}
        cy={5114.572}
        r={8.063}
        fill="#0f172b"
        transform="rotate(-89.182 250.322 5114.573)"
      />
    </G>
    <G id="anchor_read_019" data-name="anchor read 019">
      <Circle cx={113.899} cy={5255.963} r={8.063} fill="#0f172b" />
    </G>
    <G id="anchor_chapter_test_018" data-name="anchor chapter test 018">
      <Circle cx={113.899} cy={5255.963} r={10} fill="#0f172b" />
    </G>
    <G id="anchor_quiz_019" data-name="anchor quiz 019">
      <Circle cx={250.321} cy={5401.011} r={8.528} fill="#0f172b" />
    </G>
    <G id="anchor_read_020" data-name="anchor read 020">
      <Circle cx={113.899} cy={5540.116} r={8.063} fill="#0f172b" />
    </G>
    <G id="anchor_chapter_test_019" data-name="anchor chapter test 019">
      <Circle cx={113.899} cy={5540.116} r={8.063} fill="#0f172b" />
    </G>
    <G id="anchor_quiz_020" data-name="anchor quiz 020">
      <Circle
        cx={250.321}
        cy={5665.046}
        r={8.063}
        fill="#0f172b"
        transform="rotate(-89.182 250.322 5665.047)"
      />
    </G>
    <G id="anchor_chapter_test_020" data-name="anchor chapter test 020">
      <Circle cx={113.899} cy={5814.486} r={10} fill="#0f172b" />
    </G>
    <G id="anchor_graphics_001" data-name="anchor graphics 001">
      <G id="anchor_read_001-2" data-name="anchor read 001">
        <Circle cx={113.899} cy={265.688} r={8.064} fill="#e21a1a" />
      </G>
    </G>
    <G id="anchor_graphics_002" data-name="anchor graphics 002">
      <G id="anchor_read_001-3" data-name="anchor read 001">
        <Circle cx={113.899} cy={553.498} r={8.064} fill="#e21a1a" />
      </G>
    </G>
    <G id="anchor_graphics_003" data-name="anchor graphics 003">
      <G id="anchor_read_001-4" data-name="anchor read 001">
        <Circle cx={113.899} cy={833.993} r={8.064} fill="#e21a1a" />
      </G>
    </G>
    <G id="anchor_graphics_004" data-name="anchor graphics 004">
      <G id="anchor_read_001-5" data-name="anchor read 001">
        <Circle cx={113.899} cy={1126.376} r={8.064} fill="#e21a1a" />
      </G>
    </G>
    <G id="anchor_graphics_005" data-name="anchor graphics 005">
      <G id="anchor_read_001-6" data-name="anchor read 001">
        <Circle cx={113.899} cy={1406.871} r={8.064} fill="#e21a1a" />
      </G>
    </G>
    <G id="anchor_graphics_006" data-name="anchor graphics 006">
      <G id="anchor_read_001-7" data-name="anchor read 001">
        <Circle cx={113.899} cy={1699.463} r={8.064} fill="#e21a1a" />
      </G>
    </G>
    <G id="anchor_graphics_007" data-name="anchor graphics 007">
      <G id="anchor_read_001-8" data-name="anchor read 001">
        <Circle cx={113.899} cy={1978.377} r={8.064} fill="#e21a1a" />
      </G>
    </G>
    <G id="anchor_graphics_008" data-name="anchor graphics 008">
      <G id="anchor_read_001-9" data-name="anchor read 001">
        <Circle cx={113.899} cy={2268.931} r={8.064} fill="#e21a1a" />
      </G>
    </G>
    <G id="anchor_graphics_009" data-name="anchor graphics 009">
      <G id="anchor_read_001-10" data-name="anchor read 001">
        <Circle cx={113.899} cy={2556.284} r={8.064} fill="#e21a1a" />
      </G>
    </G>
    <G id="anchor_graphics_010" data-name="anchor graphics 010">
      <G id="anchor_read_001-11" data-name="anchor read 001">
        <Circle cx={113.899} cy={2840.436} r={8.064} fill="#e21a1a" />
      </G>
    </G>
    <G id="anchor_graphics_011" data-name="anchor graphics 011">
      <G id="anchor_read_001-12" data-name="anchor read 001">
        <Circle cx={113.899} cy={3114.807} r={8.064} fill="#e21a1a" />
      </G>
    </G>
    <G id="anchor_graphics_012" data-name="anchor graphics 012">
      <G id="anchor_read_001-13" data-name="anchor read 001">
        <Circle cx={113.899} cy={3399.24} r={8.064} fill="#e21a1a" />
      </G>
    </G>
    <G id="anchor_graphics_013" data-name="anchor graphics 013">
      <G id="anchor_read_001-14" data-name="anchor read 001">
        <Circle cx={115.917} cy={3681.881} r={8.064} fill="#e21a1a" />
      </G>
    </G>
    <G id="anchor_graphics_014" data-name="anchor graphics 014">
      <G id="anchor_read_001-15" data-name="anchor read 001">
        <Circle cx={115.917} cy={3978.71} r={8.064} fill="#e21a1a" />
      </G>
    </G>
    <G id="anchor_graphics_015" data-name="anchor graphics 015">
      <G id="anchor_read_001-16" data-name="anchor read 001">
        <Circle cx={115.917} cy={4252.513} r={8.064} fill="#e21a1a" />
      </G>
    </G>
    <G id="anchor_graphics_016" data-name="anchor graphics 016">
      <G id="anchor_read_001-17" data-name="anchor read 001">
        <Circle cx={115.917} cy={4538.952} r={8.064} fill="#e21a1a" />
      </G>
    </G>
    <G id="anchor_graphics_017" data-name="anchor graphics 017">
      <G id="anchor_read_001-18" data-name="anchor read 001">
        <Circle cx={115.917} cy={4832.706} r={8.064} fill="#e21a1a" />
      </G>
    </G>
    <G id="anchor_graphics_018" data-name="anchor graphics 018">
      <G id="anchor_read_001-19" data-name="anchor read 001">
        <Circle cx={115.917} cy={5114.572} r={8.064} fill="#e21a1a" />
      </G>
    </G>
    <G id="anchor_graphics_019" data-name="anchor graphics 019">
      <G id="anchor_read_001-20" data-name="anchor read 001">
        <Circle cx={115.917} cy={5401.011} r={8.064} fill="#e21a1a" />
      </G>
    </G>
    <G id="anchor_graphics_020" data-name="anchor graphics 020">
      <G id="anchor_read_001-21" data-name="anchor read 001">
        <Circle cx={115.917} cy={5665.046} r={8.064} fill="#e21a1a" />
      </G>
    </G>
    <G id="anchor_graphics_021" data-name="anchor graphics 021">
      <G id="anchor_read_001-22" data-name="anchor read 001">
        <Circle cx={115.917} cy={5992.574} r={8.064} fill="#e21a1a" />
      </G>
    </G>
  </Svg>
);
export default SharedLevelSvg;
