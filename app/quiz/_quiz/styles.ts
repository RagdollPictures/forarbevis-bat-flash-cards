import { colorScheme } from "@/constants/colors";
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

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#111",
  },

  text: {
    marginTop: 8,
    fontSize: 16,
    color: "#111",
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
    color: "#111",
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
optionImageWrapper: {
  borderRadius: 6,
  overflow: "hidden",
},
  optionImage: {
    width: "100%",
    height: 110,
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
});