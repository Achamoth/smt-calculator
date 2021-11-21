import { useParams, Link } from "react-router-dom";
import { FusionData } from "./utils/types";
import { NavBar } from "./NavBar";
import styles from "./DemonDetails.module.css";
import { DemonFusions } from "./DemonFusions";

interface DemonDetailsProps {
  fusionData: FusionData;
}

export function DemonDetails(props: DemonDetailsProps) {
  let name = useParams().demonName;
  let demon = props.fusionData.demons.find(
    (d) => d.name.toLowerCase() === name
  )!;

  return (
    <div>
      <NavBar />
      <div className={styles.demonDetailsContents}>
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
      <DemonFusions demon={demon} fusionData={props.fusionData} />
    </div>
  );
}
