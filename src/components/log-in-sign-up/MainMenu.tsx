import { AnimatePresence } from "framer-motion";
import { DropdownWrapper } from "../UI/DropdownWrapper";
import { TransparentButton } from "../UI/TransparentButton";
import { Button } from "../UI/Button";
import classes from "./MainMenu.module.scss";
import { useContext } from "react";
import { SignInContext } from "../../store/sign-up-sign-in-menu-context";
import { logInWithGoogle } from "../../util/login-functions";

export const MainMenu: React.FC<{}> = (props) => {
  const signInCtx = useContext(SignInContext);

  const logInWithGoogleHandler = async () => {
    await logInWithGoogle();
    window.location.reload();
  };

  return (
    <AnimatePresence>
      {!signInCtx.signUp && !signInCtx.signIn && (
        <DropdownWrapper className={classes["menu-container"]} key={"1"}>
          <TransparentButton onClick={() => signInCtx.toggleMainMenu()} />
          <div className={classes["menu"]}>
            <Button
              text={"Log in with Email"}
              onClick={() => signInCtx.toggleSignIn()}
            />
            <Button
              text={"Log in with Google"}
              onClick={logInWithGoogleHandler}
            />
            <p>
              Don't have an account?{" "}
              <strong
                onClick={() => signInCtx.toggleSignUp()}
                className={classes.signup}
              >
                Sign Up
              </strong>
            </p>
          </div>
        </DropdownWrapper>
      )}
    </AnimatePresence>
  );
};
