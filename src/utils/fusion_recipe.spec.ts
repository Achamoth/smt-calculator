import { Demon } from "../classes/Demon";
import { findFusionRecipes } from "./fusion_recipe";
import { Game, loadGameData } from "./load_data";

const crazyDemon: Demon = {
  race: "Fury",
  name: "Shiva",
  level: 90,
  skills: [
    {
      name: "Antichthon",
      level: 0,
    },
    {
      name: "Enduring Soul",
      level: 0,
    },
    {
      name: "Repel Phys",
      level: 91,
    },
    {
      name: "Victory Cry",
      level: 92,
    },
  ],
  resistances: "s-d-d-nn",
  affinities: [],
};

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

  try {
    const result = await findFusionRecipes(
      data.fusionData,
      crazyDemon,
      crazyUpgrade,
      { max_level: 99,  excluded_demons: []}
    );
    console.log("result: ", result);
  } catch (e) {
    throw e;
  }
});
