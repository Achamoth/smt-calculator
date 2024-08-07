import { smt_iv_data } from "../data/smt_iv_data/smt_iv_data";
import { smt_iv_a_data } from "../data/smt_iv_a_data/smt_iv_a_data";
import { smt_v_data } from "../data/smt_v_data/smt_v_data";
import { smt_v_v_data } from "../data/smt_v_v_data/smt_v_v_data";
import { Demon, Skill } from "../classes/Demon";
import { SpecialFusion, ElementChart, FusionChart, FusionData, SkillDemonMap, SkillDefinition, DATA } from "./types";

export enum Game {
  SMT_V_V = "Shin Megami Tensei V: Vengeance",
  SMT_V = "Shin Megami Tensei V",
  SMT_IV = "Shin Megami Tensei IV",
  SMT_IV_A = "Shin Megami Tensei IV Apocalypse",
}

export type GameData = {
  fusionData: FusionData;
  skillList: SkillDemonMap[];
  skillDetails: SkillDefinition[];
  resistances: string[];
};

export function supportedGames() {
  return [Game.SMT_V, Game.SMT_IV, Game.SMT_IV_A, Game.SMT_V_V];
}

export function loadGameData(game: Game): GameData {
  let data: DATA;
  let v_data: DATA | undefined;
  switch (game) {
    case Game.SMT_IV:
      data = smt_iv_data();
      break;
    case Game.SMT_IV_A:
      data = smt_iv_a_data();
      break;
    case Game.SMT_V:
      data = smt_v_data();
      break;
    default:
    case Game.SMT_V_V:
      v_data = smt_v_data();
      data = smt_v_v_data();
      break;
  }

  let demons = parse_demons(data.DEMON_DATA, v_data?.DEMON_DATA);
  let specialFusions = get_special_fusions(data.SPECIAL_RECIPES);
  let fusionChart = load_fusion_chart(data.FUSION_CHART);
  let elementChart = load_element_chart(data.ELEMENT_CHART);
  let fusionData = { demons, specialFusions, fusionChart, elementChart };

  let skillList = get_all_skills(demons);
  let skillDetails = get_skill_data(data.SKILL_DATA);
  let resistances: string[] = data.RESISTANCES;

  return { fusionData, skillList, skillDetails, resistances };
}

function parse_demons(DEMON_DATA: any, V_DEMON_DATA: any | undefined) {
  let demons: Demon[] = [];
  for (const property in DEMON_DATA) {
    let name = property;
    let demon = (DEMON_DATA as any)[property];
    demons.push(new Demon(demon.race, name, demon.lvl, parse_skills(demon.skills), demon.resists, demon.affinities));
  }
  if (V_DEMON_DATA) {
    for (const property in V_DEMON_DATA) {
      let name = property;
      let demon = (V_DEMON_DATA as any)[property];
      if (!demons.find(d => d.name.toLowerCase() === name.toLowerCase())) {
        demons.push(new Demon(demon.race, name, demon.lvl, parse_skills(demon.skills), demon.resists, demon.affinities));
      }
    } 
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

function get_all_skills(demons: Demon[]): SkillDemonMap[] {
  let skills: any = {};
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

function get_special_fusions(SPECIAL_RECIPES: any): SpecialFusion[] {
  let specialFusions: SpecialFusion[] = [];
  for (const property in SPECIAL_RECIPES) {
    let name = property;
    let fusion: string[] = (SPECIAL_RECIPES as any)[property];
    specialFusions.push({ name: name, fusion: fusion });
  }
  return specialFusions;
}

function get_skill_data(SKILL_DATA: any): SkillDefinition[] {
  let skills: SkillDefinition[] = [];
  for (const property in SKILL_DATA) {
    skills.push({ name: property, skill: (SKILL_DATA as any)[property] });
  }
  return skills;
}

function load_element_chart(ELEMENT_CHART: any): ElementChart {
  return ELEMENT_CHART;
}

function load_fusion_chart(FUSION_CHART: any): FusionChart {
  return FUSION_CHART;
}
