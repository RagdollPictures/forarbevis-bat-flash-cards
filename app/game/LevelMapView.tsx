import { colorSchemeGui } from "@/constants/colors";
import { Image } from "expo-image";
import React from "react";
import { Pressable, Text, View } from "react-native";
import {
  Path,
  Svg,
  SvgXml,
  type SvgProps,
} from "react-native-svg";
import ButtonBgActiveBlue from "../../assets/menu/btn_active_blue.svg";
import ButtonBgActiveGreen from "../../assets/menu/btn_active_green.svg";
import ButtonBgActivePink from "../../assets/menu/btn_active_pink.svg";
import ButtonBgActivePurple from "../../assets/menu/btn_active_purple.svg";
import ButtonBgActiveYellow from "../../assets/menu/btn_active_yellow.svg";
import ButtonBgLocked from "../../assets/menu/btn_locked.svg";
import ChapterQuizIcon from "../../assets/menu/chapterquiz.svg";
import ChapterQuizIconLocked from "../../assets/menu/chapterquiz_locked.svg";
import QuestionIcon from "../../assets/menu/question_active.svg";
import QuestionIconLocked from "../../assets/menu/question_locked.svg";
import ReadIconBlue from "../../assets/menu/read_active_blue.svg";
import ReadIconGreen from "../../assets/menu/read_active_green.svg";
import ReadIconPink from "../../assets/menu/read_active_pink.svg";
import ReadIconPurple from "../../assets/menu/read_active_purple.svg";
import ReadIconYellow from "../../assets/menu/read_active_yellow.svg";
import ReadIconLocked from "../../assets/menu/read_locked.svg";
import type { SavedQuizProgress } from "../../constants/flashcards/quizProgress";

import NodeTransitionWrap from "../quiz/components/NodeTransitionWrap";
import ProgressRing from "../quiz/components/ProgressRing";
import { styles } from "../quiz/styles";
import LevelObject from "./LevelObject";
import type {
  ChapterTestPlacedNode,
  LevelObjectConfig,
  LevelTheme,
  ObjectAnchor,
  PlacedNode,
  QuizPlacedNode,
  ReadPlacedNode,
  TitlePlacedNode,
} from "./levelScreenTypes";

import { useContent } from "../../lib/content/ContentProvider";

function getFirstTryPercent(saved: SavedQuizProgress | null) {
  const total = saved?.firstTryTotal ?? 0;
  if (total <= 0) return 0;

  const correct = saved?.firstTryCorrect ?? 0;
  return Math.max(0, Math.min(100, Math.round((correct / total) * 100)));
}

type LevelMapViewProps = {
  levelId: string;
   levelLabel: string;
   chapterId: string;
  layout: any;
  scale: number;
  screenWidth: number;
  LevelSvg: any;
  visibleSvgLayerIds: string[];
  bgAnchor: any;
  placedNodes: PlacedNode[];
  titleNodes: TitlePlacedNode[];
  objectAnchors: ObjectAnchor[];
  objectMap?: Record<string, LevelObjectConfig>;
  objectAssets?: Record<string, any>;
  unlockedIds: Set<string>;
  progressByQuizId: Record<string, SavedQuizProgress>;
  pressedId: string | null;
  transitioningId: string | null;
  theme: LevelTheme;
  contentHeight: number;
  onPressReadNode: (node: ReadPlacedNode) => void;
  onPressQuizNode: (node: QuizPlacedNode | ChapterTestPlacedNode) => void;
};

type NodeSvgComponent = React.ComponentType<SvgProps>;

function getNodeIllustration(
  nodeType: "read" | "quiz",
  isUnlocked: boolean,
  levelId: string
): NodeSvgComponent {
  if (nodeType === "read") {
    if (!isUnlocked) {
      return ReadIconLocked;
    }

    const match = levelId.match(/(\d+)$/);
    const levelNumber = match ? Number(match[1]) : 1;
    const colorIndex = (levelNumber - 1) % activeReadIcons.length;

    return activeReadIcons[colorIndex];
  }

  return isUnlocked ? QuestionIcon : QuestionIconLocked;
}


const activeButtonBackgrounds: NodeSvgComponent[] = [
  ButtonBgActivePink,
  ButtonBgActiveYellow,
  ButtonBgActiveGreen,
  ButtonBgActiveBlue,
  ButtonBgActivePurple,
];

const activeReadIcons: NodeSvgComponent[] = [
  ReadIconPink,
  ReadIconYellow,
  ReadIconGreen,
  ReadIconBlue,
  ReadIconPurple,
];

