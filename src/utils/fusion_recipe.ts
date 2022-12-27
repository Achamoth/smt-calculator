import { FusionRecipe } from "../classes/FusionRecipe";
import { Demon } from "../classes/Demon";
import { getFusionCombinations } from "./demon_fusion";
import { FusionData } from "./types";

export function findPathFromComponentToResult(
  fusionData: FusionData,
  demon: Demon,
  targetComponents: string[],
  resultLimit: number = 1,
  depthLimit: number = 10
) {
  return getBestFusionRecipes(
    fusionData,
    demon,
    targetComponents,
    (r: FusionRecipe, t: string[]) => r.foundComponents(t),
    depthLimit,
    resultLimit
  );
}

export function findFusionRecipes(
  fusionData: FusionData,
  demon: Demon,
  targetSkills: string[],
  resultLimit: number,
  depthLimit: number = 10
) {
  return getBestFusionRecipes(
    fusionData,
    demon,
    targetSkills,
    (r: FusionRecipe, t: string[]) => r.foundSkills(t),
    depthLimit,
    resultLimit
  );
}

function getBestFusionRecipes(
  fusionData: FusionData,
  demon: Demon,
  targets: string[],
  found: (r: FusionRecipe, t: string[]) => string[],
  maxDepth: number,
  resultLimit: number
) {
  console.log(resultLimit);
  let recipes: FusionRecipe[] = [];
  for (let i = 1; i < maxDepth; i++) {
    console.log(i);
    let curDepthRecipes = getFusionRecipes(
      fusionData,
      demon,
      targets,
      found,
      i,
      0,
      resultLimit - recipes.length
    );
    for (let index = 0; index < curDepthRecipes.length; index++) {
      let r = curDepthRecipes[index];
      if (found(r, targets).length >= targets.length) {
        recipes.push(r);
      }
      if (recipes.length >= resultLimit) break;
    }
  }
  return recipes;
}

function getFusionRecipes(
  fusionData: FusionData,
  demon: Demon,
  targets: string[],
  found: (r: FusionRecipe, t: string[]) => string[],
  depthLimit: number,
  curDepth: number,
  resultLimit: number
) {
  let foundRecipes: FusionRecipe[] = [];

  if (curDepth === depthLimit) {
    return foundRecipes;
  }

  let fusionCombinations = getFusionCombinations(demon, fusionData);

  for (let combination of fusionCombinations) {
    let result = new FusionRecipe(demon);

    combination.forEach((d) => {
      result.addComponentRecipe(new FusionRecipe(d));
    });

    if (found(result, targets).length >= targets.length) {
      foundRecipes.push(result);
      if (foundRecipes.length >= resultLimit) {
        return foundRecipes;
      }
    }

    for (const component of combination) {
      console.log(curDepth, component);
      let missing = findMissing(found(result, targets), targets);
      let newRecipes = getFusionRecipes(
        fusionData,
        component,
        missing,
        found,
        depthLimit,
        curDepth + 1,
        resultLimit - foundRecipes.length
      );
      for (let index = 0; index < newRecipes?.length; index++) {
        let componentRecipe = newRecipes[index];
        result.replaceRecipe(component.name, componentRecipe);
        if (found(result, targets).length >= targets.length) {
          foundRecipes.push(result);
          if (foundRecipes.length >= resultLimit) {
            return foundRecipes;
          }
        }
      }
    }
  }

  return foundRecipes;
}

function findMissing(found: string[], targets: string[]) {
  return targets.filter((s) => !found.includes(s));
}
