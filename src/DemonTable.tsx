import { Link } from "react-router-dom";
import { useState } from "react";
import { TextField } from "@mui/material";
import { Demon } from "./classes/Demon";
import { UniversalDemonAttribute, compareDemons, demonResist } from "./utils/demon_utils";
import styles from "./DemonTable.module.css";
import globalStyles from "./globals.module.css";
import classNames from "classnames";

type SortState = {
  sort: string;
  ascending: boolean;
  element: number;
};

const SortingOrders = {
  LVL: UniversalDemonAttribute.LEVEL,
  RACE: UniversalDemonAttribute.RACE,
  NAME: UniversalDemonAttribute.NAME,
  AFFINITY: UniversalDemonAttribute.AFFINITY,
};

function updateSort(oldSort: SortState, headerClicked: string, element: number) {
  if (!(SortingOrders as any)[headerClicked.toUpperCase()]) return oldSort;
  if (oldSort.sort === headerClicked && oldSort.element === element) {
    return { sort: oldSort.sort, ascending: !oldSort.ascending, element: oldSort.element };
  }
  return { sort: headerClicked, ascending: true, element: element };
}

interface DemonTableProps {
  demons: Demon[];
  resistances: string[];
}

export function DemonTable(props: DemonTableProps) {
  let [filter, setFilter] = useState("");
  let [sort, setSort] = useState<SortState>({
    sort: UniversalDemonAttribute.RACE,
    ascending: true,
    element: -1,
  });

  let demons = props.demons.filter((d) => d.name.toLowerCase().startsWith(filter.toLowerCase())).sort((d1, d2) => compareDemons(d1, d2, sort));
  let resistances: string[] = props.resistances;

  return (
    <div className={globalStyles.centeredContainer}>
      <div className={globalStyles.blockContainerFullWidth}>
        <div className={styles.partialWidthContainer}>
          <TextField fullWidth label="Filter..." variant="outlined" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilter(e.target.value)} />
        </div>
        <table className={styles.demonTable}>
          <colgroup span={3}></colgroup>
          <colgroup span={resistances.length}></colgroup>
          <thead className={styles.demonTableHeader}>
            <tr>
              <th className={styles.demonTableHeaderTopTier} colSpan={3}>
                Demon
              </th>
              <th className={styles.demonTableHeaderTopTier} colSpan={resistances.length}>
                Affinities
              </th>
            </tr>
            <tr>
              <th className={styles.demonTableHeaderSecondTier} onClick={(_) => setSort((s) => updateSort(s, UniversalDemonAttribute.RACE, -1))}>
                Race
              </th>
              <th className={styles.demonTableHeaderSecondTier} onClick={(_) => setSort((s) => updateSort(s, UniversalDemonAttribute.LEVEL, -1))}>
                Lvl
              </th>
              <th className={styles.demonTableHeaderSecondTier} onClick={(_) => setSort((s) => updateSort(s, UniversalDemonAttribute.NAME, -1))}>
                Name
              </th>
              {resistances.map((r, i) => {
                return (
                  <th className={styles.demonTableHeaderSecondTier} onClick={(e) => setSort((s) => updateSort(s, UniversalDemonAttribute.AFFINITY, i))}>
                    {r}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {demons.map((x) => {
              return (
                <tr className={styles.demonTableRow} key={x.name}>
                  <td className={styles.demonTableCell}>{x.race}</td>
                  <td className={styles.demonTableCell}>{x.level}</td>
                  <td className={styles.demonTableCell}>
                    <Link to={`/${x.name.toLowerCase()}`}>{x.name}</Link>
                  </td>
                  {resistances.map((r, i) => {
                    let resistance = demonResist(x, i);
                    let classes = classNames(
                      styles.demonTableCell,
                      { [`${styles.repel}`]: resistance === "rp" },
                      { [`${styles.absorb}`]: resistance === "ab" },
                      { [`${styles.null}`]: resistance === "nu" },
                      { [`${styles.resist}`]: resistance === "rs" },
                      { [`${styles.weak}`]: resistance === "wk" },
                      { [`${styles.none}`]: resistance === "-" }
                    );
                    return <td className={classes}>{resistance}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
