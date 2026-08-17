import type { FlashCard } from "./types";

import { lanternorFartyg } from "./forarintyg_se/lanternor/fartyg";
import { lanternorInledning } from "./forarintyg_se/lanternor/inledning";
import { lanternorMotorbatar } from "./forarintyg_se/lanternor/motorbatar";
import { lanternorSarskildaFartyg } from "./forarintyg_se/lanternor/sarskilda_fartyg";
import { lanternorSegelbatar } from "./forarintyg_se/lanternor/segelbatar";
import { lanternorSmabatar } from "./forarintyg_se/lanternor/smabatar";

import { manovreringBatMedRoder } from "./forarintyg_se/manovrering/bat_med_roder";
import { manovreringBatUtanRoder } from "./forarintyg_se/manovrering/bat_utan_roder";

export type QuizDefinition = {
  id: string;
  title: string;
  subtitle?: string;
  deck: FlashCard[];
};

export const quizRegistry: Record<string, QuizDefinition> = {
  lanternor: {
    id: "lanternor",
    title: "Lanternor",
    deck: [
      ...lanternorInledning,
      ...lanternorFartyg,
      ...lanternorMotorbatar,
      ...lanternorSarskildaFartyg,
      ...lanternorSegelbatar,
      ...lanternorSmabatar
    ],
  },
   manovrering: {
    id: "manovrering",
    title: "Manövrering",
    deck: [
      ...manovreringBatMedRoder,
      ...manovreringBatUtanRoder
    ],
  },
};

export const quizzes = Object.values(quizRegistry);

export function getQuizById(id: string) {
  return quizRegistry[id];
}
