import { useContext } from "react";
import { LogInContext } from "../store/login-context";
import { logOut } from "../store/login-functions";
import classes from "./Header.module.css";
import { Button } from "./UI/Button";

export const Header = () => {
  const LogInCtx = useContext(LogInContext);

  const logoutHandler = () => {
    logOut();
  };

  return (
    <header className={classes.header}>
      <div>{LogInCtx.LogIn ? LogInCtx.Email : "You've logged off"}</div>
      {LogInCtx.LogIn && (
        <Button text={"Log Out"} onClick={logoutHandler}></Button>
      )}
    </header>
  );
};
