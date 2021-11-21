import { parse_demons } from "./utils/demon_utils";
import { DemonTable } from "./DemonTable";
import { DemonFusions } from "./DemonFusions";
import { Skills } from "./Skills";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FusionRecipe } from "./FusionRecipe/FusionRecipe";
import { SkillDetails } from "./SkillDetails";

function App() {
  let demons = parse_demons();

  return (
    <Router basename={"/smt-calculator"}>
      <Routes>
        <Route path="/" element={<DemonTable demons={demons} />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/skills/:skillName" element={<SkillDetails />} />
        <Route path="/recipe" element={<FusionRecipe />} />
        <Route path="/:demonName" element={<DemonFusions demons={demons} />} />
      </Routes>
    </Router>
  );
}

export default App;
