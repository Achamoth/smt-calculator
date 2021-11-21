import { Link } from "react-router-dom";
import { useState } from "react";
import { TextField } from "@mui/material";
import { DemonSkillUnlock, SkillDemonMap } from "./utils/types";
import { NavBar } from "./NavBar";
import styles from "./Skills.module.css";
import globalStyles from "./globals.module.css";

interface DemonsPossessingSkillsProps {
  demonsWithSkills: DemonSkillUnlock[];
}

interface SkillsProps {
  skills: SkillDemonMap[];
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

export function Skills(props: SkillsProps) {
  let [filter, setFilter] = useState("");
  const allSkills = props.skills;
  const skills = allSkills
    .filter((s) => s.name.toLowerCase().startsWith(filter.toLowerCase()))
    .sort((s1, s2) => (s1.name < s2.name ? -1 : 1));

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
          <table className={styles.skillTable}>
            <tbody>
              <tr>
                <th className={styles.skillTableHeader}>Name</th>
                <th className={styles.skillTableHeader}>Demons</th>
              </tr>
              {skills.map((x) => {
                return (
                  <tr className={styles.skillTableRow} key={x.name}>
                    <td className={styles.skillTableCell}>
                      {
                        <Link to={x.name.toLowerCase().replace(" ", "_")}>
                          {x.name}
                        </Link>
                      }
                    </td>
                    <td className={styles.skillTableCell}>
                      <DemonsPossessingSkills demonsWithSkills={x.demons} />
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
