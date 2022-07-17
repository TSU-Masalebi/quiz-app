import React, { ReactElement } from "react";
import MainNavigation from "./MainNavigation";

import classes from "./Layout.module.css";
type Props = {
  children: ReactElement | null;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className={classes.container}>
      <MainNavigation />
      <main className={classes.main}>{children}</main>
      <footer className={classes.footer}>
        <h4 className={classes.copyright}>© TSU მასალები - 2022</h4>
        <h4 className={classes.author}>Created by: Anar Mamedovi</h4>
      </footer>
    </div>
  );
};

export default Layout;
