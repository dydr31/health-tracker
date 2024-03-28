import classes from "./Wellcome.module.scss";
import { Button } from "./UI/Button";
import { LogIn, logInWithGoogle } from "../store/login-functions";
import { useState } from "react";
import { ImgButton } from "./UI/ImgButton";
import { TransparentButton } from "./UI/TransparentButton";
import { SignUpMenu } from "./log-in-sign-up/SignUpMenu";
import { LogInMenu } from "./log-in-sign-up/LogInMenu";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

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
      <div className={classes.background}></div>
      <AnimatePresence>
      <div className={classes.wellcome}>
        {/* <AnimatePresence> */}
          {!isMenuOpen && (
            <div
              // initial={{ y: -50, opacity: 0 }}
              // animate={{ y: 0, opacity: 1 }}
              // exit={{ y: -50, opacity: 0 }}
              // transition={{ bounce: 0, duration: 0.25 }}
            >
              <h1>This is a health tracker.</h1>
              <Button text={"Log in"} onClick={menuHandler} />
            </div>
          )}
        {/* </AnimatePresence> */}

        
        {isMenuOpen && (
          <motion.div
            // initial={{ y: -50, opacity: 0 }}
            // animate={{ y: 0, opacity: 1 }}
            // exit={{ y: -50, opacity: 0 }}
            // transition={{ bounce: 0, duration: 0.25 }}
          >
            {!signUpMenu && !logInMenu && (
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ bounce: 0, duration: 0.25 }}
                className={classes["menu-container"]}
                key={"1"}
              >
                <TransparentButton onClick={menuHandler} />
                <div className={classes["menu"]}>
                  <Button
                    text={"Log in with Email"}
                    onClick={logInMenuHandler}
                  />
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
              </motion.div>
            )}

            {signUpMenu && (
              <motion.div
                key={"2"}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ bounce: 0, duration: 0.25 }}
                className={classes["menu-container"]}
              >
                <TransparentButton onClick={signUpMenuHandler} />
                <SignUpMenu />
              </motion.div>
            )}

            {logInMenu && (
              <motion.div
                key={"3"}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ bounce: 0, duration: 0.25 }}
                className={classes["menu-container"]}
              >
                <TransparentButton onClick={logInMenuHandler} />
                <LogInMenu />
              </motion.div>
            )}
          </motion.div>
        )} 
      </div>
      </AnimatePresence>
    </>
  );
};
