import { useContext } from "react";
import { LogInContext } from "../store/login-context";
import { Table } from "./main-content/Table";
import { Wellcome } from "./Wellcome";

import classes from "./MainContent.module.scss";
import { FormsStateContextProvider } from "../store/forms-state";

export const MainContent: React.FC = () => {
  const logInCtx = useContext(LogInContext);

  return (
    <FormsStateContextProvider>
      <main className={classes.main}>
        {logInCtx.LogIn ? <Table /> : <Wellcome />}
      </main>
    </FormsStateContextProvider>
  );
};
