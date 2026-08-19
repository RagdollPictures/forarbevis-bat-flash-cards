import { colorScheme, colorSchemeGui, colorSchemeQuiz } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
     backgroundColor: colorSchemeGui.slate_900,
    
  },

  container: {
    
     backgroundColor:  colorSchemeGui.slate_900,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderRadius: 20,
     
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colorSchemeGui.Fuchsia_500,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colorSchemeGui.Fuchsia_500,
    
  },

  text: {
    marginTop: 8,
    fontSize: 16,
    color: colorSchemeGui.slate_200,
  },

 progressWrap: {
  marginTop: 12,
  marginBottom: 16,
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
    elevation: 5,
    backgroundColor: colorSchemeGui.slate_900,
    borderRadius: 14,
    padding: 16,
  },

  question: {
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 24,
    color: colorSchemeQuiz.brightGray,
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

  options: {
    marginTop: 14,
    gap: 10,
  },

  option: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: colorSchemeGui.slate_900,
     borderWidth: 2,
      borderBottomWidth: 4,
     color: colorSchemeGui.slate_200,
    borderColor: colorSchemeGui.slate_700,
   
  },

  optionsGrid: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
},

optionGrid: {
  width: "48%",
  marginBottom: 12,
},

  optionCorrect: {
    backgroundColor: colorSchemeGui.lime_700,
     borderBottomWidth: 4,
    borderColor: colorSchemeGui.lime_500,
    
  },

  optionWrong: {
    backgroundColor: colorSchemeGui.sky_900,
     borderBottomWidth: 4,
    borderColor: colorSchemeGui.sky_600,
  },

  optionText: {
    fontSize: 16,
    color: colorSchemeGui.slate_200,
  },

  optionTextCorrect: {
   fontSize: 16,
   fontWeight: "800",
  },

  optionTextWrong: {
    fontSize: 16,
  },

  optionTextChecked: {
    fontWeight: "700",
  },


optionImageWrapper: {
  width: "100%",
  aspectRatio: 1,
  borderRadius: 12,
  overflow: "hidden",
},
  optionImage: {
    width: "100%",
    height: "100%",
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
    backgroundColor: colorSchemeQuiz.green,
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
});