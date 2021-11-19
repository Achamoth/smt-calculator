import {
  Autocomplete,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { FusionRecipeResult } from "./FusionRecipeResult.js";
import { get_all_skills, parse_demons } from "./../utils/demon_utils.js";
import { findFusionRecipes } from "./../utils/fusion_recipe.js";
import "./FusionRecipeComponentFinder.css";

const RecipeCalculationStatus = {
  UNSTARTED: 0,
  RUNNING: 1,
  FINISHED: 2,
};

const State = {
  COMPONENTS: 0,
  DEMON: 1,
};

function onChangeState(newValue, stateType, setState) {
  switch (stateType) {
    case State.COMPONENTS:
      setState((s) => {
        return { ...s, components: newValue };
      });
      break;
    case State.DEMON:
      setState((s) => {
        return { ...s, demon: newValue?.name };
      });
      break;
    default:
      break;
  }
}

export function FusionRecipeComponentFinder() {
  const demons = parse_demons();
  const demonOptions = demons.map((d) => {
    return { label: `${d.race} ${d.name}`, name: d.name };
  });

  let [state, setState] = useState({ components: [] });
  let [recipeCalculationStatus, setRecipeCalculationStatus] = useState(
    RecipeCalculationStatus.UNSTARTED
  );
  let [fusionRecipe, setFusionRecipe] = useState(null);

  return (
    <div className="fusionByComponentsContainer">
      <div className="demonSelection">
        <Autocomplete
          className="demonSelection"
          disablePortal
          id="demonSelection"
          options={demonOptions}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Demon to fuse" />
          )}
          onChange={(e, v) => onChangeState(v, State.DEMON, setState)}
          isOptionEqualToValue={(o, v) => o.label === v.label}
        />
      </div>

    </div>
  );
}
