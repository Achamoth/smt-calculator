import { useState } from "react";
import {
  Autocomplete,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { Demon } from "../classes/Demon";
import { FusionRecipe } from "../classes/FusionRecipe";
import { FusionData, SkillDemonMap } from "../utils/types";
import { findFusionRecipes } from "../utils/fusion_recipe";
import { FusionRecipeResult } from "./FusionRecipeResult";
import styles from "./FusionRecipeSkillFinder.module.css";
import globalStyles from "../globals.module.css";

enum RecipeCalculationStatus {
  UNSTARTED,
  RUNNING,
  FINISHED,
}

enum StateChange {
  SKILL,
  DEMON,
}

type FusionRecipeSkillFinderState = {
  skill_1?: string;
  skill_2?: string;
  skill_3?: string;
  skill_4?: string;
  skill_5?: string;
  skill_6?: string;
  skill_7?: string;
  skill_8?: string;
  demon?: string;
};

type ChangeStateSkill = {
  stateType: StateChange.SKILL;
  newValue: string | null;
  skillNumber: number;
};

type ChangeStateDemon = {
  stateType: StateChange.DEMON;
  newValue: DemonOption | null;
  demons: Demon[];
};

type DemonOption = {
  label: string;
  name: string;
};

interface FusionRecipeSkillFinderProps {
  fusionData: FusionData;
  skillList: SkillDemonMap[];
}

function getTargetSkills(state: FusionRecipeSkillFinderState) {
  let result = [];
  if (state.skill_1) result.push(state.skill_1);
  if (state.skill_2) result.push(state.skill_2);
  if (state.skill_3) result.push(state.skill_3);
  if (state.skill_4) result.push(state.skill_4);
  if (state.skill_5) result.push(state.skill_5);
  if (state.skill_6) result.push(state.skill_6);
  if (state.skill_7) result.push(state.skill_7);
  if (state.skill_8) result.push(state.skill_8);
  return result;
}

function getFusionRecipe(
  state: FusionRecipeSkillFinderState,
  fusionData: FusionData,
  demons: Demon[],
  completionCallback: () => void,
  setFusionRecipe: React.Dispatch<
    React.SetStateAction<FusionRecipe | undefined>
  >
) {
  let demon = demons.find((d) => d.name === state.demon)!;
  let skills = getTargetSkills(state);
  let promise = findFusionRecipes(fusionData, demon, skills);
  promise.then(
    (v) => {
      completionCallback();
      setFusionRecipe(v);
    },
    (r) => {}
  );
}

function getNewStateWhenDemonChanges(
  demonOption: DemonOption,
  demons: Demon[]
): FusionRecipeSkillFinderState {
  let demon = demons.find((d) => d.name === demonOption.name)!;
  let newState: any = { demon: demon.name };
  for (let i: number = 1; i < 9; i++) {
    if (demon.skills[i]) {
      newState[`skill_${i}`] = demon.skills[i].name;
    }
  }
  return newState;
}

function onChangeState(
  stateChange: ChangeStateSkill | ChangeStateDemon,
  setState: Function, // TODO I can't figure out how to pass a lambda function that accepts a lambda function parameter
  setRecipeCalculationStatus: Function,
  setFusionRecipe: Function
) {
  setRecipeCalculationStatus(RecipeCalculationStatus.UNSTARTED);
  setFusionRecipe(null);
  switch (stateChange.stateType) {
    case StateChange.SKILL:
      switch (stateChange.skillNumber) {
        case 1:
          setState((s: FusionRecipeSkillFinderState) => {
            return { ...s, skill_1: stateChange.newValue };
          });
          break;
        case 2:
          setState((s: FusionRecipeSkillFinderState) => {
            return { ...s, skill_2: stateChange.newValue };
          });
          break;
        case 3:
          setState((s: FusionRecipeSkillFinderState) => {
            return { ...s, skill_3: stateChange.newValue };
          });
          break;
        case 4:
          setState((s: FusionRecipeSkillFinderState) => {
            return { ...s, skill_4: stateChange.newValue };
          });
          break;
        case 5:
          setState((s: FusionRecipeSkillFinderState) => {
            return { ...s, skill_5: stateChange.newValue };
          });
          break;
        case 6:
          setState((s: FusionRecipeSkillFinderState) => {
            return { ...s, skill_6: stateChange.newValue };
          });
          break;
        case 7:
          setState((s: FusionRecipeSkillFinderState) => {
            return { ...s, skill_7: stateChange.newValue };
          });
          break;
        case 8:
          setState((s: FusionRecipeSkillFinderState) => {
            return { ...s, skill_8: stateChange.newValue };
          });
          break;
      }
      break;
    case StateChange.DEMON:
      setState((s: FusionRecipeSkillFinderState) => {
        if (!stateChange.newValue) {
          return {};
        }
        return getNewStateWhenDemonChanges(
          stateChange.newValue,
          stateChange.demons
        );
        // return { ...s, demon: stateChange.newValue?.name };
      });
      break;
    default:
      break;
  }
}

export function FusionRecipeSkillFinder(props: FusionRecipeSkillFinderProps) {
  const skills = props.skillList.map((s) => s.name);
  const demons = props.fusionData.demons;
  const demonOptions: DemonOption[] = demons.map((d) => {
    return { label: `${d.race} ${d.name}`, name: d.name };
  });

  let [state, setState] = useState<FusionRecipeSkillFinderState>({});
  let [recipeCalculationStatus, setRecipeCalculationStatus] = useState(
    RecipeCalculationStatus.UNSTARTED
  );
  let [fusionRecipe, setFusionRecipe] = useState<FusionRecipe>();

  return (
    <div>
      <div className={globalStyles.centeredContainer}>
        <div className={styles.demonSelection}>
          <Autocomplete
            className={styles.demonSelection}
            disablePortal
            id="demonSelection"
            options={demonOptions}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Demon to fuse" />
            )}
            onChange={(e, v) =>
              onChangeState(
                { stateType: StateChange.DEMON, newValue: v, demons: demons },
                setState,
                setRecipeCalculationStatus,
                setFusionRecipe
              )
            }
            isOptionEqualToValue={(o, v) => o.label === v.label}
          />
        </div>
      </div>
      <div className={globalStyles.centeredContainer}>
        <div className={styles.skillSelectionPair}>
          <Autocomplete
            value={state.skill_1 ?? null}
            className={styles.skillSelection}
            disablePortal
            id="skillSelection1"
            options={skills}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Skill 1" />}
            onChange={(e, v) =>
              onChangeState(
                { stateType: StateChange.SKILL, newValue: v, skillNumber: 1 },
                setState,
                setRecipeCalculationStatus,
                setFusionRecipe
              )
            }
          />
          <Autocomplete
            value={state.skill_2 ?? null}
            className={styles.skillSelection}
            disablePortal
            id="skillSelection2"
            options={skills}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Skill 2" />}
            onChange={(e, v) =>
              onChangeState(
                { stateType: StateChange.SKILL, newValue: v, skillNumber: 2 },
                setState,
                setRecipeCalculationStatus,
                setFusionRecipe
              )
            }
          />
          <div className={styles.skillSelectionPair}>
            <Autocomplete
              value={state.skill_3 ?? null}
              className={styles.skillSelection}
              disablePortal
              id="skillSelection3"
              options={skills}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Skill 3" />
              )}
              onChange={(e, v) =>
                onChangeState(
                  { stateType: StateChange.SKILL, newValue: v, skillNumber: 3 },
                  setState,
                  setRecipeCalculationStatus,
                  setFusionRecipe
                )
              }
            />
            <Autocomplete
              value={state.skill_4 ?? null}
              className={styles.skillSelection}
              disablePortal
              id="skillSelection4"
              options={skills}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Skill 4" />
              )}
              onChange={(e, v) =>
                onChangeState(
                  { stateType: StateChange.SKILL, newValue: v, skillNumber: 4 },
                  setState,
                  setRecipeCalculationStatus,
                  setFusionRecipe
                )
              }
            />
          </div>
          <div className={styles.skillSelectionPair}>
            <Autocomplete
              value={state.skill_5 ?? null}
              className={styles.skillSelection}
              disablePortal
              id="skillSelection5"
              options={skills}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Skill 5" />
              )}
              onChange={(e, v) =>
                onChangeState(
                  { stateType: StateChange.SKILL, newValue: v, skillNumber: 5 },
                  setState,
                  setRecipeCalculationStatus,
                  setFusionRecipe
                )
              }
            />
            <Autocomplete
              value={state.skill_6 ?? null}
              className={styles.skillSelection}
              disablePortal
              id="skillSelection6"
              options={skills}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Skill 6" />
              )}
              onChange={(e, v) =>
                onChangeState(
                  { stateType: StateChange.SKILL, newValue: v, skillNumber: 6 },
                  setState,
                  setRecipeCalculationStatus,
                  setFusionRecipe
                )
              }
            />
          </div>
          <div className={styles.skillSelectionPair}>
            <Autocomplete
              value={state.skill_7 ?? null}
              className={styles.skillSelection}
              disablePortal
              id="skillSelection7"
              options={skills}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Skill 7" />
              )}
              onChange={(e, v) =>
                onChangeState(
                  { stateType: StateChange.SKILL, newValue: v, skillNumber: 7 },
                  setState,
                  setRecipeCalculationStatus,
                  setFusionRecipe
                )
              }
            />
            <Autocomplete
              value={state.skill_8 ?? null}
              className={styles.skillSelection}
              disablePortal
              id="skillSelection8"
              options={skills}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Skill 8" />
              )}
              onChange={(e, v) =>
                onChangeState(
                  { stateType: StateChange.SKILL, newValue: v, skillNumber: 8 },
                  setState,
                  setRecipeCalculationStatus,
                  setFusionRecipe
                )
              }
            />
          </div>
        </div>
      </div>
      <div className={globalStyles.centeredContainer}>
        <Button
          className={styles.findRecipeButton}
          variant="contained"
          onClick={() => {
            setRecipeCalculationStatus(RecipeCalculationStatus.RUNNING);
            getFusionRecipe(
              state,
              props.fusionData,
              demons,
              () =>
                setRecipeCalculationStatus(RecipeCalculationStatus.FINISHED),
              setFusionRecipe
            );
          }}
        >
          Find Recipe
        </Button>
      </div>
      <div className={globalStyles.centeredContainer}>
        {recipeCalculationStatus === RecipeCalculationStatus.RUNNING && (
          <CircularProgress />
        )}
        {recipeCalculationStatus === RecipeCalculationStatus.FINISHED &&
          fusionRecipe && (
            <FusionRecipeResult
              recipe={fusionRecipe}
              skills={getTargetSkills(state)}
            />
          )}
      </div>
    </div>
  );
}
