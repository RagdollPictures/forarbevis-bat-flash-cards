import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#1e2939",
  },
  container: {
    padding: 24,
    paddingBottom: 120,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#ffffff",
  },
  text: {
    marginTop: 8,
    fontSize: 16,
    color: "#ffffff",
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
    backgroundColor: "rgba(255,255,255,0.22)",
  },
  progressActive: {
    backgroundColor: "rgba(255,255,255,0.38)",
  },
  progressCorrect: {
    backgroundColor: "#1e8e3e",
  },
  progressWrong: {
    backgroundColor: "#c62828",
  },

  card: {
    marginTop: 16,
    borderWidth: 1,
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
    backgroundColor: "#1e8e3e",
  },
  optionWrong: {
    backgroundColor: "#c62828",
  },
  optionText: {
    fontSize: 16,
    color: "#111",
  },
  optionTextChecked: {
    color: "#ffffff",
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
    backgroundColor: "#f3f3f3",
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
});
