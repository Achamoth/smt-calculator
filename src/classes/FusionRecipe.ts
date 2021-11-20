import { Demon } from "./Demon";

export class FusionRecipe {
  
  recipes: FusionRecipe[];

  constructor(public demon: Demon) {
    this.demon = demon;
    this.recipes = [];
  }

  get skills() {
    let result: string[] = [];
    result.push(...this.demon.skills.map((s) => s.name));
    this.recipes.forEach((r) => result.push(...r.skills));
    return result.flat();
  }

  get components() {
    let result: string[] = [];
    result.push(this.demon.name);
    this.recipes.forEach((r) => result.push(...r.components));
    return result.flat();
  }

  foundSkills(targetSkills: string[]) {
    let skills: string[] = this.skills.filter((s) => targetSkills.includes(s));
    return [...new Set(skills)];
  }

  foundComponents(targetComponents: string[]) {
    let components = this.components.filter((s) =>
      targetComponents.includes(s)
    );
    return [...new Set(components)];
  }

  addComponentRecipe(recipe: FusionRecipe) {
    this.recipes.push(recipe);
  }

  replaceRecipe(demonName: string, newRecipe: FusionRecipe) {
    let index = this.recipes.findIndex((r) => r.demon.name === demonName);
    this.recipes[index] = newRecipe;
  }

  immediateSkillIntersection(targetSkills: string[]) {
    let skills: string[] = [];
    skills.push(...this.demon.skills.map((s) => s.name));
    this.recipes.forEach((r) => {
      skills.push(...r.demon.skills.map((s) => s.name));
    });
    return skills.filter((s) => targetSkills.includes(s));
  }
}
