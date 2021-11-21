import {
  Autocomplete,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { FusionRecipe } from "../classes/FusionRecipe";
import { FusionData } from "../utils/types";
import { findPathFromComponentToResult } from "../utils/fusion_recipe";
import { FusionRecipeResult } from "./FusionRecipeResult";
import styles from "./FusionRecipeComponentFinder.module.css";

enum RecipeCalculationStatus {
  UNSTARTED,
  RUNNING,
  FINISHED,
}

type ComponentFinderState = {
  demon?: DemonOption | null;
  components: DemonOption[];
};

type DemonOption = {
  label: string;
  name: string;
};

interface DemonSelectionProps {
  value?: DemonOption;
  label: string;
  key?: string;
  demonOptions: DemonOption[];
  onChange: (e: any, v: DemonOption | null) => void;
}

interface FusionRecipeComponentFinderProps {
  fusionData: FusionData;
}

function getFusionRecipe(
  state: ComponentFinderState,
  fusionData: FusionData,
  completionCallback: () => void,
  setFusionRecipe: (v: FusionRecipe) => void
) {
  let demon = fusionData.demons.find((d) => d.name === state.demon!.name)!;
  let promise = findPathFromComponentToResult(
    fusionData,
    demon,
    state.components.map((c) => c.name)
  );
  promise.then(
    (v) => {
      completionCallback();
      setFusionRecipe(v);
    },
    (r) => {}
  );
}

function DemonSelection(props: DemonSelectionProps) {
  return (
    <div className={styles.demonSelection}>
      <Autocomplete
        value={props.value}
        key={props.key}
        className={styles.demonSelection}
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

export function FusionRecipeComponentFinder(
  props: FusionRecipeComponentFinderProps
) {
  const demons = props.fusionData.demons;
  const demonOptions: DemonOption[] = demons.map((d) => {
    return { label: `${d.race} ${d.name}`, name: d.name };
  });

  let [state, setState] = useState<ComponentFinderState>({ components: [] });
  let [recipeCalculationStatus, setRecipeCalculationStatus] = useState(
    RecipeCalculationStatus.UNSTARTED
  );
  let [fusionRecipe, setFusionRecipe] = useState<FusionRecipe>();

  return (
    <div className={styles.fusionByComponentsContainer}>
      <div className={styles.demonAndComponentSelection}>
        <div>
          <DemonSelection
            demonOptions={demonOptions}
            label="Demon to fuse"
            onChange={(e: any, v: DemonOption | null) =>
              setState((s) => {
                return { ...s, demon: v };
              })
            }
          />
        </div>
        <div className={styles.componentSelection}>
          {state.components.map((c, i) => {
            return (
              <DemonSelection
                value={c}
                key={c.name}
                demonOptions={demonOptions}
                label={`Component ${i + 1}`}
                onChange={(e: any, v: DemonOption | null) =>
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
            key={state.components.length.toString()}
            demonOptions={demonOptions}
            label={`Component ${state.components.length + 1}`}
            onChange={(e: any, v: DemonOption | null) =>
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
      <div className={styles.centeredWithBottomMargin}>
        <Button
          variant="contained"
          onClick={() => {
            setRecipeCalculationStatus(RecipeCalculationStatus.RUNNING);
            getFusionRecipe(
              state,
              props.fusionData,
              () =>
                setRecipeCalculationStatus(RecipeCalculationStatus.FINISHED),
              setFusionRecipe
            );
          }}
        >
          Find Recipe
        </Button>
      </div>
      <div className={styles.centeredWithBottomMargin}>
        {recipeCalculationStatus === RecipeCalculationStatus.RUNNING && (
          <CircularProgress />
        )}
        {recipeCalculationStatus === RecipeCalculationStatus.FINISHED &&
          fusionRecipe && (
            <FusionRecipeResult recipe={fusionRecipe} skills={[]} />
          )}
      </div>
    </div>
  );
}
