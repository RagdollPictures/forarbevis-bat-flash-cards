import type React from "react";
import type { SvgProps } from "react-native-svg";

import LanternorIcon from "../../assets/menu/lanternor.svg";
import LanternorIconOff from "../../assets/menu/lanternor_off.svg";
import ManovreringIcon from "../../assets/menu/manovrering.svg";
import ManovreringIconOff from "../../assets/menu/manovrering_off.svg";
import MiljoIcon from "../../assets/menu/miljo.svg";
import MiljoIconOff from "../../assets/menu/miljo_off.svg";
import NavigationsinstrumentIcon from "../../assets/menu/navigationsinstrument.svg";
import NavigationsinstrumentIconOff from "../../assets/menu/navigationsinstrument_off.svg";
import NavigationsteoriIcon from "../../assets/menu/navigationsteori.svg";
import NavigationsteoriIconOff from "../../assets/menu/navigationsteori_off.svg";
import PraktiskNavigationIcon from "../../assets/menu/praktisk_navigation.svg";
import PraktiskNavigationIconOff from "../../assets/menu/praktisk_navigation_off.svg";
import SakerhetIcon from "../../assets/menu/sakerhet.svg";
import SakerhetIconOff from "../../assets/menu/sakerhet_off.svg";
import SignaleringIcon from "../../assets/menu/signalering.svg";
import SignaleringIconOff from "../../assets/menu/signalering_off.svg";
import SjokortetIcon from "../../assets/menu/sjokortet.svg";
import SjokortetIconOff from "../../assets/menu/sjokortet_off.svg";
import SjokortetSjomarkenIcon from "../../assets/menu/sjokortet_sjomarken.svg";
import SjokortetSjomarkenIconOff from "../../assets/menu/sjokortet_sjomarken_off.svg";
import SjokortsarbeteIcon from "../../assets/menu/sjokortsarbete.svg";
import SjokortsarbeteIconOff from "../../assets/menu/sjokortsarbete_off.svg";
import SjomanskapIcon from "../../assets/menu/sjomanskap.svg";
import SjomanskapIconOff from "../../assets/menu/sjomanskap_off.svg";
import SjukvardIcon from "../../assets/menu/sjukvard.svg";
import SjukvardIconOff from "../../assets/menu/sjukvard_off.svg";
import VaderIcon from "../../assets/menu/vader.svg";
import VaderIconOff from "../../assets/menu/vader_off.svg";
import VajningsreglerIcon from "../../assets/menu/vajningsregler.svg";
import VajningsreglerIconOff from "../../assets/menu/vajningsregler_off.svg";

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