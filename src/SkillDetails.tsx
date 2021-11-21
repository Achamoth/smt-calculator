import { useParams } from "react-router-dom";
import { SkillDefinition } from "./utils/types";
import { NavBar } from "./NavBar";
import "./SkillDetails.css";

interface SkillDetailsProps {
  skills: SkillDefinition[];
}

export function SkillDetails(props: SkillDetailsProps) {
  let name = useParams().skillName!.replace("_", " ");
  let skill = props.skills.find((s) => s.name.toLowerCase() === name)!;

  return (
    <div>
      <NavBar />
      <div className="centeredContainerNoMargin">
        <div className="skillDetailContents">
          <div className="centeredContainerNoMargin">
            <h1>{skill.name}</h1>
          </div>
          <table className="skillDetails">
            <tr key="skillEffect" className="skillDetailRow">
              <td className="skillDetailHeaderCell">Effect</td>
              <td className="skillDetailCell">{skill.skill.effect}</td>
            </tr>
            <tr key="skillElement" className="skillDetailRow">
              <td className="skillDetailHeaderCell">Element</td>
              <td className="skillDetailCell">{skill.skill.element}</td>
            </tr>
            {skill.skill.target && (
              <tr key="skillTarget" className="skillDetailRow">
                <td className="skillDetailHeaderCell">Target</td>
                <td className="skillDetailCell">{skill.skill.target}</td>
              </tr>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}
