import classes from "./Wellcome.module.scss";
import { Button } from "./UI/Button";
import { logInWithGoogle } from "../util/login-functions";
import { useContext, useState } from "react";
import { TransparentButton } from "./UI/TransparentButton";
import { SignUpMenu } from "./log-in-sign-up/SignUpMenu";
import { LogInMenu } from "./log-in-sign-up/LogInMenu";
import { AnimatePresence } from "framer-motion";
import { DropdownWrapper } from "./UI/DropdownWrapper";
import { SignInContext } from "../store/sign-up-sign-in-menu-context";
import { MainMenu } from "./log-in-sign-up/MainMenu";

export const Wellcome = () => {
  const signInCtx = useContext(SignInContext);
  return (
    <>
      <div className={classes.background}></div>

      <div className={classes.wellcome}>
        
        {!signInCtx.mainMenu && !signInCtx.signIn && !signInCtx.signUp && (
          <div>
            <h1>This is a health tracker.</h1>
            <Button
              text={"Log in"}
              onClick={() => signInCtx.toggleMainMenu()}
            />
          </div>
        )}

        {signInCtx.mainMenu && !signInCtx.signUp && !signInCtx.signIn && (
          <MainMenu />
        )}

        {signInCtx.signUp && (
          <DropdownWrapper key={"2"} className={classes["menu-container"]}>
            <TransparentButton onClick={() => signInCtx.toggleSignUp()} />
            <SignUpMenu />
          </DropdownWrapper>
        )}

        {signInCtx.signIn && (
          <DropdownWrapper key={"3"} className={classes["menu-container"]}>
            <TransparentButton onClick={() => signInCtx.toggleSignIn()} />
            <LogInMenu />
          </DropdownWrapper>
        )}
      </div>
    </>
  );
};
