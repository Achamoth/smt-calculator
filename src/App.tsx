import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { loadGameData, supportedGames, Game } from "./utils/load_data";
import { DemonTable } from "./DemonTable";
import { DemonDetails } from "./DemonDetails";
import { Skills } from "./Skills";
import { FusionRecipe } from "./FusionRecipe/FusionRecipe";
import { SkillDetails } from "./SkillDetails";
import { useState } from "react";
import { NavBar } from "./NavBar";

function App() {
  let [game, setGame] = useState(Game.SMT_V_V);
  let games = supportedGames();
  let { fusionData, skillList, skillDetails, resistances } = loadGameData(game);
  let gameSelectorData = {
    games: games,
    selectedGame: game,
    onGameSelectionChanged: setGame,
  };

  return (
    <Router basename={"/smt-calculator"}>
      <div>
        <NavBar gameSelectionProps={gameSelectorData} />
        <Routes>
          <Route path="/" element={<DemonTable demons={fusionData.demons} resistances={resistances} />} />
          <Route path="/skills" element={<Skills skills={skillList} />} />
          <Route path="/skills/:skillName" element={<SkillDetails skills={skillDetails} />} />
          <Route path="/recipe" element={<FusionRecipe fusionData={fusionData} skillList={skillList} game={game} />} />
          <Route path="/:demonName" element={<DemonDetails fusionData={fusionData} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
