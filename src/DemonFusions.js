import { useParams } from "react-router-dom";

export function DemonFusions(props) {
    let name = useParams().demonName;
    let demon = props.demons.find(d => d.name.toLowerCase() === name);
    return (<h1>{demon.name}</h1>);
}