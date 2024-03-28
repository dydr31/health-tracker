import { useContext } from "react";
import { LogInContext } from "../store/login-context";
import { Table } from "./main-content/Table";
import { Wellcome } from "./Wellcome";

import classes from "./MainContent.module.scss";
import { FormsStateContextProvider } from "../store/forms-state-context";
import { SignInContextProvider } from "../store/sign-up-sign-in-menu-context";

export const MainContent: React.FC = () => {
  const logInCtx = useContext(LogInContext);

  return (
    <main className={classes.main}>
      {logInCtx.LogIn ? (
        <FormsStateContextProvider>
          <Table />
        </FormsStateContextProvider>
      ) : (
        <SignInContextProvider>
          <Wellcome />
        </SignInContextProvider>
      )}
    </main>
  );
};
