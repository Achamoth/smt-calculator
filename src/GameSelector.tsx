import { Autocomplete, TextField } from "@mui/material";
import { Game } from "./utils/load_data";

type GameSelection = {
  label: string;
  game: Game;
};

export interface GameSelectionProps {
  games: Game[];
  selectedGame: Game;
  onGameSelectionChanged: (g: Game) => void;
}

export function GameSelector(props: GameSelectionProps) {
  let gameOptions: GameSelection[] = props.games.map((g) => {
    return { label: g.valueOf(), game: g };
  });

  return (
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
  );
}
