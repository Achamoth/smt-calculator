export class FusionRecipe {
  constructor(demon) {
    this.demon = demon;
    this.recipes = [];
  }

  get skills() {
    let result = [];
    result.push(this.demon.skills.map((s) => s.name));
    this.recipes.forEach((r) => result.push(r.skills));
    return result.flat();
  }

  get components() {
    let result = [];
    result.push(this.demon.name);
    this.recipe.forEach((r) => result.push(r.components));
    return result.flat();
  }

  foundSkills(targetSkills) {
    let skills = this.skills.filter((s) => targetSkills.includes(s));
    return [...new Set(skills)];
  }

  foundComponents(targetComponents) {
    let components = this.components.filter((s) =>
      targetComponents.includes(s)
    );
    return [...new Set(components)];
  }

  addComponentRecipe(recipe) {
    this.recipes.push(recipe);
  }

  replaceRecipe(demonName, newRecipe) {
    let index = this.recipes.findIndex((r) => r.demon.name === demonName);
    this.recipes[index] = newRecipe;
  }

  immediateSkillIntersection(targetSkills) {
    let skills = [];
    skills.push(this.demon.skills.map((s) => s.name));
    this.recipes.forEach((r) => {
      skills.push(r.demon.skills.map((s) => s.name));
    });
    return skills.filter((s) => targetSkills.includes(s));
  }
}
