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

  parseChain(depth, targetSkills) {
    let result = "";
    if (!this.recipes.length) return result;
    for (let i = 0; i < depth; i++) result += "\t";
    result += `${this.demon.race} ${this.demon.name} = `;
    this.recipes.forEach((r, i) => {
      result += `${r.demon.race} ${r.demon.name}`;
      if (this.recipes.length > i + 1) result += " + ";
    });
    result += "\n";

    this.recipes.forEach((r) => {
      let skillsFromComponent = r.demon.skills
        .map((s) => s.name)
        .filter((s) => targetSkills.includes(s));
      if (skillsFromComponent.length) {
        for (let i = 0; i < depth; i++) result += "\t";
        result += `${r.demon.race} ${r.demon.name}: `;
        skillsFromComponent.forEach((s, i) => {
          result += s;
          if (skillsFromComponent.length > i + 1) result += ", ";
        });
        result += '\n';
      }
    });

    this.recipes.forEach((r) => {
      result += r.parseChain(depth + 1, targetSkills);
    });

    return result;
  }
}
