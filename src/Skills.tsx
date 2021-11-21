import { Link } from "react-router-dom";
import { useState } from "react";
import { NavBar } from "./NavBar";
import { get_all_skills, DemonSkillUnlock } from "./utils/demon_utils";
import "./Skills.css";

interface DemonsPossessingSkillsProps {
  demonsWithSkills: DemonSkillUnlock[];
}

function DemonsPossessingSkills(props: DemonsPossessingSkillsProps) {
  return (
    <>
      {props.demonsWithSkills.map((d, i) => {
        return (
          <>
            <Link to={`/${d.name.toLowerCase()}`}>{`${d.name}`}</Link>
            {d.skillLevel > 0 && d.skillLevel !== 5277 && (
              <span>{` (${d.skillLevel})`}</span>
            )}
            {d.skillLevel === 5277 && <span> (Tm)</span>}
            {props.demonsWithSkills.length > i + 1 && <span>, </span>}
          </>
        );
      })}
    </>
  );
}

export function Skills() {
  let [filter, setFilter] = useState("");
  const allSkills = get_all_skills();
  const skills = allSkills
    .filter((s) => s.name.toLowerCase().startsWith(filter.toLowerCase()))
    .sort((s1, s2) => (s1.name < s2.name ? -1 : 1));

  return (
    <div>
      <NavBar textFieldOnChange={(e) => setFilter(e.target.value)} />
      <div className="centeredContainer">
        <table className="skillTable">
          <tbody>
            <tr>
              <th className="skillTableHeader">Name</th>
              <th className="skillTableHeader">Demons</th>
            </tr>
            {skills.map((x) => {
              return (
                <tr className="skillTableRow" key={x.name}>
                  <td className="skillTableCell">
                    {
                      <Link to={x.name.toLowerCase().replace(" ", "_")}>
                        {x.name}
                      </Link>
                    }
                  </td>
                  <td className="skillTableCell">
                    <DemonsPossessingSkills demonsWithSkills={x.demons} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
