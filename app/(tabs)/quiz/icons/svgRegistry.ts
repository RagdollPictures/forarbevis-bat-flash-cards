// app/(tabs)/quiz-menu/icons/svgRegistry.ts
import type { SvgProps } from "react-native-svg";

import AnchorCircleXmarkIcon from "@/assets/svg_icons/anchor-circle-xmark.svg";
import AnchorIcon from "@/assets/svg_icons/anchor.svg";
import BanIcon from "@/assets/svg_icons/ban.svg";
import BinocularsIcon from "@/assets/svg_icons/binoculars.svg";
import BoltIcon from "@/assets/svg_icons/bolt.svg";
import BullhornIcon from "@/assets/svg_icons/bullhorn.svg";
import CalculatorIcon from "@/assets/svg_icons/calculator.svg";
import CircleCheckIcon from "@/assets/svg_icons/circle-check.svg";
import CircleQuestionIcon from "@/assets/svg_icons/circle-question.svg";
import ClipboardListIcon from "@/assets/svg_icons/clipboard-list.svg";
import CloudSunIcon from "@/assets/svg_icons/cloud-sun.svg";
import CloudIcon from "@/assets/svg_icons/cloud.svg";
import CompassDraftingIcon from "@/assets/svg_icons/compass-drafting.svg";
import CompassIcon from "@/assets/svg_icons/compass.svg";
import CrosshairsIcon from "@/assets/svg_icons/crosshairs.svg";
import FaceDizzyIcon from "@/assets/svg_icons/face-dizzy.svg";
import FireIcon from "@/assets/svg_icons/fire.svg";
import FlagIcon from "@/assets/svg_icons/flag.svg";
import GasPumpIcon from "@/assets/svg_icons/gas-pump.svg";
import GaugeHighIcon from "@/assets/svg_icons/gauge-high.svg";
import GaugeIcon from "@/assets/svg_icons/gauge.svg";
import HandshakeIcon from "@/assets/svg_icons/handshake.svg";
import HelmetSafetyIcon from "@/assets/svg_icons/helmet-safety.svg";
import KitMedicalIcon from "@/assets/svg_icons/kit-medical.svg";
import LeafIcon from "@/assets/svg_icons/leaf.svg";
import LifeRingIcon from "@/assets/svg_icons/life-ring.svg";
import LightbulbIcon from "@/assets/svg_icons/lightbulb.svg";
import LinkIcon from "@/assets/svg_icons/link.svg";
import LocationArrowIcon from "@/assets/svg_icons/location-arrow.svg";
import LocationCrosshairsIcon from "@/assets/svg_icons/location-crosshairs.svg";
import LocationDotIcon from "@/assets/svg_icons/location-dot.svg";
import LockIcon from "@/assets/svg_icons/lock.svg";
import MapLocationDotIcon from "@/assets/svg_icons/map-location-dot.svg";
import MapIcon from "@/assets/svg_icons/map.svg";
import PenRulerIcon from "@/assets/svg_icons/pen-ruler.svg";
import RouteIcon from "@/assets/svg_icons/route.svg";
import RulerCombinedIcon from "@/assets/svg_icons/ruler-combined.svg";
import RulerIcon from "@/assets/svg_icons/ruler.svg";
import SailboatIcon from "@/assets/svg_icons/sailboat.svg";
import SatelliteDishIcon from "@/assets/svg_icons/satellite-dish.svg";
import ScaleBalancedIcon from "@/assets/svg_icons/scale-balanced.svg";
import ScrewdriverWrenchIcon from "@/assets/svg_icons/screwdriver-wrench.svg";
import ShapesIcon from "@/assets/svg_icons/shapes.svg";
import ShieldHalvedIcon from "@/assets/svg_icons/shield-halved.svg";
import ShipIcon from "@/assets/svg_icons/ship.svg";
import ShirtIcon from "@/assets/svg_icons/shirt.svg";
import SnowflakeIcon from "@/assets/svg_icons/snowflake.svg";
import SprayCanSparklesIcon from "@/assets/svg_icons/spray-can-sparkles.svg";
import ToiletIcon from "@/assets/svg_icons/toilet.svg";
import TreeIcon from "@/assets/svg_icons/tree.svg";
import TriangleExclamationIcon from "@/assets/svg_icons/triangle-exclamation.svg";
import VolumeHighIcon from "@/assets/svg_icons/volume-high.svg";
import WaterIcon from "@/assets/svg_icons/water.svg";
import WindIcon from "@/assets/svg_icons/wind.svg";

