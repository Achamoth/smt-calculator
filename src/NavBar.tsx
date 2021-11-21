import { Link } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import "./NavBar.css";

interface NavBarProps {
  textFieldOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function NavBar(props: NavBarProps) {
  return (
    <div className="centeredContainer">
      <div className="navBar">
        <Link className="button" to="/">
          <Button variant="contained" size="large">
            Demons
          </Button>
        </Link>
        <Link className="button" to="/skills">
          <Button variant="contained" size="large" className="button">
            Skills
          </Button>
        </Link>
        <Link className="button" to="/recipe">
          <Button variant="contained" size="large" className="button">
            Recipe
          </Button>
        </Link>
      </div>
      <TextField
        label="Filter..."
        variant="outlined"
        onChange={props.textFieldOnChange}
        disabled={!props.textFieldOnChange}
      />
    </div>
  );
}
