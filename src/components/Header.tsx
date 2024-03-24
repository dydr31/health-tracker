import { useContext } from "react";
import { LogInContext } from "../store/login-context";
import { logOut } from "../store/login-functions";
import classes from "./Header.module.scss";
import { Button } from "./UI/Button";

export const Header = () => {
  const LogInCtx = useContext(LogInContext);

  const logoutHandler = async () => {
    await logOut();
    window.location.reload();
  };

  return (
    <header className={classes.header}>
      <div>
        <h1>Health tracker</h1>
      </div>
      <div className={classes['elements']}>
        <p className={classes.message}>{LogInCtx.LogIn ? LogInCtx.Email : "You've logged off"}</p>
        {LogInCtx.LogIn && (
          <Button text={"Log Out"} onClick={logoutHandler}></Button>
        )}
      </div>
    </header>
  );
};