export type SvgName =
  | "map"
  | "circle-check"
  | "location-dot"
  | "shapes"
  | "anchor"
  | "ruler-combined"
  | "ruler"
  | "location-crosshairs"
  | "pen-ruler"
  | "route"
  | "compass"
  | "crosshairs"
  | "location-arrow"
  | "calculator"
  | "compass-drafting"
  | "water"
  | "clipboard-list"
  | "binoculars"
  | "satellite-dish"
  | "map-location-dot"
  | "scale-balanced"
  | "ship"
  | "sailboat"
  | "lightbulb"
  | "gauge-high"
  | "anchor-circle-xmark"
  | "gauge"
  | "screwdriver-wrench"
  | "handshake"
  | "link"
  | "shirt"
  | "ban"
  | "flag"
  | "bullhorn"
  | "triangle-exclamation"
  | "volume-high"
  | "life-ring"
  | "helmet-safety"
  | "kit-medical"
  | "bolt"
  | "gas-pump"
  | "face-dizzy"
  | "snowflake"
  | "fire"
  | "cloud-sun"
  | "cloud"
  | "wind"
  | "leaf"
  | "spray-can-sparkles"
  | "toilet"
  | "tree"
  | "shield-halved"
  | "lock"
  | "circle-question";

export const svgByName: Record<SvgName, React.ComponentType<SvgProps>> = {
  map: MapIcon,
  "circle-check": CircleCheckIcon,
  "location-dot": LocationDotIcon,

  shapes: ShapesIcon,

  anchor: AnchorIcon,

  "ruler-combined": RulerCombinedIcon,
  ruler: RulerIcon,
  "location-crosshairs": LocationCrosshairsIcon,
  "pen-ruler": PenRulerIcon,
  route: RouteIcon,
  compass: CompassIcon,
  crosshairs: CrosshairsIcon,

  "location-arrow": LocationArrowIcon,
  calculator: CalculatorIcon,
  "compass-drafting": CompassDraftingIcon,
  water: WaterIcon,

  "clipboard-list": ClipboardListIcon,
  binoculars: BinocularsIcon,
  "satellite-dish": SatelliteDishIcon,
  "map-location-dot": MapLocationDotIcon,

  "scale-balanced": ScaleBalancedIcon,
  ship: ShipIcon,
  sailboat: SailboatIcon,

  lightbulb: LightbulbIcon,

  "gauge-high": GaugeHighIcon,
  "anchor-circle-xmark": AnchorCircleXmarkIcon,
  gauge: GaugeIcon,
  "screwdriver-wrench": ScrewdriverWrenchIcon,

  handshake: HandshakeIcon,
  link: LinkIcon,
  shirt: ShirtIcon,
  ban: BanIcon,
  flag: FlagIcon,

  bullhorn: BullhornIcon,
  "triangle-exclamation": TriangleExclamationIcon,
  "volume-high": VolumeHighIcon,

  "life-ring": LifeRingIcon,
  "helmet-safety": HelmetSafetyIcon,
  "kit-medical": KitMedicalIcon,
  bolt: BoltIcon,
  "gas-pump": GasPumpIcon,

  "face-dizzy": FaceDizzyIcon,
  snowflake: SnowflakeIcon,
  fire: FireIcon,

  "cloud-sun": CloudSunIcon,
  cloud: CloudIcon,
  wind: WindIcon,

  leaf: LeafIcon,
  "spray-can-sparkles": SprayCanSparklesIcon,
  toilet: ToiletIcon,
  tree: TreeIcon,
  "shield-halved": ShieldHalvedIcon,

  lock: LockIcon,
  "circle-question": CircleQuestionIcon,
};
