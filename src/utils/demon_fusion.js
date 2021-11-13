import { SMT5_FUSION_CHART } from "../smt_v_data/fusion_chart.js";
import { SMT5_ELEMENT_CHART } from "../smt_v_data/element_chart.js";
import { parse_demons } from "./demon_utils.js";

export function getFusionCombinations(demon) {
  let combinations = [];
  let demons = parse_demons();

  if (demon.race === "Element") {
    let racesToProduce = findRacesThatProduceElement(demon.name);
    for (const race of racesToProduce) {
      let demonsInRace = demons.filter(d => d.race === race);
      let racePairs = getAllCombinations(demonsInRace);
      combinations.push(racePairs);
    }
    return combinations.flat();
  }
}

function findRacesThatProduceElement(element) {
  let races = [];
  SMT5_FUSION_CHART.table.forEach((raceResults, i) => {
    raceResults.forEach((result, j) => {
      if (result === element) {
        races.push(SMT5_FUSION_CHART.races[j]);
      }
    });
  });
  return races;
}

function getAllCombinations(strList) {
  let result = [];
  for (let i = 0; i < strList.length; i++) {
    for (let j = i+1; j < strList.length; j++) {
      result.push([strList[i], strList[j]]);
    }
  }
  return result;
}

//Test
let demons = parse_demons();
let combinations = getFusionCombinations(demons.find(d => d.name === "Aquans"));
console.log(combinations.map(c => {
  return c[0].race + " " + c[0].name + " + " + c[1].race + " " + c[1].name;
}));
