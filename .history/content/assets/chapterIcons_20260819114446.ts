import type React from "react";
import type { SvgProps } from "react-native-svg";

import LanternorIcon from "./chapter-icons/lanternor.svg";
import LanternorIconOff from "./chapter-icons/lanternor_off.svg";
import ManovreringIcon from "./chapter-icons/manovrering.svg";
import ManovreringIconOff from "./chapter-icons/manovrering_off.svg";
import MiljoIcon from "./chapter-icons/miljo.svg";
import MiljoIconOff from "./chapter-icons/miljo_off.svg";
import NavigationsinstrumentIcon from "./chapter-icons/navigationsinstrument.svg";
import NavigationsinstrumentIconOff from "./chapter-icons/navigationsinstrument_off.svg";
import NavigationsteoriIcon from "./chapter-icons/navigationsteori.svg";
import NavigationsteoriIconOff from "./chapter-icons/navigationsteori_off.svg";
import PraktiskNavigationIcon from "./chapter-icons/praktisk_navigation.svg";
import PraktiskNavigationIconOff from "./chapter-icons/praktisk_navigation_off.svg";
import SakerhetIcon from "./chapter-icons/sakerhet.svg";
import SakerhetIconOff from "./chapter-icons/sakerhet_off.svg";
import SignaleringIcon from "./chapter-icons/signalering.svg";
import SignaleringIconOff from "./chapter-icons/signalering_off.svg";
import SjokortetIcon from "./chapter-icons/sjokortet.svg";
import SjokortetIconOff from "./chapter-icons/sjokortet_off.svg";
import SjokortetSjomarkenIcon from "./chapter-icons/sjokortet_sjomarken.svg";
import SjokortetSjomarkenIconOff from "./chapter-icons/sjokortet_sjomarken_off.svg";
import SjokortsarbeteIcon from "./chapter-icons/sjokortsarbete.svg";
import SjokortsarbeteIconOff from "./chapter-icons/sjokortsarbete_off.svg";
import SjomanskapIcon from "./chapter-icons/sjomanskap.svg";
import SjomanskapIconOff from "./chapter-icons/sjomanskap_off.svg";
import SjukvardIcon from "./chapter-icons/sjukvard.svg";
import SjukvardIconOff from "./chapter-icons/sjukvard_off.svg";
import VaderIcon from "./chapter-icons/vader.svg";
import VaderIconOff from "./chapter-icons/vader_off.svg";
import VajningsreglerIcon from "./chapter-icons/vajningsregler.svg";
import VajningsreglerIconOff from "./chapter-icons/vajningsregler_off.svg";

// Level-ikoner
import LanternorLevelIcon from "./chapter-icons-level/lanternor_level.svg";
import ManovreringLevelIcon from "./chapter-icons-level/manovrering_level.svg";
import MiljoLevelIcon from "./chapter-icons-level/miljo_level.svg";
import NavigationsinstrumentLevelIcon from "./chapter-icons-level/navigationsinstrument_level.svg";
import NavigationsteoriLevelIcon from "./chapter-icons-level/navigationsteori_level.svg";
import PraktiskNavigationLevelIcon from "./chapter-icons-level/praktisk_navigation_level.svg";
import SakerhetLevelIcon from "./chapter-icons-level/sakerhet_level.svg";
import SignaleringLevelIcon from "./chapter-icons-level/signalering_level.svg";
import SjokortetLevelIcon from "./chapter-icons-level/sjokortet_level.svg";
import SjokortetSjomarkenLevelIcon from "./chapter-icons-level/sjokortet_sjomarken_level.svg";
import SjokortsarbeteLevelIcon from "./chapter-icons-level/sjokortsarbete_level.svg";
import SjomanskapLevelIcon from "./chapter-icons-level/sjomanskap_level.svg";
import SjukvardLevelIcon from "./chapter-icons-level/sjukvard_level.svg";
import VaderLevelIcon from "./chapter-icons-level/vader_level.svg";
import VajningsreglerLevelIcon from "./chapter-icons-level/vajningsregler_level.svg";

type MenuIconComponent = React.ComponentType<SvgProps>;

export const chapterIcons: Record<string, MenuIconComponent> = {
  sjokortet: SjokortetIcon,
  sjokortet_sjomarken: SjokortetSjomarkenIcon,
  sjokortsarbete: SjokortsarbeteIcon,
  navigationsteori: NavigationsteoriIcon,
  praktisk_navigation: PraktiskNavigationIcon,
  vajningsregler: VajningsreglerIcon,
  lanternor: LanternorIcon,
  manovrering: ManovreringIcon,
  navigationsinstrument: NavigationsinstrumentIcon,
  sjomanskap: SjomanskapIcon,
  signalering: SignaleringIcon,
  sakerhet: SakerhetIcon,
  sjukvard: SjukvardIcon,
  vader: VaderIcon,
  miljo: MiljoIcon,
};

export const chapterIconsOff: Record<string, MenuIconComponent> = {
  sjokortet: SjokortetIconOff,
  sjokortet_sjomarken: SjokortetSjomarkenIconOff,
  sjokortsarbete: SjokortsarbeteIconOff,
  navigationsteori: NavigationsteoriIconOff,
  praktisk_navigation: PraktiskNavigationIconOff,
  vajningsregler: VajningsreglerIconOff,
  lanternor: LanternorIconOff,
  manovrering: ManovreringIconOff,
  navigationsinstrument: NavigationsinstrumentIconOff,
  sjomanskap: SjomanskapIconOff,
  signalering: SignaleringIconOff,
  sakerhet: SakerhetIconOff,
  sjukvard: SjukvardIconOff,
  vader: VaderIconOff,
  miljo: MiljoIconOff,
};

export const levelChapterIcons: Record<string, MenuIconComponent> = {
  sjokortet: SjokortetLevelIcon,
  sjokortet_sjomarken: SjokortetSjomarkenLevelIcon,
  sjokortsarbete: SjokortsarbeteLevelIcon,
  navigationsteori: NavigationsteoriLevelIcon,
  praktisk_navigation: PraktiskNavigationLevelIcon,
  vajningsregler: VajningsreglerLevelIcon,
  lanternor: LanternorLevelIcon,
  manovrering: ManovreringLevelIcon,
  navigationsinstrument: NavigationsinstrumentLevelIcon,
  sjomanskap: SjomanskapLevelIcon,
  signalering: SignaleringLevelIcon,
  sakerhet: SakerhetLevelIcon,
  sjukvard: SjukvardLevelIcon,
  vader: VaderLevelIcon,
  miljo: MiljoLevelIcon,
};