import { findFusionRecipes } from "./fusion_recipe";
import { Game, loadGameData } from "./load_data";

const crazyUpgrade: string[] = [
  "Enduring Soul",
  "Repel Phys",
  "Victory Cry",
  "High Gun Pleroma",
  "Gun Pleroma",
  "Gun Pierce",
  "Riot Gun",
  "Dark Energy",
];

it(`getFusionRecipes doesn't freeze`, async () => {
  let data = loadGameData(Game.SMT_IV);
  let shiva = data.fusionData.demons.filter((d) => d.name === "Shiva")[0];
  console.log("test");

  try {
    const result = findFusionRecipes(data.fusionData, shiva, crazyUpgrade, 1);
    console.log("result: ", result);
  } catch (e) {
    throw e;
  }
});
