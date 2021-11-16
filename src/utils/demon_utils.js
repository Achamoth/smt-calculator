import { Demon } from "../classes/Demon.js";
import { SMT5_DEMON_DATA } from "../smt_v_data/demon_data.js";
import { SMT5_SPECIAL_RECIPES } from "../smt_v_data/special_recipes.js";

export function parse_demons() {
  let demons = [];
  for (const property in SMT5_DEMON_DATA) {
    let name = property;
    let demon = SMT5_DEMON_DATA[property];
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

function parse_skills(skills) {
  let result = [];
  for (const property in skills) {
    let name = property;
    let level = skills[property];
    result.push({ name: name, level: level });
  }
  return result;
}

export function get_all_skills() {
  let skills = {};
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

  let result = [];
  Object.keys(skills).forEach((s) => {
    result.push({ name: s, demons: skills[s] });
  });
  return result;
}

export function get_special_fusions() {
  let specialFusions = [];
  for (const property in SMT5_SPECIAL_RECIPES) {
    let name = property;
    let fusion = SMT5_SPECIAL_RECIPES[property];
    specialFusions.push({ name: name, fusion: fusion });
  }
  return specialFusions;
}

export const DemonAttributes = {
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

export const ElementalResistances = {
  PHYS: 0,
  FIRE: 1,
  ICE: 2,
  ELEC: 3,
  WIND: 4,
  LIGHT: 5,
  DARK: 6,
};

export function demonResist(demon, elementalResistance) {
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

export function compareDemons(d1, d2, sort) {
  switch (sort.sort) {
    case DemonAttributes.LEVEL:
      return sort.ascending
        ? d1.level < d2.level
          ? -1
          : 1
        : d1.level < d2.level
        ? 1
        : -1;
    case DemonAttributes.NAME:
      return sort.ascending
        ? d1.name < d2.name
          ? -1
          : 1
        : d1.name < d2.name
        ? 1
        : -1;
    default:
    case DemonAttributes.RACE:
      let order = compareDemonsByRace(d1, d2);
      return sort.ascending ? order : order * -1;
  }
}

function compareDemonsByRace(d1, d2) {
  if (d1.race === d2.race) {
    return d1.level < d2.level ? -1 : 1;
  }
  return d1.race < d2.race ? -1 : 1;
}