function getNodeBackground(
  isUnlocked: boolean,
  levelId: string
): NodeSvgComponent {
  if (!isUnlocked) {
    return ButtonBgLocked;
  }

  const match = levelId.match(/(\d+)$/);
  const levelNumber = match ? Number(match[1]) : 1;

  const colorIndex = (levelNumber - 1) % activeButtonBackgrounds.length;

  return activeButtonBackgrounds[colorIndex];
}

function buildLevelPath(
  nodes: PlacedNode[]
) {
  if (nodes.length === 0) {
    return "";
  }

  const anchors = [...nodes].sort(
    (a, b) => a.y - b.y
  );

  const cornerRadius = 45;

  let path =
    `M ${anchors[0].x} ${anchors[0].y}`;

  for (
    let i = 1;
    i < anchors.length;
    i++
  ) {
    const from = anchors[i - 1];
    const to = anchors[i];

    const middleY =
      (from.y + to.y) / 2;

    const xDirection =
      to.x > from.x ? 1 : -1;

    const yDirection =
      to.y > from.y ? 1 : -1;

    const radius = Math.min(
      cornerRadius,
      Math.abs(to.x - from.x) / 2,
      Math.abs(to.y - from.y) / 2
    );

    path +=
      ` L ${from.x} ${
        middleY -
        radius * yDirection
      }`;

    path +=
      ` Q ${from.x} ${middleY}` +
      ` ${
        from.x +
        radius * xDirection
      } ${middleY}`;

    path +=
      ` L ${
        to.x -
        radius * xDirection
      } ${middleY}`;

    path +=
      ` Q ${to.x} ${middleY}` +
      ` ${to.x} ${
        middleY +
        radius * yDirection
      }`;

    path +=
      ` L ${to.x} ${to.y}`;
  }

  return path;
}

