import { SMT_5_SKILL_DATA } from "./../smt_v_data/skill_data.js";

export function get_skill_data() {
    let skills = [];
    for (const property in SMT_5_SKILL_DATA) {
        skills.push({name: property, skill: SMT_5_SKILL_DATA[property]});
    }
    return skills;
}