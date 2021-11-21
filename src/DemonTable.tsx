import { Link } from "react-router-dom";
import { useState } from "react";
import { TextField } from "@mui/material";
import { Demon } from "./classes/Demon";
import {
  DemonAttribute,
  compareDemons,
  demonResist,
  ElementalResistance,
} from "./utils/demon_utils";
import { objectToArray } from "./utils/general_utils";
import { NavBar } from "./NavBar";
import styles from "./DemonTable.module.css";
import globalStyles from "./globals.module.css";

type SortState = {
  sort: string;
  ascending: boolean;
};

const SortingOrders = {
  LV: DemonAttribute.LEVEL,
  RACE: DemonAttribute.RACE,
  NAME: DemonAttribute.NAME,
};

function updateSort(oldSort: SortState, headerClicked: string) {
  if (!(SortingOrders as any)[headerClicked.toUpperCase()]) return oldSort;
  if (oldSort.sort === headerClicked) {
    return { sort: oldSort.sort, ascending: !oldSort.ascending };
  }
  return { sort: headerClicked, ascending: true };
}

interface DemonTableProps {
  demons: Demon[];
}

export function DemonTable(props: DemonTableProps) {
  let [filter, setFilter] = useState("");
  let [sort, setSort] = useState<SortState>({
    sort: DemonAttribute.RACE,
    ascending: true,
  });

  let demons = props.demons
    .filter((d) => d.name.toLowerCase().startsWith(filter.toLowerCase()))
    .sort((d1, d2) => compareDemons(d1, d2, sort));

  let headers: string[] = objectToArray(DemonAttribute);
  let resistances: number[] = objectToArray(ElementalResistance);

  return (
    <div>
      <NavBar />
      <div className={globalStyles.centeredContainer}>
        <div className={globalStyles.blockContainerFullWidth}>
          <div className={styles.partialWidthContainer}>
            <TextField
              fullWidth
              label="Filter..."
              variant="outlined"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFilter(e.target.value)
              }
            />
          </div>
          <table className={styles.demonTable}>
            <thead>
              <tr>
                {headers.map((h) => {
                  return (
                    <th
                      className={styles.demonTableHeader}
                      onClick={(e) => setSort((s) => updateSort(s, h))}
                    >
                      {h}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {demons.map((x) => {
                return (
                  <tr className={styles.demonTableRow} key={x.name}>
                    <td className={styles.demonTableCell}>{x.level}</td>
                    <td className={styles.demonTableCell}>{x.race}</td>
                    <td className={styles.demonTableCell}>
                      <Link to={`/${x.name.toLowerCase()}`}>{x.name}</Link>
                    </td>
                    {resistances.map((r) => {
                      return (
                        <td className={styles.demonTableCell}>
                          {demonResist(x, r)}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
