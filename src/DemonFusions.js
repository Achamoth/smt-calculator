import { useParams, Link } from "react-router-dom";
import "./DemonFusions.css";
import { getFusionCombinations } from "./utils/demon_fusion.js";

export function DemonFusions(props) {
  let name = useParams().demonName;
  let demon = props.demons.find((d) => d.name.toLowerCase() === name);
  let fusionCombinations = getFusionCombinations(demon);
  console.log(fusionCombinations);

  return (
    <div>
      <div className="centeredContainer">
        <div className="demonFusionContents">
          <div className="demon">
            <h1>{`LV${demon.level} ${demon.race} ${demon.name}`}</h1>
            <table className="demonSkills">
              <thead>
                <tr>
                  <th className="demonSkillsHeader">Skill</th>
                  <th className="demonSkillsHeader">Level</th>
                </tr>
              </thead>
              <tbody>
                {demon.skills
                  .sort((s1, s2) => (s1.level < s2.level ? -1 : 1))
                  .map((s) => {
                    return (
                      <tr className="demonSkillRow" key={s.name}>
                        <td className="demonSkillCell">{s.name}</td>
                        <td className="demonSkillCell">
                          {s.level === 0
                            ? "Innate"
                            : s.level === 5277
                            ? "Tm"
                            : s.level}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="centeredContainer">
        <table className="fusionCombinations">
          <thead>
            <tr>
              <th className="fusionCombinationsHeader">Component 1</th>
              <th className="fusionCombinationsHeader">Component 2</th>
            </tr>
          </thead>
          <tbody>
            {fusionCombinations.map((c) => {
              return (
                <tr className="fusionRow" key={`${c[0].name}-${c[1].name}`}>
                  <td className="fusionCombinationsCell">
                    <Link
                      to={`/${c[0].name.toLowerCase()}`}
                    >{`LV${c[0].level} ${c[0].race} ${c[0].name}`}</Link>
                  </td>
                  <td className="fusionCombinationsCell">
                    <Link
                      to={`/${c[1].name.toLowerCase()}`}
                    >{`LV${c[1].level} ${c[1].race} ${c[1].name}`}</Link>
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
