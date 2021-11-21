import { Autocomplete, TextField } from "@mui/material";
import { Game } from "./utils/load_data";
import styles from "./GameSelector.module.css";

type GameSelection = {
  label: string;
  game: Game;
};

interface GameSelectionProps {
  games: Game[];
  selectedGame: Game;
  onGameSelectionChanged: (g: Game) => void;
}

export function GameSelector(props: GameSelectionProps) {
  let gameOptions: GameSelection[] = props.games.map((g) => {
    return { label: g.valueOf(), game: g };
  });

  return (
    <div className={styles.centeredContainer}>
      <Autocomplete
        value={{
          label: props.selectedGame.valueOf(),
          game: props.selectedGame,
        }}
        key={props.selectedGame.valueOf()}
        disablePortal
        id="gameSelection"
        options={gameOptions}
        sx={{ width: 300 }}
        onChange={(e, v: GameSelection) => props.onGameSelectionChanged(v.game)}
        renderInput={(params) => <TextField {...params} />}
        isOptionEqualToValue={(o: GameSelection, v: GameSelection) =>
          o.label === v.label
        }
        disableClearable={true}
      />
    </div>
  );
}
