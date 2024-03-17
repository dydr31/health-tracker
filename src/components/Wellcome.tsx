import classes from "./Wellcome.module.css";
import { Button } from "./UI/Button";
import { logInWithGoogle } from "../store/login-functions";
import { useState } from "react";

export const Wellcome = () => {
  
  const logInHandler = async () => {
    let obj = await logInWithGoogle()
    console.log(obj)
    window.location.reload()
  }
  return (
    <>
      <div className={classes.wellcome}>
        <h1>This is a health tracker app.</h1>
        
        <Button text={'Log in with Google'} onClick={logInHandler}/>
      </div>
    </>
  );
};
