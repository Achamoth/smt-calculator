import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { loadGameData, supportedGames, Game } from "./utils/load_data";
import { GameSelector } from "./GameSelector";
import { DemonTable } from "./DemonTable";
import { DemonDetails } from "./DemonDetails";
import { Skills } from "./Skills";
import { FusionRecipe } from "./FusionRecipe/FusionRecipe";
import { SkillDetails } from "./SkillDetails";
import { useState } from "react";

function App() {
  let [game, setGame] = useState(Game.SMT_V);
  let games = supportedGames();
  let { fusionData, skillList, skillDetails, attributes, resistances } =
    loadGameData(game);

  return (
    <div>
      <GameSelector
        games={games}
        selectedGame={game}
        onGameSelectionChanged={setGame}
      />
      <Router basename={"/smt-calculator"}>
        <Routes>
          <Route
            path="/"
            element={
              <DemonTable
                demons={fusionData.demons}
                attributes={attributes}
                resistances={resistances}
              />
            }
          />
          <Route path="/skills" element={<Skills skills={skillList} />} />
          <Route
            path="/skills/:skillName"
            element={<SkillDetails skills={skillDetails} />}
          />
          <Route
            path="/recipe"
            element={
              <FusionRecipe fusionData={fusionData} skillList={skillList} />
            }
          />
          <Route
            path="/:demonName"
            element={<DemonDetails fusionData={fusionData} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
