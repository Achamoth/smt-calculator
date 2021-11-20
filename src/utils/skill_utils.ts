import { SMT_5_SKILL_DATA } from "./../smt_v_data/skill_data.js";

export type SkillDetails = {
    cost: number;
    effect: string;
    element: string;
    rank: number;
    target: string;
}

export type SkillDefinition = {
    name: string;
    skill: SkillDetails;
}

export function get_skill_data(): SkillDefinition[] {
    let skills: SkillDefinition[] = [];
    for (const property in SMT_5_SKILL_DATA) {
        skills.push({name: property, skill: SMT_5_SKILL_DATA[property]});
    }
    return skills;
}