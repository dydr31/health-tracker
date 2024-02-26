
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { auth } from "../config/firebase";
import { LogInContext } from "../store/login-context";
import classes from "./Header.module.css";
import { Button } from "./UI/Button";

export const Header = () => {
  const LogInCtx = useContext(LogInContext);

  const logOut = async () => {
    try{
        await signOut(auth);
        console.log('a')
        localStorage.setItem("Log In", 'false');
    }catch(err){
        console.error(err)
    }

  }

  const a = () => {
    console.log('a')
  }

  return (
    <header className={classes.header}>
      <div>{LogInCtx.LogIn ? LogInCtx.Email : "You've logged off"}</div>
      {LogInCtx.LogIn && <Button text={'Log Out'} onClick={logOut}></Button>}
    </header>
  );
};
