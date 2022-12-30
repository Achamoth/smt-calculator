import { SMT5_DEMON_DATA } from "./demon_data";
import { SMT5_SPECIAL_RECIPES } from "./special_recipes";
import { SMT_5_SKILL_DATA } from "./skill_data";
import { SMT5_ELEMENT_CHART } from "./element_chart";
import { SMT5_FUSION_CHART } from "./fusion_chart";
import { DATA } from "../../utils/types";

const ElementalResistance = [
  "PHYS",
  "FIRE",
  "ICE",
  "ELEC",
  "WIND",
  "LIGHT",
  "DARK"
];

export function smt_v_data(): DATA {
  return {
    DEMON_DATA: SMT5_DEMON_DATA,
    SPECIAL_RECIPES: SMT5_SPECIAL_RECIPES,
    SKILL_DATA: SMT_5_SKILL_DATA,
    ELEMENT_CHART: SMT5_ELEMENT_CHART,
    FUSION_CHART: SMT5_FUSION_CHART,
    RESISTANCES: ElementalResistance,
  };
}
