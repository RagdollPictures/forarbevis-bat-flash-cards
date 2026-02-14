// app/(tabs)/quiz-menu/styles.ts
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    padding: 24,
    paddingBottom: 120,
  },

  devPanel: {
    gap: 10,
    marginTop: 8,
    marginBottom: 12,
  },
  devResetBtn: {
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  devResetText: {
    fontSize: 13,
    fontWeight: "900",
    color: "#111",
    textAlign: "center",
  },
  devDebug: {
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 12,
  },
  devDebugTitle: {
    fontSize: 13,
    fontWeight: "900",
    color: "#111",
    marginBottom: 6,
  },
  devDebugText: {
    fontSize: 12,
    fontWeight: "700",
    color: "rgba(17,17,17,0.7)",
  },

  list: {
    marginTop: 16,
    gap: 12,
  },

  item: {
    borderRadius: 18,
    overflow: "hidden",
    position: "relative",
  },

  overlay: {
    padding: 16,
  },
  overlayUnlocked: {
    backgroundColor: "#ffffff",
  },
  overlayLocked: {
    backgroundColor: "#cccccc",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  content: {
    flex: 1,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },

  itemTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111",
    flex: 1,
  },

  lockWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  progressBarWrap: {
    marginTop: 10,
  },
  progressBarBg: {
    height: 10,
    borderRadius: 999,
    backgroundColor: "rgba(17,17,17,0.12)",
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 999,
  },
  progressLabel: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "800",
    color: "rgba(17,17,17,0.55)",
  },

  iconInner: {
    width: 44,
    height: 44,
    borderRadius: 999,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
});
