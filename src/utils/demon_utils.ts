import { Demon, Skill } from "../classes/Demon";
import { SMT5_DEMON_DATA } from "../smt_v_data/demon_data";
import { SMT5_SPECIAL_RECIPES } from "../smt_v_data/special_recipes";

export function parse_demons() {
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

export type SkillDemonMap = {
  name: string;
  demons: Demon[];
}

export function get_all_skills(): SkillDemonMap[] {
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

export type SpecialFusion = {
  name: string;
  fusion: string[];
}

export function get_special_fusions(): SpecialFusion[] {
  let specialFusions: SpecialFusion[] = [];
  for (const property in SMT5_SPECIAL_RECIPES) {
    let name = property;
    let fusion: string[] = (SMT5_SPECIAL_RECIPES as any)[property];
    specialFusions.push({ name: name, fusion: fusion });
  }
  return specialFusions;
}

export const DemonAttribute = {
  LEVEL: "LV",
  RACE: "Race",
  NAME: "Name",
  PHYS: "Phys",
  FIRE: "Fire",
  ICE: "Ice",
  ELEC: "Elec",
  WIND: "Wind",
  LIGHT: "Light",
  DARK: "Dark"
};

export const ElementalResistance = {
  PHYS: 0,
  FIRE: 1,
  ICE: 2,
  ELEC: 3,
  WIND: 4,
  LIGHT: 5,
  DARK: 6,
};

export function demonResist(demon: Demon, elementalResistance: number) {
  switch (demon.resistances[elementalResistance]) {
    case "w":
      return "wk";
    case "s":
      return "rs";
    case "n":
      return "nu";
    case "d":
      return "ab";
    case "r":
      return "rp";
    case "-":
    default:
      return "-";
  }
}

export type Sort = {
  sort: string;
  ascending: boolean;
}

export function compareDemons(d1: Demon, d2: Demon, sort: Sort) {
  switch (sort.sort) {
    case DemonAttribute.LEVEL:
      return sort.ascending
        ? d1.level < d2.level
          ? -1
          : 1
        : d1.level < d2.level
        ? 1
        : -1;
    case DemonAttribute.NAME:
      return sort.ascending
        ? d1.name < d2.name
          ? -1
          : 1
        : d1.name < d2.name
        ? 1
        : -1;
    default:
    case DemonAttribute.RACE:
      let order: number = compareDemonsByRace(d1, d2);
      return sort.ascending ? order : order * -1;
  }
}

function compareDemonsByRace(d1: Demon, d2: Demon) {
  if (d1.race === d2.race) {
    return d1.level < d2.level ? -1 : 1;
  }
  return d1.race < d2.race ? -1 : 1;
}
