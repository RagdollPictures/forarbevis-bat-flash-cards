import type React from "react";

import BonusDagersignalerIcon from "../../assets/menu/bonus_dagersignaler.svg";
import BonusDagersignalerOffIcon from "../../assets/menu/bonus_dagersignaler_off.svg";
import BonusFartDistansTidIcon from "../../assets/menu/bonus_fart_distans_tid.svg";
import BonusFartDistansTidOffIcon from "../../assets/menu/bonus_fart_distans_tid_off.svg";
import BonusFlaggorIcon from "../../assets/menu/bonus_flaggor.svg";
import BonusFlaggorOffIcon from "../../assets/menu/bonus_flaggor_off.svg";
import BonusFortojningslinorIcon from "../../assets/menu/bonus_fortojningslinor.svg";
import BonusFortojningslinorOffIcon from "../../assets/menu/bonus_fortojningslinor_off.svg";
import BonusKardinalmarkenIcon from "../../assets/menu/bonus_kardinalmarken.svg";
import BonusKardinalmarkenOffIcon from "../../assets/menu/bonus_kardinalmarken_off.svg";
import BonusKursberakingIcon from "../../assets/menu/bonus_kursberaking.svg";
import BonusKursberakingOffIcon from "../../assets/menu/bonus_kursberaking_off.svg";
import BonusLanternorIcon from "../../assets/menu/bonus_lanternor.svg";
import BonusLanternorOffIcon from "../../assets/menu/bonus_lanternor_off.svg";
import BonusLjudsignalerIcon from "../../assets/menu/bonus_ljudsignaler.svg";
import BonusLjudsignalerOffIcon from "../../assets/menu/bonus_ljudsignaler_off.svg";
import BonusNavigatorIcon from "../../assets/menu/bonus_navigator.svg";
import BonusNavigatorOffIcon from "../../assets/menu/bonus_navigator_off.svg";
import BonusSjomarkenIcon from "../../assets/menu/bonus_sjomarken.svg";
import BonusSjomarkenOffIcon from "../../assets/menu/bonus_sjomarken_off.svg";
import BonusSymbolerIcon from "../../assets/menu/bonus_symboler.svg";
import BonusSymbolerOffIcon from "../../assets/menu/bonus_symboler_off.svg";

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