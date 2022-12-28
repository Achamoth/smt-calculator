import { SMT4A_DEMON_DATA } from "./demon_data.js";
import { SMT4A_SPECIAL_RECIPES } from "./special_recipes.js";
import { SMT4A_SKILL_DATA } from "./skill_data.js";
import { SMT4A_ELEMENT_CHART } from "./element_chart.js";
import { SMT4A_FUSION_CHART } from "./fusion_chart.js";
import { DATA } from "../../utils/types.ts";

const DemonAttribute = {
  LEVEL: "LV",
  RACE: "Race",
  NAME: "Name",
  PHYS: "Phys",
  GUN: "Gun",
  FIRE: "Fire",
  ICE: "Ice",
  ELEC: "Elec",
  WIND: "Wind",
  LIGHT: "Light",
  DARK: "Dark",
};

const ElementalResistance = {
  PHYS: 0,
  GUN: 1,
  FIRE: 2,
  ICE: 3,
  ELEC: 4,
  WIND: 5,
  LIGHT: 6,
  DARK: 7,
};

export function smt_iv_a_data(): DATA {
  return {
    DEMON_DATA: SMT4A_DEMON_DATA,
    SPECIAL_RECIPES: SMT4A_SPECIAL_RECIPES,
    SKILL_DATA: SMT4A_SKILL_DATA,
    ELEMENT_CHART: SMT4A_ELEMENT_CHART,
    FUSION_CHART: SMT4A_FUSION_CHART,
    ATTRIBUTES: DemonAttribute,
    RESISTANCES: ElementalResistance,
  };
}
