import { NavBar } from "./NavBar.js";
import { get_all_skills } from "./utils/demon_utils.js";
import { Link } from "react-router-dom";
import { useState } from "react";

export function Skills(props) {
  let [filter, setFilter] = useState("");
  const allSkills = get_all_skills();
  const skills = allSkills.filter((x) =>
    x.name.toLowerCase().startsWith(filter.toLowerCase())
  );

  return (
    <div className="centeredContainer">
      <div className="skillTableContents">
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
          <table className="skillTable">
            <tbody>
              <tr>
                <th className="skillTableHeader">Name</th>
                <th className="skillTableHeader">Demons</th>
              </tr>
              {skills.map((x) => {
                return (
                  <tr className="skillTableRow" key={x.name}>
                    <td className="skillTableCell">{x.name}</td>
                    <td className="skillTableCell">
                      {/* <Link to={`/${x.name.toLowerCase()}`}>{x.name}</Link> */}
                      {/* Custom skill component rendering demons */}
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
