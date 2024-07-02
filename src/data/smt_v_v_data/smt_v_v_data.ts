import { SMT5_V_DEMON_DATA } from "./demon_data.js";
import { SMT5_V_SPECIAL_RECIPES } from "./special_recipes.js";
import { SMT5_V_SKILL_DATA } from "./skill_data.js";
import { SMT5_ELEMENT_CHART } from "./element_chart.js";
import { SMT5_V_FUSION_CHART } from "./fusion_chart.js";
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

export function smt_v_v_data(): DATA {
  return {
    DEMON_DATA: SMT5_V_DEMON_DATA,
    SPECIAL_RECIPES: SMT5_V_SPECIAL_RECIPES,
    SKILL_DATA: SMT5_V_SKILL_DATA,
    ELEMENT_CHART: SMT5_ELEMENT_CHART,
    FUSION_CHART: SMT5_V_FUSION_CHART,
    RESISTANCES: ElementalResistance,
  };
}
