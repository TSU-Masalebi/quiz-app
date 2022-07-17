import { Link } from "react-router-dom";
// import logo from "../../images/logo.jpg";

import classes from "./MainNavigation.module.css";
import logo from "../images/logo.jpg";
const TSUMasaslebiLink =
  "https://tsu-masalebi.github.io/TSU-Masalebi/index.html?fbclid=IwAR1l4QmeW_aC71WyLoTfTuolR9wFM9OHUEUCM_HA2XMhU6YjJq3iIYJCfik";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <a href={TSUMasaslebiLink}>
        <img src={logo} alt="logo" className={classes.image} />
      </a>
      <nav className={classes.nav}>
        <ul>
          <li>
            <a href={TSUMasaslebiLink}> Home </a>
          </li>
          <li>
            <Link to="/"> Quizes </Link>
          </li>
          <li>
            <a
              href="https://www.facebook.com/groups/tsumasalebi/"
              target="_blank"
              rel="noreferrer noopener"
            >
              {" "}
              Facebook group{" "}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
