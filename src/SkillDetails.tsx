import { useParams } from "react-router-dom";
import { SkillDefinition } from "./utils/types";
import styles from "./SkillDetails.module.css";
import globalStyles from "./globals.module.css";

interface SkillDetailsProps {
  skills: SkillDefinition[];
}

export function SkillDetails(props: SkillDetailsProps) {
  let name = useParams().skillName!.replace("_", " ");
  let skill = props.skills.find((s) => s.name.toLowerCase() === name)!;

  return (
    <div className={globalStyles.centeredContainerNoMargin}>
      <div className={styles.skillDetailContents}>
        <div className={globalStyles.centeredContainerNoMargin}>
          <h1>{skill.name}</h1>
        </div>
        <table className={styles.skillDetails}>
          <tr key="skillEffect" className="skillDetailRow">
            <td className={styles.skillDetailHeaderCell}>Effect</td>
            <td className={styles.skillDetailCell}>{skill.skill.effect}</td>
          </tr>
          <tr key="skillElement" className="skillDetailRow">
            <td className={styles.skillDetailHeaderCell}>Element</td>
            <td className={styles.skillDetailCell}>{skill.skill.element}</td>
          </tr>
          {skill.skill.target && (
            <tr key="skillTarget" className="skillDetailRow">
              <td className={styles.skillDetailHeaderCell}>Target</td>
              <td className={styles.skillDetailCell}>{skill.skill.target}</td>
            </tr>
          )}
        </table>
      </div>
    </div>
  );
}
