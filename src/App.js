import "./App.css";
import { Demon } from "./Demon";
import data from "./data.json";

function TestList() {
  console.log(data);
  let demons = data.map(
    (d) =>
      new Demon(d.race, d.name, d.level, d.skills, d.resistances, d.affinities)
  );

  return (
    <div className="TestList">
      <table className="table">
        <tbody>
          {demons.map((x) => {
            return (
              <tr className="tableRow" key={x.name}>
                <td>{x.race}</td>
                <td>{x.name}</td>
                <td>{x.level}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TestList;
