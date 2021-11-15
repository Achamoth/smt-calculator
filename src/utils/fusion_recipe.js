import { getFusionCombinations } from "./demon_fusion.js";
import { FusionRecipe } from "./../classes/FusionRecipe.js";

export function findFusionRecipes(demon, targetSkills) {
  return new Promise((resolve, reject) => {
    let recipe = getFusionRecipes(demon, targetSkills, 5, 0);
    resolve(recipe);
  });
}

function getFusionRecipes(demon, targetSkills, depthLimit, curDepth) {
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
    if (foundSkills.length >= targetSkills.length) {
      return result;
    }

    for (const component of combination) {
      let missingSkills = findMissingSkills(result.skills, targetSkills);
      // TODO See if I can make this an incrementally increasing depth
      let newRecipe = getFusionRecipes(
        component,
        missingSkills,
        depthLimit,
        curDepth + 1
      );
      result.replaceRecipe(component.name, newRecipe);
      foundSkills = result.foundSkills(targetSkills);
      if (foundSkills.length >= targetSkills.length) {
        return result;
      }
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
