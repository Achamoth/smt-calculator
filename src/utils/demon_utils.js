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

function parse_skills(skills) {
  let result = [];
  for (const property in skills) {
    let name = property;
    let level = skills[property];
    result.push({ name: name, level: level });
  }
  return result;
}
