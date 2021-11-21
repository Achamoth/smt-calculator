import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Demon } from "./classes/Demon";
import { getFusionCombinations } from "./utils/demon_fusion";
import { NavBar } from "./NavBar";
import "./DemonFusions.css";
import { FusionData } from "./utils/types";

function matchesFilter(demon: Demon, filter: string) {
  return demon.name.toLowerCase().startsWith(filter.toLowerCase());
}

interface DemonFusionsProps {
  fusionData: FusionData;
}

export function DemonFusions(props: DemonFusionsProps) {
  let name = useParams().demonName;
  let demon = props.fusionData.demons.find(
    (d) => d.name.toLowerCase() === name
  )!;
  let fusionCombinations = getFusionCombinations(demon, props.fusionData);
  let maxComponents =
    fusionCombinations.length > 0
      ? Math.max(...fusionCombinations.map((r) => r.length))
      : 0;

  let [filter, setFilter] = useState("");
  let filteredFusionCombinations = fusionCombinations.filter(
    (f) => matchesFilter(f[0], filter) || matchesFilter(f[1], filter)
  );

  return (
    <div>
      <div>
        <NavBar
          textFieldOnChange={
            fusionCombinations.length < 2
              ? undefined
              : (e) => setFilter(e.target.value)
          }
        />
        <div className="demonFusionContents">
          <div className="demon">
            <h1>{`LV${demon.level} ${demon.race} ${demon.name}`}</h1>
            <table className="demonSkills">
              <thead>
                <tr key="skillHeader">
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
                        <td className="demonSkillCell">
                          <Link
                            to={`/skills/${s.name
                              .toLowerCase()
                              .replace(" ", "_")}`}
                          >
                            {s.name}
                          </Link>
                        </td>
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
            <tr key="fusionHeader">
              {[...Array.from(Array(maxComponents).keys())].map((i) => {
                return (
                  <th className="fusionCombinationsHeader">
                    Component {i + 1}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {filteredFusionCombinations.map((c) => {
              return (
                <tr className="fusionRow" key={`${c[0].name}-${c[1].name}`}>
                  {/* Redo key */}
                  {c.map((component) => {
                    return (
                      <td className="fusionCombinationsCell">
                        <Link
                          to={`/${component.name.toLowerCase()}`}
                        >{`LV${component.level} ${component.race} ${component.name}`}</Link>
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
  );
}
