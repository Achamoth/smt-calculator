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

function DemonSelection(props) {
  return (
    <div className="demonSelection">
      <Autocomplete
        value={props.value}
        key={props.key}
        className="demonSelection"
        disablePortal
        id="demonSelection"
        options={props.demonOptions}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label={props.label} />}
        onChange={(e, v) => props.onChange(e, v)}
        isOptionEqualToValue={(o, v) => o.label === v.label}
      />
    </div>
  );
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
      <div>
        <DemonSelection
          demonOptions={demonOptions}
          label="Demon to fuse"
          onChange={(e, v) =>
            setState((s) => {
              return { ...s, demon: v?.name };
            })
          }
        />
      </div>
      <div className="componentSelection">
        {state.components.map((c, i) => {
          return (
            <DemonSelection
              value={c}
              key={c.name}
              demonOptions={demonOptions}
              label={`Component ${i + 1}`}
              onChange={(e, v) =>
                setState((s) => {
                  let newComponents = s.components;
                  if (!v) {
                    newComponents.splice(i, 1);
                  } else {
                    newComponents[i] = v;
                  }
                  return { ...s, components: newComponents };
                })
              }
            />
          );
        })}
        <DemonSelection
          key={state.components.length}
          demonOptions={demonOptions}
          label={`Component ${state.components.length + 1}`}
          onChange={(e, v) =>
            setState((s) => {
              let newComponents = s.components;
              if (v) {
                newComponents.push(v);
              }
              return { ...s, components: newComponents };
            })
          }
        />
      </div>
    </div>
  );
}
