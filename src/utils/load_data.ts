import { Demon, Skill } from "../classes/Demon";
import {
  SpecialFusion,
  ElementChart,
  FusionChart,
  FusionData,
  SkillDemonMap,
  SkillDefinition,
} from "./types";
import { SMT5_DEMON_DATA } from "../smt_v_data/demon_data";
import { SMT5_SPECIAL_RECIPES } from "../smt_v_data/special_recipes";
import { SMT_5_SKILL_DATA } from "./../smt_v_data/skill_data";
import { SMT5_ELEMENT_CHART } from "../smt_v_data/element_chart";
import { SMT5_FUSION_CHART } from "../smt_v_data/fusion_chart";

export type GameData = {
  fusionData: FusionData;
  skillList: SkillDemonMap[];
  skillDetails: SkillDefinition[];
};

export function loadGameData(): GameData {
  let demons = parse_demons();
  let specialFusions = get_special_fusions();
  let fusionChart = load_fusion_chart();
  let elementChart = load_element_chart();
  let fusionData = { demons, specialFusions, fusionChart, elementChart };

  let skillList = get_all_skills();
  let skillDetails = get_skill_data();

  return { fusionData, skillList, skillDetails };
}

function parse_demons() {
  let demons: Demon[] = [];
  for (const property in SMT5_DEMON_DATA) {
    let name = property;
    let demon = (SMT5_DEMON_DATA as any)[property];
    demons.push(
      new Demon(
        demon.race,
        name,
        demon.lvl,
        parse_skills(demon.skills),
        demon.resists,
        demon.affinities
      )
    );
  }
  return demons;
}

function parse_skills(skills: any): Skill[] {
  let result: Skill[] = [];
  for (const property in skills) {
    let name = property;
    let level = skills[property];
    result.push({ name: name, level: level });
  }
  return result;
}

function get_all_skills(): SkillDemonMap[] {
  let skills: any = {};
  let demons = parse_demons();
  demons.forEach((d) => {
    d.skills.forEach((s) => {
      if (skills[s.name]) {
        skills[s.name].push({
          demonLevel: d.level,
          race: d.race,
          name: d.name,
          skillLevel: s.level,
        });
      } else {
        skills[s.name] = [];
        skills[s.name].push({
          demonLevel: d.level,
          race: d.race,
          name: d.name,
          skillLevel: s.level,
        });
      }
    });
  });

  let result: SkillDemonMap[] = [];
  Object.keys(skills).forEach((s) => {
    result.push({ name: s, demons: skills[s] });
  });
  return result;
}

function get_special_fusions(): SpecialFusion[] {
  let specialFusions: SpecialFusion[] = [];
  for (const property in SMT5_SPECIAL_RECIPES) {
    let name = property;
    let fusion: string[] = (SMT5_SPECIAL_RECIPES as any)[property];
    specialFusions.push({ name: name, fusion: fusion });
  }
  return specialFusions;
}

function get_skill_data(): SkillDefinition[] {
  let skills: SkillDefinition[] = [];
  for (const property in SMT_5_SKILL_DATA) {
    skills.push({ name: property, skill: (SMT_5_SKILL_DATA as any)[property] });
  }
  return skills;
}

function load_element_chart(): ElementChart {
  return SMT5_ELEMENT_CHART;
}

function load_fusion_chart(): FusionChart {
  return SMT5_FUSION_CHART;
}
