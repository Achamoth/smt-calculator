import { Demon } from "./Demon";
import {SMT5_DEMON_DATA} from './smt_v_data/demon_data.js';

export function parse_demons() {
    let demons = [];
    for (const property in SMT5_DEMON_DATA) {
      let name = property;
      let demon = SMT5_DEMON_DATA[property];
      demons.push(new Demon(demon.race, name, demon.lvl, demon.skills, demon.resists, demon.affinities));
    }
    return demons;
  }