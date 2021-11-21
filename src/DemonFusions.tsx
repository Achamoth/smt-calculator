import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { TextField } from "@mui/material";
import { Demon } from "./classes/Demon";
import { FusionData } from "./utils/types";
import { getFusionCombinations } from "./utils/demon_fusion";
import { NavBar } from "./NavBar";
import styles from "./DemonFusions.module.css";
import globalStyles from "./globals.module.css";

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
        <NavBar />
        <div className={styles.demonFusionContents}>
          <div className={styles.demon}>
            <h1>{`LV${demon.level} ${demon.race} ${demon.name}`}</h1>
            <table className={styles.demonSkills}>
              <thead>
                <tr key="skillHeader">
                  <th className={styles.demonSkillsHeader}>Skill</th>
                  <th className={styles.demonSkillsHeader}>Level</th>
                </tr>
              </thead>
              <tbody>
                {demon.skills
                  .sort((s1, s2) => (s1.level < s2.level ? -1 : 1))
                  .map((s) => {
                    return (
                      <tr className={styles.demonSkillRow} key={s.name}>
                        <td className={styles.demonSkillCell}>
                          <Link
                            to={`/skills/${s.name
                              .toLowerCase()
                              .replace(" ", "_")}`}
                          >
                            {s.name}
                          </Link>
                        </td>
                        <td className={styles.demonSkillCell}>
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
      <div className={globalStyles.centeredContainer}>
        <div className={globalStyles.blockContainerFullWidth}>
          <div className={styles.filter}>
            <TextField
              fullWidth
              label="Filter..."
              variant="outlined"
              onChange={
                fusionCombinations.length < 2
                  ? undefined
                  : (e: React.ChangeEvent<HTMLInputElement>) =>
                      setFilter(e.target.value)
              }
            />
          </div>
          <table className={styles.fusionCombinations}>
            <thead>
              <tr key="fusionHeader">
                {[...Array.from(Array(maxComponents).keys())].map((i) => {
                  return (
                    <th className={styles.fusionCombinationsHeader}>
                      Component {i + 1}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {filteredFusionCombinations.map((c) => {
                return (
                  <tr
                    className={styles.fusionRow}
                    key={`${c[0].name}-${c[1].name}`}
                  >
                    {/* Redo key */}
                    {c.map((component) => {
                      return (
                        <td className={styles.fusionCombinationsCell}>
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
    </div>
  );
}
