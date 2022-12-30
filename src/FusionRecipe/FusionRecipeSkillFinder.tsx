import { useState } from "react";
import { Autocomplete, TextField, Button } from "@mui/material";
import { Demon } from "../classes/Demon";
import { FusionRecipe } from "../classes/FusionRecipe";
import { FusionData, SkillDemonMap } from "../utils/types";
import { getInnateSkills } from "../utils/demon_utils";
import { findFusionRecipes } from "../utils/fusion_recipe";
import { FusionRecipeResult } from "./FusionRecipeResult";
import { DemonSelection } from "./FusionRecipeComponentFinder";
import styles from "./FusionRecipeSkillFinder.module.css";
import globalStyles from "../globals.module.css";

enum StateChange {
  SKILL,
  DEMON,
  CONFIGURATION,
}

type FusionRecipeConfiguration = {
  max_level: number;
  excluded_demons: DemonOption[];
};

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
  configuration: FusionRecipeConfiguration;
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

type ChangeStateConfiguration = {
  stateType: StateChange.CONFIGURATION;
  newValue: FusionRecipeConfiguration;
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
  setFusionRecipe: React.Dispatch<React.SetStateAction<FusionRecipe | undefined>>
) {
  let demon = demons.find((d) => d.name === state.demon)!;
  let skills = getTargetSkills(state);
  let configuration = { max_level: state.configuration.max_level, excluded_demons: state.configuration.excluded_demons.map((d) => d.name) };
  let recipe = findFusionRecipes(fusionData, demon, skills, configuration);
  setFusionRecipe(recipe);
}

function getNewStateWhenDemonChanges(demonOption: DemonOption, demons: Demon[], configuration: FusionRecipeConfiguration): FusionRecipeSkillFinderState {
  let demon = demons.find((d) => d.name === demonOption.name)!;
  let innateSkills = getInnateSkills(demon);
  let newState: FusionRecipeSkillFinderState = { demon: demon.name, configuration };
  for (let i = 0; i < 8; i++) {
    if (innateSkills[i]) {
      (newState as any)[`skill_${i + 1}`] = innateSkills[i].name;
    }
  }
  return newState;
}

