import { useContext } from "react";
import { LogInContext } from "../store/login-context";
import { logOut } from "../util/login-functions";
import classes from "./Header.module.scss";
import { Button } from "./UI/buttons/Button";
import { MobileIcon } from "./UI/MobileIcon";
import heart from "./pics/heart.png";

export const Header = () => {
  const LogInCtx = useContext(LogInContext);

  const logoutHandler = async () => {
    await logOut();
    window.location.reload();
  };

  return (
    <header className={classes.header}>
      <div className={classes["main-elements"]}>
        {/* <MobileIcon/> */}
        <div className={classes["logo"]}>
          <img src={heart} alt="heart logo" />
          <h1>Health tracker</h1>
        </div>

        {/* {LogInCtx.LogIn && (<div className={classes['show-on-mobile']}> 
          <Button text={"Log Out"} onClick={logoutHandler}></Button></div>
        )} */}
        <p className={`${classes.message} ${classes["show-on-mobile"]}`}>
          {LogInCtx.LogIn ? LogInCtx.Email : "You've logged off"}
        </p>
      </div>
      <div className={classes["elements"]}>
        <p className={`${classes.message} ${classes["dont-show-on-mobile"]}`}>
          {LogInCtx.LogIn ? LogInCtx.Email : "You've logged off"}
        </p>
        {LogInCtx.LogIn && (
          <div>
            <Button text={"Log Out"} onClick={logoutHandler}></Button>
          </div>
        )}
      </div>
    </header>
  );
};
