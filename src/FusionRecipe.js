import { Autocomplete, TextField, Button } from "@mui/material";
import { useState } from "react";
import { NavBar } from "./NavBar.js";
import { get_all_skills, parse_demons } from "./utils/demon_utils.js";
import "./FusionRecipe.css";

const State = {
  SKILL_1: 1,
  SKILL_2: 2,
  SKILL_3: 3,
  SKILL_4: 4,
  SKILL_5: 5,
  SKILL_6: 6,
  SKILL_7: 7,
  SKILL_8: 8,
  DEMON: 9,
};

function onChangeState(newValue, stateType, setState) {
  switch (stateType) {
    case State.SKILL_1:
      setState(s => {
        return {...s, skill_1: newValue };
      });
      break;
    case State.SKILL_2:
      setState(s => {
        return {...s, skill_2: newValue };
      });
      break;
    case State.SKILL_3:
      setState(s => {
        return {...s, skill_3: newValue };
      });
      break;
    case State.SKILL_4:
      setState(s => {
        return {...s, skill_4: newValue };
      });
      break;
    case State.SKILL_5:
      setState(s => {
        return {...s, skill_5: newValue };
      });
      break;
    case State.SKILL_6:
      setState(s => {
        return {...s, skill_6: newValue };
      });
      break;
    case State.SKILL_7:
      setState(s => {
        return {...s, skill_7: newValue };
      });
      break;
    case State.SKILL_8:
      setState(s => {
        return {...s, skill_8: newValue };
      });
      break;
    case State.DEMON:
      setState(s => {
        return {...s, demon: newValue.name };
      });
      break;
    default:
      break;
  }
}

export function FusionRecipe(props) {
  const skills = get_all_skills().map((s) => s.name);
  const demons = parse_demons();
  const demonOptions = demons.map((d) => {
    return { label: `${d.race} ${d.name}`, name: d.name };
  });

  let [state, setState] = useState({});

  return (
    <div>
      <div className="centeredContainer">
        <div>
          <NavBar />
        </div>
        <br />
      </div>
      <div className="centeredContainer">
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
      <div className="centeredContainer">
        <div className="skillSelectionPair">
          <Autocomplete
            className="skillSelection"
            disablePortal
            id="skillSelection1"
            options={skills}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Skill 1" />}
            onChange={(e, v) => onChangeState(v, State.SKILL_1, setState)}
          />
          <Autocomplete
            className="skillSelection"
            disablePortal
            id="skillSelection2"
            options={skills}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Skill 2" />}
            onChange={(e, v) => onChangeState(v, State.SKILL_2, setState)}
          />
          <div className="skillSelectionPair">
            <Autocomplete
              className="skillSelection"
              disablePortal
              id="skillSelection3"
              options={skills}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Skill 3" />
              )}
              onChange={(e, v) => onChangeState(v, State.SKILL_3, setState)}
            />
            <Autocomplete
              className="skillSelection"
              disablePortal
              id="skillSelection4"
              options={skills}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Skill 4" />
              )}
              onChange={(e, v) => onChangeState(v, State.SKILL_4, setState)}
            />
          </div>
          <div className="skillSelectionPair">
            <Autocomplete
              className="skillSelection"
              disablePortal
              id="skillSelection5"
              options={skills}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Skill 5" />
              )}
              onChange={(e, v) => onChangeState(v, State.SKILL_5, setState)}
            />
            <Autocomplete
              className="skillSelection"
              disablePortal
              id="skillSelection6"
              options={skills}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Skill 6" />
              )}
              onChange={(e, v) => onChangeState(v, State.SKILL_6, setState)}
            />
          </div>
          <div className="skillSelectionPair">
            <Autocomplete
              className="skillSelection"
              disablePortal
              id="skillSelection7"
              options={skills}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Skill 7" />
              )}
              onChange={(e, v) => onChangeState(v, State.SKILL_7, setState)}
            />
            <Autocomplete
              className="skillSelection"
              disablePortal
              id="skillSelection8"
              options={skills}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Skill 8" />
              )}
              onChange={(e, v) => onChangeState(v, State.SKILL_8, setState)}
            />
          </div>
        </div>
      </div>
      <div className="centeredContainer">
        <Button className="findRecipeButton" variant="contained">
          Find Recipe
        </Button>
      </div>
    </div>
  );
}