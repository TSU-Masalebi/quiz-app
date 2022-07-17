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
    </div>
  );
};

export default Layout;
