import { colorScheme } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  container: {
   
    alignItems: "stretch",
  },

  devPanel: {
    gap: 10,
    marginTop: 8,
    marginBottom: 12
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
  flexWrap: "wrap",
  gap: 8,
  marginBottom: 16,
  paddingHorizontal: 12,
},

bonusBtn: {
  paddingHorizontal: 12,
  paddingVertical: 10,
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
 text: {
    marginTop: 8,
    fontSize: 16,
    color: "#ffffff",
  },
screen:{
  width: "100%",
}
,
screenTitle:{
  width: "100%",
},
content:{
  width: "100%",
},


  progressWrap: {
    marginTop: 12,
  },
  progressRow: {
    flexDirection: "row",
    width: "100%",
    gap: 2,
  },
  progressSeg: {
    flex: 1,
    height: 10,
    borderRadius: 10,
    backgroundColor: colorScheme.gray,
  },
  progressActive: {
    backgroundColor: colorScheme.gray,
  },
  progressCorrect: {
    backgroundColor: colorScheme.blue,
   
  
  },
  progressWrong: {
    backgroundColor: colorScheme.orange,
   
  },

  card: {
    marginTop: 16,
    elevation: 10,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 16,
  },
  question: {
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 24,
  },
  questionImage: {
    width: "100%",
    height: 220,
    marginTop: 12,
    borderRadius: 12,
  },

  options: {
    marginTop: 14,
    gap: 10,
  },
  option: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: "#f2f2f2",
  },
  optionCorrect: {
    backgroundColor: colorScheme.blue,
    
  },
  optionWrong: {
    backgroundColor: colorScheme.orange,
   
  },
   optionText: {
    fontSize: 16,
    color: "#111",
  },
  optionTextCorrect: {
    fontSize: 16,
    color: "#111",
    fontWeight: "800",
  },
   optionTextWrong: {
    fontSize: 16,
    fontWeight: "800",
    color: "#fff",
  },
  optionTextChecked: {
    color: "#111",
    fontWeight: "700",
  },

  actions: {
    marginTop: 14,
    gap: 10,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#111",
  },
  buttonSecondary: {
    backgroundColor: colorScheme.green,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonTextSecondary: {
    color: "#111",
  },

  resultCard: {
    marginTop: 24,
    padding: 24,
    borderRadius: 16,
    backgroundColor: "#f9fafb",
    alignItems: "center",
  },
  resultScore: {
    fontSize: 42,
    fontWeight: "800",
    color: "#111",
  },
  resultText: {
    marginTop: 6,
    fontSize: 16,
    color: "#444",
  },
 infoBox: {
  marginTop: 16,
  padding: 14,
  borderRadius: 12,
  backgroundColor: "#f3f4f6",
},

infoTitle: {
  fontSize: 16,
  fontWeight: "700",
  marginBottom: 6,
  color: "#111",
},

infoText: {
  fontSize: 15,
  lineHeight: 22,
  color: "#333",
},
optionImage: {
  width: "100%",
  height: 110,
},
nextButton:{
  width: "100%",
},
nextButtonText:{
  color:"#000",
}
});
