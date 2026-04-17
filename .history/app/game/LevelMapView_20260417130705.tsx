import { colorScheme } from "@/constants/colors";
import { Image } from "expo-image";
import React from "react";
import { Pressable, View } from "react-native";
import type { SavedQuizProgress } from "../../constants/flashcards/quizProgress";
import FloatingNode from "../quiz/components/FloatingNode";
import NodeTransitionWrap from "../quiz/components/NodeTransitionWrap";
import ProgressRing from "../quiz/components/ProgressRing";
import { getIconNameByQuizId } from "../quiz/icons/quizIconMap";
import SvgIcon from "../quiz/icons/svgIcon";
import { styles } from "../quiz/styles";
import LevelObject from "./LevelObject";
import type {
  ChapterTestPlacedNode,
  LevelObjectConfig,
  ObjectAnchor,
  PlacedNode,
  QuizPlacedNode,
  ReadPlacedNode,
} from "./levelScreenTypes";

function getFirstTryPercent(saved: SavedQuizProgress | null) {
  const total = saved?.firstTryTotal ?? 0;
  if (total <= 0) return 0;

  const correct = saved?.firstTryCorrect ?? 0;
  return Math.max(0, Math.min(100, Math.round((correct / total) * 100)));
}

type LevelMapViewProps = {
  layout: any;
  scale: number;
  screenWidth: number;
  LevelSvg: any;
  visibleSvgLayerIds: string[];
  bgAnchor: any;
  placedNodes: PlacedNode[];
  objectAnchors: ObjectAnchor[];
  objectMap?: Record<string, LevelObjectConfig>;
  objectAssets?: Record<string, any>;
  unlockedIds: Set<string>;
  progressByQuizId: Record<string, SavedQuizProgress>;
  pressedId: string | null;
  transitioningId: string | null;
  onPressReadNode: (node: ReadPlacedNode) => void;
  onPressQuizNode: (node: QuizPlacedNode | ChapterTestPlacedNode) => void;
};

export default function LevelMapView({
  layout,
  scale,
  screenWidth,
  LevelSvg,
  visibleSvgLayerIds,
  bgAnchor,
  placedNodes,
  objectAnchors,
  objectMap,
  objectAssets,
  unlockedIds,
  progressByQuizId,
  pressedId,
  transitioningId,
  onPressReadNode,
  onPressQuizNode,
}: LevelMapViewProps) {
  return (
    <View
      style={{
        position: "relative",
        width: "100%",
        height: layout.viewBox.height * scale,
      }}
    >
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
        style={{
          position: "absolute",
          left: 0,
          top: 0,
        }}
      />

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
              <FloatingNode
                delay={(node.x + node.y) % 1200}
                amplitude={3}
                rotateDeg={1.5}
              >
                <NodeTransitionWrap
                  isPressed={isPressed}
                  isTransitioning={isTransitioning}
                >
                
                  <View style={styles.ringWrap}>
                    <View style={styles.readCircle}>
                      <View style={styles.iconInner}>
                        <SvgIcon
                          name="book"
                          size={30}
                          color={isUnlocked ? colorScheme.darkBlue : "#bbb"}
                        />
                      </View>
                    </View>

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

        if (node.type === "quiz" || node.type === "chapter_test") {
          const saved = progressByQuizId[node.quizId] ?? null;
          const ringPercent = getFirstTryPercent(saved);
          const iconName =
            node.type === "chapter_test"
              ? "award"
              : getIconNameByQuizId(node.quizId);

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
              <FloatingNode
                delay={(node.x + node.y) % 1400}
                amplitude={0}
                rotateDeg={0}
              >
                <NodeTransitionWrap
                  isPressed={isPressed}
                  isTransitioning={isTransitioning}
                >
                 
                  <View style={styles.ringWrap}>
                    <ProgressRing percent={ringPercent} size={90} strokeWidth={7}>
                      <View style={styles.iconInner}>
                        <SvgIcon
                          name={iconName}
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