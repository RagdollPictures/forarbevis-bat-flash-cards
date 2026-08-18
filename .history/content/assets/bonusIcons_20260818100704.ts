import type React from "react";

import BonusDagersignalerIcon from "./bonus-icons/bonus_dagersignaler.svg";
import BonusDagersignalerOffIcon from "./bonus-icons/bonus_dagersignaler_off.svg";
import BonusFartDistansTidIcon from "./bonus-icons/bonus_fart_distans_tid.svg";
import BonusFartDistansTidOffIcon from "./bonus-icons/bonus_fart_distans_tid_off.svg";
import BonusFlaggorIcon from "./bonus-icons/bonus_flaggor.svg";
import BonusFlaggorOffIcon from "./bonus-icons/bonus_flaggor_off.svg";
import BonusFortojningslinorIcon from "./bonus-icons/bonus_fortojningslinor.svg";
import BonusFortojningslinorOffIcon from "./bonus-icons/bonus_fortojningslinor_off.svg";
import BonusKardinalmarkenIcon from "./bonus-icons/bonus_kardinalmarken.svg";
import BonusKardinalmarkenOffIcon from "./bonus-icons/bonus_kardinalmarken_off.svg";
import BonusKursberakingIcon from "./bonus-icons/bonus_kursberaking.svg";
import BonusKursberakingOffIcon from "./bonus-icons/bonus_kursberaking_off.svg";
import BonusLanternorIcon from "./bonus-icons/bonus_lanternor.svg";
import BonusLanternorOffIcon from "./bonus-icons/bonus_lanternor_off.svg";
import BonusLjudsignalerIcon from "./bonus-icons/bonus_ljudsignaler.svg";
import BonusLjudsignalerOffIcon from "./bonus-icons/bonus_ljudsignaler_off.svg";
import BonusNavigatorIcon from "./bonus-icons/bonus_navigator.svg";
import BonusNavigatorOffIcon from "./bonus-icons/bonus_navigator_off.svg";
import BonusSjomarkenIcon from "./bonus-icons/bonus_sjomarken.svg";
import BonusSjomarkenOffIcon from "./bonus-icons/bonus_sjomarken_off.svg";
import BonusSymbolerIcon from "./bonus-icons/bonus_symboler.svg";
import BonusSymbolerOffIcon from "./bonus-icons/bonus_symboler_off.svg";

export const bonusIconsById: Record<
  string,
  {
    on: React.ComponentType<any>;
    off?: React.ComponentType<any>;
  }
> = {
  bonus_dagersignaler: {
    on: BonusDagersignalerIcon,
    off: BonusDagersignalerOffIcon,
  },
  bonus_fart_distans_tid: {
    on: BonusFartDistansTidIcon,
    off: BonusFartDistansTidOffIcon,
  },
  bonus_flaggor: {
    on: BonusFlaggorIcon,
    off: BonusFlaggorOffIcon,
  },
  bonus_fortojningslinor: {
    on: BonusFortojningslinorIcon,
    off: BonusFortojningslinorOffIcon,
  },
  bonus_kursberakning: {
    on: BonusKursberakingIcon,
    off: BonusKursberakingOffIcon,
  },
  bonus_lanternor: {
    on: BonusLanternorIcon,
    off: BonusLanternorOffIcon,
  },
  bonus_ljudsignaler: {
    on: BonusLjudsignalerIcon,
    off: BonusLjudsignalerOffIcon,
  },
  bonus_navigator: {
    on: BonusNavigatorIcon,
    off: BonusNavigatorOffIcon,
  },
  bonus_sjomarken: {
    on: BonusSjomarkenIcon,
    off: BonusSjomarkenOffIcon,
  },
  bonus_symboler: {
    on: BonusSymbolerIcon,
    off: BonusSymbolerOffIcon,
  },
  bonus_kardinal: {
    on: BonusKardinalmarkenIcon,
    off: BonusKardinalmarkenOffIcon,
  },
};