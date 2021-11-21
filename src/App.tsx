import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { loadGameData } from "./utils/load_data";
import { DemonTable } from "./DemonTable";
import { DemonFusions } from "./DemonFusions";
import { Skills } from "./Skills";
import { FusionRecipe } from "./FusionRecipe/FusionRecipe";
import { SkillDetails } from "./SkillDetails";

function App() {
  let { fusionData, skillList, skillDetails } = loadGameData();

  return (
    <>
      <Router basename={"/smt-calculator"}>
        <Routes>
          <Route path="/" element={<DemonTable demons={fusionData.demons} />} />
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
            element={<DemonFusions fusionData={fusionData} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
