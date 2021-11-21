import { Demon } from "../classes/Demon";

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
  DARK: "Dark",
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
};

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
