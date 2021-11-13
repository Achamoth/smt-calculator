import "./DemonTable.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const sortingOrders = {
  LEVEL: "level",
  RACE: "race",
  NAME: "name",
};

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
    <div className="App">
      <div className="contents">
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
              </tr>
              {demons.map((x) => {
                return (
                  <tr className="demonTableRow" key={x.name}>
                    <td className="demonTableCell">{x.level}</td>
                    <td className="demonTableCell">{x.race}</td>
                    <td className="demonTableCell">
                      <Link to={`/${x.name.toLowerCase()}`}>{x.name}</Link>
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
