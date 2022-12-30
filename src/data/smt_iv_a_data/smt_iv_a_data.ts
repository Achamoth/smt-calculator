import { SMT4A_DEMON_DATA } from "./demon_data";
import { SMT4A_SPECIAL_RECIPES } from "./special_recipes";
import { SMT4A_SKILL_DATA } from "./skill_data";
import { SMT4A_ELEMENT_CHART } from "./element_chart";
import { SMT4A_FUSION_CHART } from "./fusion_chart";
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

export function smt_iv_a_data(): DATA {
  return {
    DEMON_DATA: SMT4A_DEMON_DATA,
    SPECIAL_RECIPES: SMT4A_SPECIAL_RECIPES,
    SKILL_DATA: SMT4A_SKILL_DATA,
    ELEMENT_CHART: SMT4A_ELEMENT_CHART,
    FUSION_CHART: SMT4A_FUSION_CHART,
    RESISTANCES: ElementalResistance,
  };
}
