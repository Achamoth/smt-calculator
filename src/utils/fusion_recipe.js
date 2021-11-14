import { getFusionCombinations } from "./demon_fusion.js";
import { FusionRecipe } from "./../classes/FusionRecipe.js";
import { parse_demons } from "./demon_utils.js";

export function getFusionRecipes(demon, targetSkills, depthLimit, curDepth) {
  if (curDepth === depthLimit) {
    return new FusionRecipe(demon);
  }

  let bestChain;

  let fusionCombinations = getFusionCombinations(demon);
  for (let combination of fusionCombinations) {
    let result = new FusionRecipe(demon);

    combination.forEach((d) => {
      result.addComponentRecipe(new FusionRecipe(d));
    });

    let foundSkills = result.foundSkills(targetSkills);
    if (foundSkills.length === targetSkills.length) {
      return result;
    }

    combination.forEach((d, i) => {
      let missingSkills = findMissingSkills(result.skills, targetSkills);
      let newRecipe = getFusionRecipes(
        d,
        missingSkills,
        depthLimit,
        curDepth + 1
      );
      result.replaceRecipe(d.name, newRecipe);
    });

    foundSkills = result.foundSkills(targetSkills);
    if (foundSkills.length === targetSkills.length) {
      return result;
    }

    if (!bestChain) {
      bestChain = result;
    } else if (
      bestChain.foundSkills(targetSkills).length < foundSkills.length
    ) {
      bestChain = result;
    }
  }
  return bestChain;
}

function findMissingSkills(foundSkills, targetSkills) {
  return targetSkills.filter((s) => !foundSkills.includes(s));
}

// Test
// let demons = parse_demons();
// let targetDemon = demons.find((d) => d.name === "Jack Frost");
// let skills = ["Agi", "Bufu", "Maragi", "Resist Ice", "Agidyne"];
// let recipe = getFusionRecipes(targetDemon, skills, 5, 0);
// console.log(recipe.parseChain(0, skills));
