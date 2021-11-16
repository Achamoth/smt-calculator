import { getFusionCombinations } from "./demon_fusion.js";
import { FusionRecipe } from "./../classes/FusionRecipe.js";

export function findPathFromComponentToResult(demon, targetComponents) {
  return new Promise((resolve, reject) => {
    let recipe = getBestFusionRecipe(
      demon,
      targetComponents.map(t => t.name),
      (r, t) => r.foundComponents(t),
      10
    );
    resolve(recipe);
  });
}

export function findFusionRecipes(demon, targetSkills) {
  return new Promise((resolve, reject) => {
    let recipe = getBestFusionRecipe(
      demon,
      targetSkills,
      (r, t) => r.foundSkills(t),
      10
    );
    resolve(recipe);
  });
}

function getBestFusionRecipe(demon, targets, found, maxDepth) {
  let bestChain = new FusionRecipe(demon);
  for (let i = 1; i < maxDepth; i++) {
    let recipe = getFusionRecipes(demon, targets, found, i, 0);
    if (found(recipe, targets).length >= targets.length) {
      return recipe;
    }
    if (found(recipe, targets).length > found(bestChain).length) {
      bestChain = recipe;
    }
  }
  return bestChain;
}

function getFusionRecipes(demon, targets, found, depthLimit, curDepth) {
  let bestChain = new FusionRecipe(demon);

  if (curDepth === depthLimit) {
    return bestChain;
  }

  let fusionCombinations = getFusionCombinations(demon);

  for (let combination of fusionCombinations) {
    let result = new FusionRecipe(demon);

    combination.forEach((d) => {
      result.addComponentRecipe(new FusionRecipe(d));
    });

    if (found(result, targets).length >= targets.length) {
      return result;
    }

    for (const component of combination) {
      let missing = findMissing(found(result), targets);
      let newRecipe = getFusionRecipes(
        component,
        missing,
        found,
        depthLimit,
        curDepth + 1
      );
      result.replaceRecipe(component.name, newRecipe);
      if (found(result, targets).length >= targets.length) {
        return result;
      }
    }

    if (found(bestChain, targets).length < found(result, targets).length) {
      bestChain = result;
    }
  }
  return bestChain;
}

function findMissing(found, target) {
  return target.filter((s) => !found.includes(s));
}