export default function LevelMapView({
  levelId,
   levelLabel,
   chapterId,
  layout,
  scale,
  screenWidth,
  LevelSvg,
  visibleSvgLayerIds,
  bgAnchor,
  placedNodes,
  titleNodes,
  objectAnchors,
  objectMap,
  objectAssets,
  unlockedIds,
  progressByQuizId,
  pressedId,
  transitioningId,
  theme,
  contentHeight,
  onPressReadNode,
  onPressQuizNode,
}: LevelMapViewProps) {

  const { structure } = useContent();

const structureLevel =
  structure.levels.find(
    (level) => level.id === levelId
  );

const remoteLevelIconSvg =
  structureLevel?.levelIconSvg;



  const titleTextColor = colorSchemeGui.slate_200;


const levelPath =
  buildLevelPath(placedNodes);
const visibleViewBoxHeight = contentHeight / scale;
 return (
  <View
    style={{
      position: "relative",
      width: "100%",
      height: contentHeight,
    }}
  >
  <View
    style={{
      position: "absolute",
      top: 24,
      left: 0,
      right: 0,
      zIndex: 20,
      alignItems: "center",
    }}
  >
   <View
  style={{
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  }}
>
 {remoteLevelIconSvg ? (
  <SvgXml
    xml={remoteLevelIconSvg}
    width={64}
    height={64}
  />
) : null}

  <Text
    style={{
      color: colorSchemeGui.slate_200,
      fontSize: 16,
      fontWeight: "900",
    }}
  >
    {levelLabel}
  </Text>
</View>
  </View>

      {bgAnchor ? (
        <Image
          contentFit="contain"
          style={{
            position: "absolute",
            left: (bgAnchor.x - layout.viewBox.width / 2) * scale,
            top: (bgAnchor.y - layout.viewBox.height / 2) * scale,
            width: layout.viewBox.width * scale,
            height: layout.viewBox.height * scale,
          }}
        />
      ) : null}

     <LevelSvg
   width={screenWidth}
  height={contentHeight}
  viewBox={`0 0 ${layout.viewBox.width} ${visibleViewBoxHeight}`}
  visibleLayerIds={visibleSvgLayerIds}
  decoCount={theme.decoCount}
  style={{
    position: "absolute",
    left: 0,
    top: 0,
  }}
/>

<Svg
   width={screenWidth}
  height={contentHeight}
  viewBox={`0 0 ${layout.viewBox.width} ${visibleViewBoxHeight}`}
  style={{
    position: "absolute",
    left: 0,
    top: 0,
  }}
  pointerEvents="none"
>
  {levelPath ? (
    <Path
      d={levelPath}
      fill="none"
      stroke="#e2e8f0"
      strokeWidth={3}
      strokeDasharray="1 10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ) : null}
</Svg>

      {titleNodes.map((node) => {
        return (
          
          <View
            key={node.id}
            style={{
              position: "absolute",
              left: node.x * scale,
              top: node.y * scale,
              width: node.width * scale,
              height: node.height * scale,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            
           <View
  style={{
    position: "relative",
    width: screenWidth,
    height: contentHeight,
    alignSelf: "center",
  }}
>
              
              <Text
                style={{
                  color: titleTextColor,
                  fontSize: 16,
                  fontWeight: "800",
                  textAlign: "center",
                }}
                numberOfLines={2}
                adjustsFontSizeToFit
              >
                {node.title}
              </Text>
            </View>
          </View>
        );
      })}

      {objectAnchors.map((anchor) => {
        const config = objectMap?.[anchor.id];
        if (!config) return null;

        return (
          <LevelObject
            key={anchor.id}
            config={config}
            assetMap={objectAssets}
            x={anchor.x * scale}
            y={anchor.y * scale}
            scale={scale}
          />
        );
      })}

      {placedNodes.map((node) => {
        const left = node.x * scale - 45;
        const top = node.y * scale - 45;
        const isUnlocked = unlockedIds.has(node.quizId);
        const isPressed = pressedId === node.id;
        const isTransitioning = transitioningId === node.id;

        if (node.type === "read") {
       const NodeIllustration = getNodeIllustration(
  "read",
  isUnlocked,
  levelId
);

       const NodeBackground = getNodeBackground(isUnlocked, levelId);
          return (
            <Pressable
              key={node.id}
              onPress={() => {
                if (!isUnlocked) return;
                onPressReadNode(node);
              }}
              disabled={!isUnlocked}
              style={[
                styles.absoluteNode,
                { left, top },
                !isUnlocked && styles.tileLocked,
              ]}
            >
              <NodeTransitionWrap
                isPressed={isPressed}
                isTransitioning={isTransitioning}
              >
                <View style={styles.ringWrap}>
                  <View style={styles.readCircle}>
                    <View style={styles.iconInner}>
  <NodeBackground
    width={64}
    height={64}
    style={{
      position: "absolute",
    }}
  />

  <NodeIllustration width={32} height={32} />
</View>
                  </View>

                 
                </View>
              </NodeTransitionWrap>
            </Pressable>
          );
        }

        if (node.type === "quiz") {
          const saved = progressByQuizId[node.quizId] ?? null;
          const ringPercent = getFirstTryPercent(saved);
        const NodeIllustration = getNodeIllustration(
  "quiz",
  isUnlocked,
  levelId
);
        const NodeBackground = getNodeBackground(isUnlocked, levelId);
          return (
            <Pressable
              key={node.id}
              onPress={() => {
                if (!isUnlocked) return;
                onPressQuizNode(node);
              }}
              disabled={!isUnlocked}
              style={[
                styles.absoluteNode,
                { left, top },
                !isUnlocked && styles.tileLocked,
              ]}
            >
              <NodeTransitionWrap
                isPressed={isPressed}
                isTransitioning={isTransitioning}
              >
                <View style={styles.ringWrap}>
                  <ProgressRing percent={ringPercent} size={80} strokeWidth={5}>
                    <View style={styles.iconInner}>
  <NodeBackground
    width={64}
    height={64}
    style={{
      position: "absolute",
    }}
  />

  <NodeIllustration width={32} height={32} />
</View>
                  </ProgressRing>

                
                </View>
              </NodeTransitionWrap>
            </Pressable>
          );
        }

       if (node.type === "chapter_test") {
  const NodeIllustration = isUnlocked
    ? ChapterQuizIcon
    : ChapterQuizIconLocked;

  return (
    <Pressable
      key={node.id}
      onPress={() => {
        if (!isUnlocked) return;
        onPressQuizNode(node);
      }}
      disabled={!isUnlocked}
      style={[
        styles.absoluteNode,
        { left, top },
        !isUnlocked && styles.tileLocked,
      ]}
    >
      <NodeTransitionWrap
        isPressed={isPressed}
        isTransitioning={isTransitioning}
      >
        <View style={styles.iconInner}>
          <NodeIllustration width={84} height={84} />
        </View>
      </NodeTransitionWrap>
    </Pressable>
  );
}

        return null;
      })}
    </View>
  );
}