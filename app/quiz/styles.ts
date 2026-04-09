import { colorScheme } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  container: {
   
    paddingBottom: 120,
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
  opacity: 0.4,
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
});
