import { colorScheme } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colorScheme.blue,
  },

  container: {
    alignItems: "stretch",
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

  grid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 18,
  },

  tile: {
    width: "48%",
    alignItems: "center",
  },

  ringWrap: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  lockBadge: {
    position: "absolute",
    right: -2,
    bottom: -2,
    width: 22,
    height: 22,
    borderRadius: 999,
    backgroundColor: colorScheme.darkBlue,
    alignItems: "center",
    justifyContent: "center",
  },

  iconInner: {
    width: 44,
    height: 44,
    borderRadius: 999,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    width: "100%",
    textAlign: "center",
    fontSize: 13,
    fontWeight: "900",
    color: "#111",
  },

  tileLocked: {
    opacity: 1,
  },

  titleLocked: {
    color: "rgba(17,17,17,0.55)",
  },

  absoluteNode: {
    position: "absolute",
    width: 90,
    alignItems: "center",
  },

  readCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },

  bonusBar: {
    flexDirection: "row",
    flexWrap: "nowrap",
  minHeight: 48,
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingBottom: 10,
  },

  bonusBtn: {
    justifyContent: "center",
   paddingHorizontal: 14,
  paddingVertical: 10,
    marginRight: 8,
    borderRadius: 999,
    backgroundColor: colorScheme.darkBlue,
  },

  bonusBtnLocked: {
    opacity: 0.4,
  },

  bonusBtnText: {
    color: "#fff",
    fontWeight: "700",
  },

  levelMenuToggle: {
    marginHorizontal: 12,
    marginBottom: 12,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: colorScheme.darkBlue,
    alignItems: "center",
  },

  levelMenuToggleText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  levelMenuWrap: {
    gap: 12,
    marginHorizontal: 12,
    marginBottom: 16,
  },

  levelMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 18,
    backgroundColor: "#fff",
  },

  levelMenuItemLocked: {
    opacity: 0.45,
  },

  levelMenuItemCurrent: {
    borderWidth: 2,
    borderColor: colorScheme.darkBlue,
  },

  levelMenuIconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#f4f4f4",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  levelMenuLockBadge: {
    position: "absolute",
    right: -4,
    bottom: -4,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#222",
    alignItems: "center",
    justifyContent: "center",
  },

  levelMenuLabel: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
  },

  levelMenuLabelLocked: {
    color: "#777",
  },

  imageWrapper: {
  marginTop: 12,
  borderRadius: 20,
  overflow: "hidden",
},

questionImage: {
  width: "100%",
  height: 220,
},
optionImageWrapper: {
  borderRadius: 12,
  overflow: "hidden",
},

optionImage: {
  width: "100%",
  height: 110,
},
sectionTitle:{
  color: "#000"
},
headerTitle:{
  color: "#000"
},levelStickyTitle: {
 
  paddingHorizontal: 16,
  paddingVertical: 10,
  borderRadius: 16,
  backgroundColor: "rgba(255,255,255,0.92)",
  color: "#163049",
  fontSize: 18,
  fontWeight: "800",
},
});