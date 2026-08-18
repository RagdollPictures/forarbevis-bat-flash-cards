import { colorScheme, colorSchemeQuiz } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
     backgroundColor: colorSchemeQuiz.darkGray,
    
  },

  container: {
    
     backgroundColor: colorSchemeQuiz.darkGray,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderRadius: 20,
     
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colorSchemeQuiz.purple,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colorSchemeQuiz.purple,
    
  },

  text: {
    marginTop: 8,
    fontSize: 16,
    color: colorSchemeQuiz.brightGray,
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
    elevation: 10,
    backgroundColor: colorSchemeQuiz.darkGray,
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
    backgroundColor: colorSchemeQuiz.darkGray,
     borderWidth: 2,
     borderBottomWidth: 4,
     color: colorSchemeQuiz.text,
    borderColor: colorSchemeQuiz.border,
   
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
    borderColor: colorScheme.blue,
  },

  optionWrong: {
    borderColor: colorScheme.orange,
  },

  optionText: {
    fontSize: 16,
    color: colorSchemeQuiz.text,
  },

  optionTextCorrect: {
    fontSize: 16,
    color: colorSchemeQuiz.green,
    fontWeight: "800",
  },

  optionTextWrong: {
    fontSize: 16,
    fontWeight: "800",
    color: colorScheme.orange,
  },

  optionTextChecked: {
    color: "#111",
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