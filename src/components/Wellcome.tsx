import classes from "./Wellcome.module.scss";
import { Button } from "./UI/Button";
import { LogIn, logInWithGoogle } from "../store/login-functions";
import { useState } from "react";
import { ImgButton } from "./UI/ImgButton";
import { TransparentButton } from "./UI/TransparentButton";
import { SignUpMenu } from "./SignUpMenu";
import { LogInMenu } from "./LogInMenu";

export const Wellcome = () => {
  const logInWithGoogleHandler = async () => {
    let obj = await logInWithGoogle();
    console.log(obj);
    window.location.reload();
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuHandler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [signUpMenu, setSignUpMenu] = useState(false);
  const signUpMenuHandler = () => {
    setSignUpMenu(!signUpMenu);
  };

  const [logInMenu, setLogInMenu] = useState(false);
  const logInMenuHandler = () => {
    setLogInMenu(!logInMenu);
  };

  

  return (
    <>
    {console.log(isMenuOpen, logInMenu, signUpMenu)}
      <div className={classes.background}></div>
      <div className={classes.wellcome}>
        {!isMenuOpen && (
          <>
            <h1>This is a health tracker.</h1>
            <Button text={"Log in"} onClick={menuHandler} />
          </>
        )}


        {isMenuOpen && (
          <div>
            {!signUpMenu  &&  !logInMenu &&(
              <div className={classes["menu-container"]}>
                <TransparentButton onClick={menuHandler} />
                <div className={classes["menu"]}>
                  <Button text={"Log in with Email"} onClick={logInMenuHandler} />
                  <Button
                    text={"Log in with Google"}
                    onClick={logInWithGoogleHandler}
                  />
                  <p>
                    Don't have an account?{" "}
                    <strong
                      onClick={signUpMenuHandler}
                      className={classes.signup}
                    >
                      Sign Up
                    </strong>
                  </p>
                </div>
              </div>
            )}

            {signUpMenu && (
              <div className={classes["signup-menu"]}>
                <TransparentButton onClick={signUpMenuHandler} />
                <SignUpMenu />
              </div>
            )}

            {logInMenu && (
              <div className={classes["signup-menu"]}>
                <TransparentButton onClick={logInMenuHandler} />
                <LogInMenu />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
