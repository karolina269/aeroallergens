import { Link } from "react-router-dom";
import "./AppNav.css";

const AppNav = () => {
  //

  return (
    <nav className="mainNav">
      <ul className="mainNavList">
        <li className="mainNavItem">
          <Link to="/current">Current</Link>
        </li>

        <li className="mainNavItem">
          <Link to="/forecast">Forecast</Link>
        </li>

        <li className="mainNavItem">
          <Link to="/historical">Historical</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AppNav;
