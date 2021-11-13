import { useParams } from "react-router-dom";
import "./DemonFusions.css";

export function DemonFusions(props) {
  let name = useParams().demonName;
  let demon = props.demons.find((d) => d.name.toLowerCase() === name);
  console.log(demon.skills);

  return (
    <div className="demon">
      <h1>{`LV${demon.level} ${demon.race} ${demon.name}`}</h1>
      <table>
        <tr>
          <th>Skill</th>
          <th>Level</th>
        </tr>
        <tbody>
          {demon.skills
            .sort((s1, s2) => (s1.level < s2.level ? -1 : 1))
            .map((s) => {
              return (
                <tr>
                  <td>{s.name}</td>
                  <td>
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
  );
}
