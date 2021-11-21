import { SMT5_DEMON_DATA } from "./demon_data";
import { SMT5_SPECIAL_RECIPES } from "./special_recipes";
import { SMT_5_SKILL_DATA } from "./skill_data";
import { SMT5_ELEMENT_CHART } from "./element_chart";
import { SMT5_FUSION_CHART } from "./fusion_chart";
import { DATA } from "../../utils/types";

const DemonAttribute = {
  LEVEL: "LV",
  RACE: "Race",
  NAME: "Name",
  PHYS: "Phys",
  FIRE: "Fire",
  ICE: "Ice",
  ELEC: "Elec",
  WIND: "Wind",
  LIGHT: "Light",
  DARK: "Dark",
};

const ElementalResistance = {
  PHYS: 0,
  FIRE: 1,
  ICE: 2,
  ELEC: 3,
  WIND: 4,
  LIGHT: 5,
  DARK: 6,
};

export function smt_v_data(): DATA {
  return {
    DEMON_DATA: SMT5_DEMON_DATA,
    SPECIAL_RECIPES: SMT5_SPECIAL_RECIPES,
    SKILL_DATA: SMT_5_SKILL_DATA,
    ELEMENT_CHART: SMT5_ELEMENT_CHART,
    FUSION_CHART: SMT5_FUSION_CHART,
    ATTRIBUTES: DemonAttribute,
    RESISTANCES: ElementalResistance,
  };
}
