import { Demon } from "../classes/Demon";
import { SMT5_DEMON_DATA } from "../smt_v_data/demon_data.js";

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
