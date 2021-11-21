import { Link } from "react-router-dom";
import { useState } from "react";
import { Demon } from "./classes/Demon";
import {
  DemonAttribute,
  compareDemons,
  demonResist,
  ElementalResistance,
} from "./utils/demon_utils";
import { objectToArray } from "./utils/general_utils";
import { NavBar } from "./NavBar";
import "./DemonTable.css";

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
      <NavBar textFieldOnChange={(e) => setFilter(e.target.value)} />
      <div className="centeredContainer">
        <table className="demonTable">
          <thead>
            <tr>
              {headers.map((h) => {
                return (
                  <th
                    className="demonTableHeader"
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
                <tr className="demonTableRow" key={x.name}>
                  <td className="demonTableCell">{x.level}</td>
                  <td className="demonTableCell">{x.race}</td>
                  <td className="demonTableCell">
                    <Link to={`/${x.name.toLowerCase()}`}>{x.name}</Link>
                  </td>
                  {resistances.map((r) => {
                    return (
                      <td className="demonTableCell">{demonResist(x, r)}</td>
                    );
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
