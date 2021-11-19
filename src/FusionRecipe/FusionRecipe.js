import { useState } from "react";
import { Button } from "@mui/material";
import { FusionRecipeSkillFinder } from "./FusionRecipeSkillFinder.js";
import { NavBar } from "../NavBar.js";
import "./FusionRecipe.css";

const CalculationType = {
  SKILLS: "skills",
  COMPONENTS: "components",
};

function buttonOutlineType(buttonCalculationType, curCalculationType) {
  return buttonCalculationType === curCalculationType ? "outlined" : "text";
}

export function FusionRecipe() {
  let [calculationType, setCalculationType] = useState(CalculationType.SKILLS);

  return (
    <div>
      <NavBar />
      <div className="recipeFinderContainer">
        <Button
          className="toggleRecipeType"
          variant={buttonOutlineType(CalculationType.SKILLS, calculationType)}
          onClick={e => setCalculationType(CalculationType.SKILLS)}
        >
          Skills
        </Button>
        <Button
          className="toggleRecipeType"
          variant={buttonOutlineType(
            CalculationType.COMPONENTS,
            calculationType
          )}
          onClick={e => setCalculationType(CalculationType.COMPONENTS)}
        >
          Components
        </Button>
        <div className="recipeFinder">
          <FusionRecipeSkillFinder />
        </div>
      </div>
    </div>
  );
}
