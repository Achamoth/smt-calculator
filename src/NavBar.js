import { Link } from "react-router-dom";
import "./NavBar.css";

export function NavBar() {
  return (
    <div className="navBar">
      <Button route="/" text="Demons" />
      <Button route="/skills" text="Skills" />
    </div>
  );
}

function Button(props) {
  return (
    <Link to={props.route}>
      <span className="styledButton">{props.text}</span>
    </Link>
  );
}
