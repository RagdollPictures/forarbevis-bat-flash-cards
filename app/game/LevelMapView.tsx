import { colorScheme } from "@/constants/colors";
import { Image } from "expo-image";
import React from "react";
import { Pressable, Text, View } from "react-native";
import type { SvgProps } from "react-native-svg";

import BookIcon from "../../assets/menu/book.svg";
import BookIconOff from "../../assets/menu/book_off.svg";
import QuestionIcon from "../../assets/menu/question.svg";
import QuestionIconOff from "../../assets/menu/question_off.svg";
import type { SavedQuizProgress } from "../../constants/flashcards/quizProgress";
import FloatingNode from "../quiz/components/FloatingNode";
import NodeTransitionWrap from "../quiz/components/NodeTransitionWrap";
import ProgressRing from "../quiz/components/ProgressRing";
import SvgIcon from "../quiz/icons/svgIcon";
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

function getFirstTryPercent(saved: SavedQuizProgress | null) {
  const total = saved?.firstTryTotal ?? 0;
  if (total <= 0) return 0;

  const correct = saved?.firstTryCorrect ?? 0;
  return Math.max(0, Math.min(100, Math.round((correct / total) * 100)));
}

type LevelMapViewProps = {
  levelId: string;
   levelLabel: string;
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
  onPressReadNode: (node: ReadPlacedNode) => void;
  onPressQuizNode: (node: QuizPlacedNode | ChapterTestPlacedNode) => void;
};

type NodeSvgComponent = React.ComponentType<SvgProps>;

function getNodeIllustration(
  nodeType: "read" | "quiz",
  isUnlocked: boolean
): NodeSvgComponent {
  if (nodeType === "read") {
    return isUnlocked ? BookIcon : BookIconOff;
  }

  return isUnlocked ? QuestionIcon : QuestionIconOff;
}
export default function LevelMapView({
  levelId,
   levelLabel,
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
  onPressReadNode,
  onPressQuizNode,
}: LevelMapViewProps) {
  const titleBackgroundColor =
    theme?.palette?.accent ??
    theme?.layerColors?.level_001 ??
    colorScheme.darkBlue;

  const titleTextColor = theme?.palette?.text ?? "#ffffff";

  return (
    <View
  style={{
    position: "relative",
    width: "100%",
    height: layout.viewBox.height * scale,
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
        borderRadius: 16,
        backgroundColor: titleBackgroundColor,
      }}
    >
      <Text
        style={{
          color: titleTextColor,
          fontSize: 24,
          fontWeight: "900",
          textAlign: "center",
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
        height={layout.viewBox.height * scale}
        visibleLayerIds={visibleSvgLayerIds}
         decoCount={theme.decoCount}
        layerColors={theme.layerColors}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
        }}
      />

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
                maxWidth: "100%",
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 14,
                backgroundColor: titleBackgroundColor,
                alignItems: "center",
                justifyContent: "center",
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
         const NodeIllustration = getNodeIllustration("read", isUnlocked);

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
                      <NodeIllustration width={80} height={80} />
                    </View>
                  </View>

                  {!isUnlocked ? (
                    <View style={styles.lockBadge}>
                      <SvgIcon name="lock" size={14} color="#ffffff" />
                    </View>
                  ) : null}
                </View>
              </NodeTransitionWrap>
            </Pressable>
          );
        }

        if (node.type === "quiz") {
          const saved = progressByQuizId[node.quizId] ?? null;
          const ringPercent = getFirstTryPercent(saved);
        const NodeIllustration = getNodeIllustration("quiz", isUnlocked);

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
                  <ProgressRing percent={ringPercent} size={90} strokeWidth={7}>
                    <View style={styles.iconInner}>
                      <NodeIllustration width={80} height={80} />
                    </View>
                  </ProgressRing>

                  {!isUnlocked ? (
                    <View style={styles.lockBadge}>
                      <SvgIcon name="lock" size={14} color="#ffffff" />
                    </View>
                  ) : null}
                </View>
              </NodeTransitionWrap>
            </Pressable>
          );
        }

        if (node.type === "chapter_test") {
          const saved = progressByQuizId[node.quizId] ?? null;
          const ringPercent = getFirstTryPercent(saved);

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
              <FloatingNode delay={0} amplitude={10} rotateDeg={12}>
                <NodeTransitionWrap
                  isPressed={isPressed}
                  isTransitioning={isTransitioning}
                >
                  <View style={styles.ringWrap}>
                    <ProgressRing percent={ringPercent} size={90} strokeWidth={7}>
                      <View style={styles.iconInner}>
                        <SvgIcon
                          name="boat"
                          size={30}
                          color={isUnlocked ? colorScheme.darkBlue : "#bbb"}
                        />
                      </View>
                    </ProgressRing>

                    {!isUnlocked ? (
                      <View style={styles.lockBadge}>
                        <SvgIcon name="lock" size={14} color="#ffffff" />
                      </View>
                    ) : null}
                  </View>
                </NodeTransitionWrap>
              </FloatingNode>
            </Pressable>
          );
        }

        return null;
      })}
    </View>
  );
}