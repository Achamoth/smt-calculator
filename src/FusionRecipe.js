import { Autocomplete, TextField, Button } from "@mui/material";
import { NavBar } from "./NavBar.js";
import { get_all_skills, parse_demons } from "./utils/demon_utils.js";
import "./FusionRecipe.css";

export function FusionRecipe(props) {
  const skills = get_all_skills().map((s) => s.name);
  const demons = parse_demons();
  const demonOptions = demons.map((d) => {
    return { label: `${d.race} ${d.name}`, name: d.name };
  });

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
          />
          <Autocomplete
            className="skillSelection"
            disablePortal
            id="skillSelection2"
            options={skills}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Skill 2" />}
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
            />
          </div>
        </div>
      </div>
      <div className="centeredContainer">
        <Button className="findRecipeButton" variant="contained">Find Recipe</Button>
      </div>
    </div>
  );
}
