import { SMT5_FUSION_CHART } from "../smt_v_data/fusion_chart.js";
import { SMT5_ELEMENT_CHART } from "../smt_v_data/element_chart.js";
import { parse_demons } from "./demon_utils.js";

export function getFusionCombinations(demon) {
  let combinations = [];
  let demons = parse_demons();

  // Special fusion

  // Element
  if (demon.race === "Element") {
    let racesToProduce = findRacesThatProduceElement(demon.name);
    for (const race of racesToProduce) {
      let demonsInRace = demons.filter((d) => d.race === race);
      let racePairs = getAllCombinations(demonsInRace);
      combinations.push(racePairs);
    }
    return combinations.flat();
  }

  // Elements up

  // Elements down

  // Normal fusions
  let racePairs = getRacePairsForDesiredRace(demon.race);
  racePairs.forEach((r, _) => {
    combinations.push(getCombinationsFromRaces(demon, demons, r[0], r[1]));
  });
  return combinations.flat();
}

function findRacesThatProduceElement(element) {
  let races = [];
  searchFusionChart(element, (r1, _) => races.push(r1));
  return races;
}

function getRacePairsForDesiredRace(race) {
  let result = [];
  searchFusionChart(race, (r1, r2) => result.push([r1, r2]));
  return result;
}

function searchFusionChart(desiredResult, action) {
  let result = [];
  SMT5_FUSION_CHART.table.forEach((raceResults, i) => {
    raceResults.forEach((result, j) => {
      if (result === desiredResult) {
        action(SMT5_FUSION_CHART.races[i], SMT5_FUSION_CHART.races[j]);
      }
    });
  });
  return result;
}

function getCombinationsFromRaces(desiredDemon, demonList, race1, race2) {
  let result = [];
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
        .sort((d1, d2) => (d1.level < d2.level ? -1 : 1))[0];
      if (resultingDemon && resultingDemon.name === desiredDemon.name) {
        result.push([d1, d2]);
      }
    });
  });
  return result;
}

function getAllCombinations(strList) {
  let result = [];
  for (let i = 0; i < strList.length; i++) {
    for (let j = i + 1; j < strList.length; j++) {
      result.push([strList[i], strList[j]]);
    }
  }
  return result;
}

//Test
let demons = parse_demons();
let combinations = getFusionCombinations(
  demons.find((d) => d.name === "Jack Frost")
);
console.log(
  combinations.map((c) => {
    return c[0].race + " " + c[0].name + " + " + c[1].race + " " + c[1].name;
  })
);