function onChangeState(stateChange: ChangeStateSkill | ChangeStateDemon | ChangeStateConfiguration, setState: Function, setFusionRecipe: Function) {
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
      setState((s: FusionRecipeSkillFinderState): FusionRecipeSkillFinderState => {
        if (!stateChange.newValue) {
          return { configuration: { ...s.configuration } };
        }
        return getNewStateWhenDemonChanges(stateChange.newValue, stateChange.demons, s.configuration);
      });
      break;
    case StateChange.CONFIGURATION:
      console.log(stateChange.newValue);
      setState((s: FusionRecipeSkillFinderState) => {
        return { ...s, configuration: stateChange.newValue };
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
  const maxLevelOptions = [...Array(99).keys()].map((x) => `${x + 1}`);

  let [state, setState] = useState<FusionRecipeSkillFinderState>({ configuration: { excluded_demons: [], max_level: 99 } });
  let [fusionRecipe, setFusionRecipe] = useState<FusionRecipe>();

  let classNameForSkill = (skill: string | undefined): string | undefined => {
    if (state.demon && skill) {
      let demonData = demons.find((d) => d.name.toLowerCase() === state.demon?.toLowerCase());
      if (demonData?.skills.some((s) => s.name.toLowerCase() === skill.toLowerCase())) {
        return styles.innateSkill;
      }
    }
    return undefined;
  };

  return (
    <div>
      <div className={globalStyles.centeredContainerNoMargin}>
        <h3>Desired demon</h3>
      </div>
      <div className={globalStyles.centeredContainerNoMargin}>
        <div className={styles.demonSelection}>
          <Autocomplete
            className={styles.demonSelection}
            disablePortal
            id="demonSelection"
            options={demonOptions}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Demon to fuse" />}
            onChange={(e, v) => onChangeState({ stateType: StateChange.DEMON, newValue: v, demons: demons }, setState, setFusionRecipe)}
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
            renderInput={(params) => (
              <div className={classNameForSkill(state.skill_1)}>
                <TextField {...params} label="Skill 1" />
              </div>
            )}
            onChange={(e, v) => onChangeState({ stateType: StateChange.SKILL, newValue: v, skillNumber: 1 }, setState, setFusionRecipe)}
          />
          <Autocomplete
            value={state.skill_2 ?? null}
            className={styles.skillSelection}
            disablePortal
            id="skillSelection2"
            options={skills}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <div className={classNameForSkill(state.skill_2)}>
                <TextField {...params} label="Skill 2" />
              </div>
            )}
            onChange={(e, v) => onChangeState({ stateType: StateChange.SKILL, newValue: v, skillNumber: 2 }, setState, setFusionRecipe)}
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
                <div className={classNameForSkill(state.skill_3)}>
                  <TextField {...params} label="Skill 3" />
                </div>
              )}
              onChange={(e, v) => onChangeState({ stateType: StateChange.SKILL, newValue: v, skillNumber: 3 }, setState, setFusionRecipe)}
            />
            <Autocomplete
              value={state.skill_4 ?? null}
              className={styles.skillSelection}
              disablePortal
              id="skillSelection4"
              options={skills}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <div className={classNameForSkill(state.skill_4)}>
                  <TextField {...params} label="Skill 4" />
                </div>
              )}
              onChange={(e, v) => onChangeState({ stateType: StateChange.SKILL, newValue: v, skillNumber: 4 }, setState, setFusionRecipe)}
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
                <div className={classNameForSkill(state.skill_5)}>
                  <TextField {...params} label="Skill 5" />
                </div>
              )}
              onChange={(e, v) => onChangeState({ stateType: StateChange.SKILL, newValue: v, skillNumber: 5 }, setState, setFusionRecipe)}
            />
            <Autocomplete
              value={state.skill_6 ?? null}
              className={styles.skillSelection}
              disablePortal
              id="skillSelection6"
              options={skills}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <div className={classNameForSkill(state.skill_6)}>
                  <TextField {...params} label="Skill 6" />
                </div>
              )}
              onChange={(e, v) => onChangeState({ stateType: StateChange.SKILL, newValue: v, skillNumber: 6 }, setState, setFusionRecipe)}
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
                <div className={classNameForSkill(state.skill_7)}>
                  <TextField {...params} label="Skill 7" />
                </div>
              )}
              onChange={(e, v) => onChangeState({ stateType: StateChange.SKILL, newValue: v, skillNumber: 7 }, setState, setFusionRecipe)}
            />
            <Autocomplete
              value={state.skill_8 ?? null}
              className={styles.skillSelection}
              disablePortal
              id="skillSelection8"
              options={skills}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <div className={classNameForSkill(state.skill_8)}>
                  <TextField {...params} label="Skill 8" />
                </div>
              )}
              onChange={(e, v) => onChangeState({ stateType: StateChange.SKILL, newValue: v, skillNumber: 8 }, setState, setFusionRecipe)}
            />
          </div>
        </div>
      </div>
      <div className={globalStyles.centeredContainer}>
        <h3>Recipe configuration</h3>
      </div>
      <div className={globalStyles.centeredContainerNoMargin}>
        <Autocomplete
          value={`${state.configuration.max_level}`}
          disablePortal
          id="maxLevelSelection"
          options={maxLevelOptions}
          sx={{ width: 100 }}
          renderInput={(params) => <TextField {...params} label="Max Lvl" />}
          onChange={(e, v) =>
            onChangeState({ stateType: StateChange.CONFIGURATION, newValue: { ...state.configuration, max_level: v ? parseInt(v) : 99 } }, setState, setFusionRecipe)
          }
        />
      </div>
      <div className={styles.excludedDemonSelection}>
        {state.configuration?.excluded_demons.map((d, i) => {
          return (
            <DemonSelection
              value={d}
              key={d.name}
              demonOptions={demonOptions}
              label={`Excluded demon ${i + 1}`}
              onChange={(e: any, v: DemonOption | null) => {
                let newExcludedDemons = state.configuration?.excluded_demons;
                if (!v) {
                  newExcludedDemons.splice(i, 1);
                } else {
                  newExcludedDemons[i] = v;
                }
                const newConfiguration = { ...state.configuration, excluded_demons: newExcludedDemons };
                onChangeState({ stateType: StateChange.CONFIGURATION, newValue: newConfiguration }, setState, setFusionRecipe);
              }}
            />
          );
        })}
        <DemonSelection
          key={state.configuration.excluded_demons.length.toString()}
          demonOptions={demonOptions}
          label={`Excluded demon ${state.configuration.excluded_demons.length + 1}`}
          onChange={(e: any, v: DemonOption | null) => {
            let newExcludedDemons = state.configuration.excluded_demons;
            if (v) {
              newExcludedDemons.push(v);
            }
            const newConfiguration = { ...state.configuration, excluded_demons: newExcludedDemons };
            onChangeState({ stateType: StateChange.CONFIGURATION, newValue: newConfiguration }, setState, setFusionRecipe);
          }}
        />
      </div>
      <div className={globalStyles.centeredContainer}>
        <Button
          className={styles.findRecipeButton}
          variant="contained"
          onClick={() => {
            getFusionRecipe(state, props.fusionData, demons, setFusionRecipe);
          }}
        >
          Find Recipe
        </Button>
      </div>
      <div className={globalStyles.centeredContainer}>{fusionRecipe && <FusionRecipeResult recipe={fusionRecipe} skills={getTargetSkills(state)} components={[]} />}</div>
    </div>
  );
}
