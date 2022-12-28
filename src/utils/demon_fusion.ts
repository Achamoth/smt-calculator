import {
  FusionData,
  SpecialFusion,
  FusionChart,
  ElementChart,
} from "./types.ts";
import { Demon } from "../classes/Demon.ts";

enum ElementTransform {
  UP = 1,
  DOWN = -1,
}

function demonIsFusable(demon: Demon) {
  return (
    demon.race.toLowerCase() !== "proto" &&
    demon.name.toLowerCase() !== "demi-fiend"
  );
}

// Get all immediate fusion combinations for demon, disregarding skills
export function getFusionCombinations(
  demon: Demon,
  fusionData: FusionData
): Demon[][] {
  let combinations: Demon[][] = [];
  let { demons, specialFusions, fusionChart, elementChart } = fusionData;

  if (!demonIsFusable(demon)) return combinations;

  if (specialFusions.map((s) => s.name).includes(demon.name)) {
    let fusion = specialFusions.find((s) => s.name === demon.name)!.fusion;
    combinations.push(
      fusion.map((name) => demons.find((d) => d.name === name)!)
    );
    return combinations;
  }

  if (demon.race === "Element") {
    let racesToProduce = findRacesThatProduceElement(fusionChart, demon.name);
    for (const race of racesToProduce) {
      let demonsInRace = demons.filter((d) => d.race === race);
      let racePairs = getAllCombinations(demonsInRace);
      combinations.push(...racePairs);
    }
    return combinations;
  }

  let elementsUp = getElementsWithDesiredTransformForRace(
    elementChart,
    demons,
    demon.race,
    ElementTransform.UP
  );
  if (elementsUp && elementsUp.length > 0) {
    combinations.push(
      ...findCombinationsForElementAscension(demons, elementsUp, demon)
    );
  }

  let elementsDown = getElementsWithDesiredTransformForRace(
    elementChart,
    demons,
    demon.race,
    ElementTransform.DOWN
  );
  if (elementsDown && elementsDown.length > 0) {
    combinations.push(
      ...findCombinationsForElementDescension(demons, elementsDown, demon)
    );
  }

  let racePairs = getRacePairsForDesiredRace(fusionChart, demon.race);
  if (racePairs && racePairs.length > 0) {
    racePairs.forEach((r, _) => {
      combinations.push(
        ...getCombinationsFromRaces(demon, demons, specialFusions, r[0], r[1])
      );
    });
  }
  return combinations;
}

function findRacesThatProduceElement(
  fusionChart: FusionChart,
  element: string
) {
  let races: string[] = [];
  searchFusionChart(fusionChart, element, (r1, _) => races.push(r1));
  return races;
}

function getRacePairsForDesiredRace(fusionChart: FusionChart, race: string) {
  let result: string[][] = [];
  searchFusionChart(fusionChart, race, (r1, r2) => result.push([r1, r2]));
  return result;
}

function searchFusionChart(
  fusionChart: FusionChart,
  desiredResult: string,
  action: (r1: string, r2: string) => void
) {
  let result: string[][] = [];
  fusionChart.table.forEach((raceResults, i) => {
    raceResults.forEach((result, j) => {
      if (result === desiredResult) {
        action(fusionChart.races[i], fusionChart.races[j]);
      }
    });
  });
  return result;
}

function getCombinationsFromRaces(
  desiredDemon: Demon,
  demonList: Demon[],
  specialFusions: SpecialFusion[],
  race1: string,
  race2: string
) {
  let result: Demon[][] = [];
  let race1Demons = demonList.filter((d) => d.race === race1);
  let race2Demons = demonList.filter((d) => d.race === race2);
  let desiredRaceDemons = demonList
    .filter((d) => d.race === desiredDemon.race)
    .sort((d1, d2) => (d1.level < d2.level ? -1 : 1));

  race1Demons.forEach((d1, _) => {
    race2Demons.forEach((d2, _) => {
      let avgLevel = Math.ceil((d1.level + d2.level) / 2);
      let resultingDemon = desiredRaceDemons
        .filter((d) => d.level > avgLevel)
        .filter((d) => !specialFusions.map((s) => s.name).includes(d.name))
        .sort((d1, d2) => (d1.level < d2.level ? -1 : 1))[0];
      if (resultingDemon && resultingDemon.name === desiredDemon.name) {
        result.push([d1, d2]);
      }
    });
  });
  return result;
}

function getElementsWithDesiredTransformForRace(
  elementChart: ElementChart,
  demonList: Demon[],
  race: string,
  desiredTransform: ElementTransform
) {
  let result: Demon[] = [];
  let elementTransforms =
    elementChart.table[elementChart.races.findIndex((r) => r === race)];
  if (elementTransforms && elementTransforms.length > 0) {
    elementTransforms.forEach((t, i) => {
      if (t === desiredTransform.valueOf()) {
        let demon = demonList.find((d) => d.name === elementChart.elems[i]);
        if (demon) {
          result.push(demon);
        }
      }
    });
  }
  return result;
}

function findCombinationsForElementAscension(
  demons: Demon[],
  elementsUp: Demon[],
  demon: Demon
) {
  let result: Demon[][] = [];
  let demonsInRace = demons
    .filter((d) => d.race === demon.race)
    .sort((d1, d2) => (d1.level < d2.level ? -1 : 1));

  // TODO Does not account for excluding special demons
  if (demon.name === demonsInRace[0].name) {
    elementsUp.forEach((e) => {
      result.push([e, demonsInRace[demonsInRace.length - 1]]);
    });
    return result;
  }

  let targetDemonIndex = demonsInRace.findIndex((d) => d.name === demon.name);
  elementsUp.forEach((e) => {
    result.push([e, demonsInRace[targetDemonIndex - 1]]);
  });
  return result;
}

function findCombinationsForElementDescension(
  demons: Demon[],
  elementsDown: Demon[],
  demon: Demon
) {
  let result: Demon[][] = [];
  let demonsInRace = demons
    .filter((d) => d.race === demon.race)
    .sort((d1, d2) => (d1.level < d2.level ? -1 : 1));

  if (demon.name === demonsInRace[demonsInRace.length - 1].name) {
    return result;
  }

  // TODO Does not account for excluding special demons
  let targetDemonIndex = demonsInRace.findIndex((d) => d.name === demon.name);
  elementsDown.forEach((e) => {
    result.push([e, demonsInRace[targetDemonIndex + 1]]);
  });
  return result;
}

function getAllCombinations<T>(list: T[]) {
  let result: T[][] = [];
  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      result.push([list[i], list[j]]);
    }
  }
  return result;
}
