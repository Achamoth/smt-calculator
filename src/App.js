import { parse_demons } from "./utils/demon_utils.js";
import { DemonTable } from "./DemonTable.js";
import { DemonFusions } from "./DemonFusions";
import { Skills } from "./Skills.js";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { FusionRecipe } from "./FusionRecipe.js";

function App() {
  let demons = parse_demons();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<DemonTable demons={demons} />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/recipe" element={<FusionRecipe />} />
        <Route path="/:demonName" element={<DemonFusions demons={demons} />} />
      </Routes>
    </Router>
  );
}

export default App;
