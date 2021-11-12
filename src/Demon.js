export class Demon {
  constructor(race, name, level, skills, resistances, affinities) {
    this.race = race;
    this.name = name;
    this.level = level;
    this.skills = skills;
    this.resistances = resistances;
    this.affinities = affinities;
  }
}

export class Skill {
  constructor(name, level) {
    this.name = name;
    this.level = level;
  }
}
