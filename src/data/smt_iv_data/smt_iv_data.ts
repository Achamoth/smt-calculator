import { SMT4_DEMON_DATA } from "./demon_data";
import { SMT4_SPECIAL_RECIPES } from "./special_recipes";
import { SMT4_SKILL_DATA } from "./skill_data";
import { SMT4_ELEMENT_CHART } from "./element_chart";
import { SMT4_FUSION_CHART } from "./fusion_chart";
import { DATA } from "../../utils/types";

const ElementalResistance = [
  "PHYS",
  "GUN",
  "FIRE",
  "ICE",
  "ELEC",
  "WIND",
  "LIGHT",
  "DARK"
];

export function smt_iv_data(): DATA {
  return {
    DEMON_DATA: SMT4_DEMON_DATA,
    SPECIAL_RECIPES: SMT4_SPECIAL_RECIPES,
    SKILL_DATA: SMT4_SKILL_DATA,
    ELEMENT_CHART: SMT4_ELEMENT_CHART,
    FUSION_CHART: SMT4_FUSION_CHART,
    RESISTANCES: ElementalResistance,
  };
}
