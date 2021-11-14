import { SMT5_FUSION_CHART } from "../smt_v_data/fusion_chart.js";
import { SMT5_ELEMENT_CHART } from "../smt_v_data/element_chart.js";
import { parse_demons } from "./demon_utils.js";

const ElementTransforms = {
  UP: 1,
  DOWN: -1,
};

// Get all immediate fusion combinations for demon, disregarding skills
export function getFusionCombinations(demon) {
  let combinations = [];
  let demons = parse_demons();

  // Special fusion

  if (demon.race === "Element") {
    let racesToProduce = findRacesThatProduceElement(demon.name);
    for (const race of racesToProduce) {
      let demonsInRace = demons.filter((d) => d.race === race);
      let racePairs = getAllCombinations(demonsInRace);
      combinations.push(racePairs);
    }
    return combinations.flat();
  }

  let elementsUp = getElementsWithDesiredTransformForRace(
    demons,
    demon.race,
    ElementTransforms.UP
  );
  combinations.push(
    findCombinationsForElementAscension(demons, elementsUp, demon)
  );

  let elementsDown = getElementsWithDesiredTransformForRace(
    demons,
    demon.race,
    ElementTransforms.DOWN
  );
  combinations.push(
    findCombinationsForElementDescension(demons, elementsDown, demon)
  );

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

function getElementsWithDesiredTransformForRace(
  demonList,
  race,
  desiredTransform
) {
  let result = [];
  let elementTransforms =
    SMT5_ELEMENT_CHART.table[
      SMT5_ELEMENT_CHART.races.findIndex((r) => r === race)
    ];
  elementTransforms.forEach((t, i) => {
    if (t === desiredTransform) {
      result.push(
        demonList.find((d) => d.name === SMT5_ELEMENT_CHART.elems[i])
      );
    }
  });
  return result;
}

function findCombinationsForElementAscension(demons, elementsUp, demon) {
  let result = [];
  let demonsInRace = demons
    .filter((d) => d.race === demon.race)
    .sort((d1, d2) => (d1.level < d2.level ? -1 : 1));

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

function findCombinationsForElementDescension(demons, elementsDown, demon) {
  let result = [];
  let demonsInRace = demons
    .filter((d) => d.race === demon.race)
    .sort((d1, d2) => (d1.level < d2.level ? -1 : 1));

  if (demon.name === demonsInRace[demonsInRace.length - 1].name) {
    return result;
  }

  let targetDemonIndex = demonsInRace.findIndex((d) => d.name === demon.name);
  elementsDown.forEach((e) => {
    result.push([e, demonsInRace[targetDemonIndex + 1]]);
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