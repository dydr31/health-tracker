import { useContext } from "react";
import { LogInContext } from "../store/login-context";
import { Table } from "./main-content/Table";
import { Wellcome } from "./Wellcome";

import classes from './MainContent.module.scss'

export const MainContent: React.FC = () => {
  const logInCtx = useContext(LogInContext);

  return <main className={classes.main}>{logInCtx.LogIn ? <Table /> : <Wellcome />}</main>;
};
