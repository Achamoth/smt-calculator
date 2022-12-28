import { findFusionRecipes } from "./fusion_recipe.ts";
import { Game, loadGameData } from "./load_data.ts";

const crazyUpgrade: string[] = ["Enduring Soul", "Charge", "High Gun Pleroma", "Gun Pleroma", "Riot Gun", "Dark Energy"];
let data = loadGameData(Game.SMT_IV);
let shiva = data.fusionData.demons.filter((d) => d.name === "Shiva")[0];
const result = findFusionRecipes(data.fusionData, shiva, crazyUpgrade, 1);
console.log(result);
