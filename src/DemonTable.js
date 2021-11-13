import { Link } from "react-router-dom";

export function DemonTable(props) {
    return (
        <div className="TestList">
            <table className="table">
                <tbody>
                    {props.demons.map((x) => {
                        return (
                            <tr className="tableRow" key={x.name}>
                                <td>{x.race}</td>
                                <td><Link to={`/${x.name.toLowerCase()}`}>{x.name}</Link></td>
                                <td>{x.level}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}