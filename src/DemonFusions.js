import { useParams } from "react-router-dom";
import "./DemonFusions.css";

export function DemonFusions(props) {
    let name = useParams().demonName;
    let demon = props.demons.find(d => d.name.toLowerCase() === name);

    return (
        <div className="demon">
            <h1>{`LV${demon.level} ${demon.race} ${demon.name}`}</h1>
        </div>
    );
}