export class Demon {
  constructor(
    public race: string,
    public name: string,
    public level: number,
    public skills: Skill[],
    public resistances: string,
    public affinities: number[]
  ) {}
}

export type Skill = {
  name: string;
  level: number;
};
