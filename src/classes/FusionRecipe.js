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

  foundSkills(targetSkills) {
    return this.skills.filter((s) => targetSkills.includes(s));
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
    skills.push(this.demon.skills.map(s => s.name));
    this.recipes.forEach(r => {
      skills.push(r.demon.skills.map(s => s.name));
    })
    return skills.filter(s => targetSkills.includes(s));
  }
}
