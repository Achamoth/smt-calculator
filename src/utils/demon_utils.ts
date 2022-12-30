import { Demon } from "../classes/Demon";

export const UniversalDemonAttribute = {
  LEVEL: "Lvl",
  RACE: "Race",
  NAME: "Name",
  AFFINITY: "Affinity",
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
  element: number;
};

export function compareDemons(d1: Demon, d2: Demon, sort: Sort) {
  let order: number;
  switch (sort.sort) {
    case UniversalDemonAttribute.LEVEL:
      return sort.ascending ? (d1.level < d2.level ? -1 : 1) : d1.level < d2.level ? 1 : -1;
    case UniversalDemonAttribute.NAME:
      return sort.ascending ? (d1.name < d2.name ? -1 : 1) : d1.name < d2.name ? 1 : -1;
    case UniversalDemonAttribute.AFFINITY:
      order = demonAffinityToNumber(d1.resistances[sort.element]) < demonAffinityToNumber(d2.resistances[sort.element]) ? -1 : 1;
      return sort.ascending ? order : order * -1;
    case UniversalDemonAttribute.RACE:
    default:
      order = compareDemonsByRace(d1, d2);
      return sort.ascending ? order : order * -1;
  }
}

export function getInnateSkills(d: Demon) {
  return d.skills.filter((s) => s.level !== 5277); // Magatsuhi skills
}

function demonAffinityToNumber(affinity: string) {
  switch (affinity) {
    case "r":
      return 5;
    case "d":
      return 4;
    case "n":
      return 3;
    case "s":
      return 2;
    case "w":
      return 0;
    case "-":
    default:
      return 1;
  }
}

function compareDemonsByRace(d1: Demon, d2: Demon) {
  if (d1.race === d2.race) {
    return d1.level < d2.level ? -1 : 1;
  }
  return d1.race < d2.race ? -1 : 1;
}
