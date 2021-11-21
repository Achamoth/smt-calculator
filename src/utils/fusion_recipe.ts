import { getFusionCombinations } from "./demon_fusion";
import { FusionRecipe } from "../classes/FusionRecipe";
import { Demon } from "../classes/Demon";

export function findPathFromComponentToResult(
  demon: Demon,
  targetComponents: string[]
) {
  return new Promise<FusionRecipe>((resolve, reject) => {
    let recipe = getBestFusionRecipe(
      demon,
      targetComponents,
      (r: FusionRecipe, t: string[]) => r.foundComponents(t),
      10
    );
    resolve(recipe);
  });
}

export function findFusionRecipes(demon: Demon, targetSkills: string[]) {
  return new Promise<FusionRecipe>((resolve, reject) => {
    let recipe = getBestFusionRecipe(
      demon,
      targetSkills,
      (r: FusionRecipe, t: string[]) => r.foundSkills(t),
      10
    );
    resolve(recipe);
  });
}

function getBestFusionRecipe(
  demon: Demon,
  targets: string[],
  found: (r: FusionRecipe, t: string[]) => string[],
  maxDepth: number
) {
  let bestChain = new FusionRecipe(demon);
  for (let i = 1; i < maxDepth; i++) {
    let recipe = getFusionRecipes(demon, targets, found, i, 0);
    if (found(recipe, targets).length >= targets.length) {
      return recipe;
    }
    if (found(recipe, targets).length > found(bestChain, targets).length) {
      bestChain = recipe;
    }
  }
  return bestChain;
}

function getFusionRecipes(
  demon: Demon,
  targets: string[],
  found: (r: FusionRecipe, t: string[]) => string[],
  depthLimit: number,
  curDepth: number
) {
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
      let missing = findMissing(found(result, targets), targets);
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

function findMissing(found: string[], targets: string[]) {
  return targets.filter((s) => !found.includes(s));
}
