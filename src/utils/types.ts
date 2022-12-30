import { Demon } from "../classes/Demon";

export type DATA = {
  DEMON_DATA: any;
  SPECIAL_RECIPES: any;
  SKILL_DATA: any;
  ELEMENT_CHART: any;
  FUSION_CHART: any;
  RESISTANCES: any;
};

export type DemonSkillUnlock = {
  demonLevel: number;
  race: string;
  name: string;
  skillLevel: number;
};

export type SkillDemonMap = {
  name: string;
  demons: DemonSkillUnlock[];
};

export type SpecialFusion = {
  name: string;
  fusion: string[];
};

export type SkillDetails = {
  cost: number;
  effect: string;
  element: string;
  rank: number;
  target: string;
};

export type SkillDefinition = {
  name: string;
  skill: SkillDetails;
};

export type FusionChart = {
  races: string[];
  table: string[][];
};

export type ElementChart = {
  elems: string[];
  races: string[];
  table: number[][];
};

export type FusionData = {
  demons: Demon[];
  specialFusions: SpecialFusion[];
  fusionChart: FusionChart;
  elementChart: ElementChart;
};
