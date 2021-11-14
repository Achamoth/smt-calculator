import "./DemonTable.css";
import { NavBar } from "./NavBar.js";
import { Link } from "react-router-dom";
import { useState } from "react";

const sortingOrders = {
  LEVEL: "level",
  RACE: "race",
  NAME: "name",
};

const ElementalResistances = {
  PHYS: 0,
  FIRE: 1,
  ICE: 2,
  ELEC: 3,
  WIND: 4,
  LIGHT: 5,
  DARK: 6,
};

function DemonResist(demon, elementalResistance) {
  switch (demon.resistances[elementalResistance]) {
    case "w":
      return "wk";
    case "s":
      return "rs";
    case "n":
      return "nu";
    case "d":
      return "ab";
    case "r":
      return "rp";
    case "-":
    default:
      return "-";
  }
}

function compareDemonsByRace(d1, d2) {
  if (d1.race === d2.race) {
    return d1.level < d2.level ? -1 : 1;
  }
  return d1.race < d2.race ? -1 : 1;
}

function compareDemons(d1, d2, sort) {
  switch (sort.sort) {
    case sortingOrders.LEVEL:
      return sort.ascending
        ? d1.level < d2.level
          ? -1
          : 1
        : d1.level < d2.level
        ? 1
        : -1;
    case sortingOrders.NAME:
      return sort.ascending
        ? d1.name < d2.name
          ? -1
          : 1
        : d1.name < d2.name
        ? 1
        : -1;
    default:
    case sortingOrders.RACE:
      let order = compareDemonsByRace(d1, d2);
      return sort.ascending ? order : order * -1;
  }
}

function updateSort(oldSort, headerClicked) {
  if (oldSort.sort === headerClicked) {
    return { sort: oldSort.sort, ascending: !oldSort.ascending };
  }
  return { sort: headerClicked, ascending: true };
}

export function DemonTable(props) {
  let [filter, setFilter] = useState("");
  let [sort, setSort] = useState({
    sort: sortingOrders.RACE,
    ascending: true,
  });

  let demons = props.demons
    .filter((d) => d.name.toLowerCase().startsWith(filter.toLowerCase()))
    .sort((d1, d2) => compareDemons(d1, d2, sort));

  return (
    <div className="centeredContainer">
      <div className="demonTableContents">
        <NavBar />
        <div>
          <label>
            Search:
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </label>
        </div>
        <br />
        <div>
          <table className="demonTable">
            <tbody>
              <tr>
                <th
                  className="demonTableHeader"
                  onClick={(e) =>
                    setSort((s) => updateSort(s, sortingOrders.LEVEL))
                  }
                >
                  LV
                </th>
                <th
                  className="demonTableHeader"
                  onClick={(e) =>
                    setSort((s) => updateSort(s, sortingOrders.RACE))
                  }
                >
                  Race
                </th>
                <th
                  className="demonTableHeader"
                  onClick={(e) =>
                    setSort((s) => updateSort(s, sortingOrders.NAME))
                  }
                >
                  Name
                </th>
                <th className="demonTableHeader">Phys</th>
                <th className="demonTableHeader">Fire</th>
                <th className="demonTableHeader">Ice</th>
                <th className="demonTableHeader">Elec</th>
                <th className="demonTableHeader">Wind</th>
                <th className="demonTableHeader">Light</th>
                <th className="demonTableHeader">Dark</th>
              </tr>
              {demons.map((x) => {
                return (
                  <tr className="demonTableRow" key={x.name}>
                    <td className="demonTableCell">{x.level}</td>
                    <td className="demonTableCell">{x.race}</td>
                    <td className="demonTableCell">
                      <Link to={`/${x.name.toLowerCase()}`}>{x.name}</Link>
                    </td>
                    <td className="demonTableCell">
                      {DemonResist(x, ElementalResistances.PHYS)}
                    </td>
                    <td className="demonTableCell">
                      {DemonResist(x, ElementalResistances.FIRE)}
                    </td>
                    <td className="demonTableCell">
                      {DemonResist(x, ElementalResistances.ICE)}
                    </td>
                    <td className="demonTableCell">
                      {DemonResist(x, ElementalResistances.ELEC)}
                    </td>
                    <td className="demonTableCell">
                      {DemonResist(x, ElementalResistances.WIND)}
                    </td>
                    <td className="demonTableCell">
                      {DemonResist(x, ElementalResistances.LIGHT)}
                    </td>
                    <td className="demonTableCell">
                      {DemonResist(x, ElementalResistances.DARK)}
                    </td>
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
