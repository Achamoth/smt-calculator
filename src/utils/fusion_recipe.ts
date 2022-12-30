import { FusionRecipe } from "../classes/FusionRecipe";
import { Demon } from "../classes/Demon";
import { getFusionCombinations } from "./demon_fusion";
import { FusionData } from "./types";

type ConfigurationParameters = {
  max_level: number;
  excluded_demons: string[];
};

export function findPathFromComponentToResult(fusionData: FusionData, demon: Demon, targetComponents: string[]) {
  return getBestFusionRecipe(fusionData, demon, targetComponents, (r: FusionRecipe, t: string[]) => r.foundComponents(t), 5);
}

export function findFusionRecipes(fusionData: FusionData, demon: Demon, targetSkills: string[], configurationParameters: ConfigurationParameters) {
  return getBestFusionRecipe(fusionData, demon, targetSkills, (r: FusionRecipe, t: string[]) => r.foundSkills(t), 5, configurationParameters);
}

function getBestFusionRecipe(
  fusionData: FusionData,
  demon: Demon,
  targets: string[],
  found: (r: FusionRecipe, t: string[]) => string[],
  maxDepth: number,
  configuration: ConfigurationParameters = { max_level: 99, excluded_demons: [] }
) {
  console.log(configuration);
  let bestChain = new FusionRecipe(demon);
  for (let i = 1; i < maxDepth; i++) {
    let recipe = getFusionRecipes(fusionData, demon, targets, found, configuration, i, 0);
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
  fusionData: FusionData,
  demon: Demon,
  targets: string[],
  found: (r: FusionRecipe, t: string[]) => string[],
  configuration: ConfigurationParameters,
  depthLimit: number,
  curDepth: number
) {
  let bestChain = new FusionRecipe(demon);

  if (curDepth === depthLimit) {
    return bestChain;
  }

  let fusionCombinations = getFusionCombinations(demon, fusionData);

  for (let combination of fusionCombinations) {
    if (combination.some((d) => shouldSkipDemon(d, fusionData, configuration))) continue;
    let result = new FusionRecipe(demon);

    combination.forEach((d) => {
      result.addComponentRecipe(new FusionRecipe(d));
    });

    if (found(result, targets).length >= targets.length) {
      return result;
    }

    for (const component of combination) {
      let missing = findMissing(found(result, targets), targets);
      let newRecipe = getFusionRecipes(fusionData, component, missing, found, configuration, depthLimit, curDepth + 1);
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

// Famed/Undead demons only come from accidents in SMT IV, so they're useless in a recipe unless they're a special fusion.
function shouldSkipDemon(d: Demon, data: FusionData, configuration: ConfigurationParameters): boolean {
  const onlyAttaiinableByFusionAccident =
    (d.race.toLocaleLowerCase() === "famed" || d.race.toLocaleLowerCase() === "undead") &&
    !data.specialFusions.some((s) => s.name.toLocaleLowerCase() === d.name.toLocaleLowerCase());
  const isAboveMaxLevelDesired = d.level > configuration.max_level;
  const isExcludedDemon = configuration.excluded_demons.map((dn) => dn.toLocaleLowerCase()).includes(d.name.toLocaleLowerCase());
  return onlyAttaiinableByFusionAccident || isAboveMaxLevelDesired || isExcludedDemon;
}

function findMissing(found: string[], targets: string[]) {
  return targets.filter((s) => !found.includes(s));
}
