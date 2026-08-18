import { colorScheme, colorSchemeQuiz } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colorSchemeQuiz.darkGray,
  },

  container: {
    flexGrow: 1,
    backgroundColor: colorSchemeQuiz.darkGray,
    paddingHorizontal: 40,
    paddingBottom: 16,
  },

  // Kapitel / quiztitel
  title: {
    fontSize: 17,
    fontWeight: "700",
    lineHeight: 22,
    color: colorSchemeQuiz.purple,

    marginTop: 18,
    marginBottom: 0,
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

  // Hela frågeområdet.
  // Inget vitt kort längre.
  card: {
    flex: 1,
    marginTop: 44,
    elevation: 0,
    backgroundColor: "transparent",
    borderRadius: 0,
    padding: 0,
  },

  question: {
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 32,
    color: colorSchemeQuiz.brightGray,
  },

  imageWrapper: {
    marginTop: 20,
    borderRadius: 20,
    overflow: "hidden",
  },

  questionImage: {
    width: "100%",
    height: 220,
  },

  // -----------------------------------------
  // SVARSALTERNATIV
  // -----------------------------------------

  options: {
    marginTop: 70,
    gap: 40,
  },

  option: {
    width: "100%",
    minHeight: 92,

    borderWidth: 2,
    borderColor: "#334750",
    borderRadius: 20,

    paddingVertical: 18,
    paddingHorizontal: 16,

    backgroundColor: "transparent",

    alignItems: "center",
    justifyContent: "center",
  },

  // Används när användaren valt ett svar,
  // innan svaret går vidare.
  optionSelected: {
    backgroundColor: "#1c3037",
    borderColor: "#1687ab",

    // Lite kraftigare nederkant som i mockupen
    borderBottomWidth: 7,
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

  optionText: {
    fontSize: 20,
    lineHeight: 26,
    color: colorSchemeQuiz.brightGray,
    textAlign: "center",
  },

  optionTextSelected: {
    color: colorSchemeQuiz.brightGray,
  },

  /*
   * Behåller dessa tills vidare eftersom nuvarande
   * QuizCard.tsx fortfarande använder dem.
   */

  optionCorrect: {
    backgroundColor: colorScheme.blue,
    borderColor: colorScheme.blue,
  },

  optionWrong: {
    backgroundColor: colorScheme.orange,
    borderColor: colorScheme.orange,
  },

  optionTextCorrect: {
    fontSize: 20,
    lineHeight: 26,
    color: colorSchemeQuiz.brightGray,
    fontWeight: "700",
    textAlign: "center",
  },

  optionTextWrong: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
  },

  optionTextChecked: {
    color: colorSchemeQuiz.brightGray,
    fontWeight: "700",
  },

  // -----------------------------------------
  // SVARSBILDER
  // -----------------------------------------

  optionImageWrapper: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 16,
    overflow: "hidden",
  },

  optionImage: {
    width: "100%",
    height: "100%",
  },

  // -----------------------------------------
  // NÄSTA-KNAPP
  // -----------------------------------------

  actions: {
    marginTop: "auto",
    paddingTop: 40,
  },

  button: {
    width: "100%",
    minHeight: 80,

    borderRadius: 20,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#334750",
  },

  // Grå/inaktiv knapp innan något svar är valt
  buttonDisabled: {
    backgroundColor: "#334750",
  },

  // Grön knapp efter att ett svar är valt
  buttonActive: {
    backgroundColor: colorSchemeQuiz.green,

    // Ger den mörkgröna kanten/skuggan från mockupen
    borderBottomWidth: 7,
    borderBottomColor: "#60aF00",
  },

  /*
   * Behålls eftersom nuvarande QuizCard fortfarande
   * använder buttonSecondary.
   */
  buttonSecondary: {
    backgroundColor: colorSchemeQuiz.green,
  },

  buttonText: {
    color: "#000",
    fontWeight: "900",
    fontSize: 20,
  },

  buttonTextSecondary: {
    color: "#000",
  },

  // -----------------------------------------
  // RESULTAT
  // -----------------------------------------

  resultCard: {
    marginTop: 24,
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    backgroundColor: "transparent",
  },

  resultScore: {
    fontSize: 42,
    fontWeight: "800",
    color: colorSchemeQuiz.brightGray,
  },

  resultText: {
    marginTop: 6,
    fontSize: 18,
    color: colorSchemeQuiz.brightGray,
  },

  // -----------------------------------------
  // FÖRKLARING EFTER SVAR
  // -----------------------------------------

  infoBox: {
    marginTop: 20,
    padding: 16,

    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#334750",

    backgroundColor: "#1c3037",
  },

  infoTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 6,
    color: colorSchemeQuiz.brightGray,
  },

  infoText: {
    fontSize: 16,
    lineHeight: 23,
    color: colorSchemeQuiz.brightGray,
  },
});