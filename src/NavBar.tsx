import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { GameSelector, GameSelectionProps } from "./GameSelector";
import styles from "./NavBar.module.css";
import globalStyles from "./globals.module.css";

interface NavBarProps {
  gameSelectionProps: GameSelectionProps;
}

export function NavBar(props: NavBarProps) {
  return (
    <div className={globalStyles.centeredContainer}>
      <div className={styles.navBar}>
        <Link className={styles.button} to="/">
          <Button variant="contained" size="large">
            Demons
          </Button>
        </Link>
        <Link className={styles.button} to="/skills">
          <Button variant="contained" size="large">
            Skills
          </Button>
        </Link>
        <Link className={styles.button} to="/recipe">
          <Button variant="contained" size="large">
            Recipe
          </Button>
        </Link>
        <GameSelector {...props.gameSelectionProps} />
        <a
          href="http://www.github.com/Achamoth/smt-calculator/issues"
          className={styles.button}
        >
          <Button variant="outlined" size="large" className="button">
            Report Issue (Source Code)
          </Button>
        </a>
      </div>
    </div>
  );
}
