import classes from "./LogInMenu.module.scss";
import { FormEvent, useRef, useState } from "react";
import { Button } from "./UI/Button";
import { LogIn } from "../store/login-functions";

export const LogInMenu: React.FC = () => {
  let emailRef = useRef<HTMLInputElement>(null);
  let passwordRef = useRef<HTMLInputElement>(null);

  const [emailInvalid, setEmailInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);

  const onBlurEmailHandler = () => {
    let email = emailRef.current!.value;
    if (email.indexOf("@") > -1) {
      setEmailInvalid(false);
    } else {
      setEmailInvalid(true);
    }
  };

  const onBlurPasswordHandler = () => {
    let password = passwordRef.current!.value;
    if (password.length >= 8) {
      setPasswordInvalid(false);
    } else {
      setPasswordInvalid(true);
    }
  };

  const getResponse = async(email: string, password: string) => {
    let response = await LogIn(email, password)
    console.log(response)

    if(response !== undefined){
        console.log('logged')
        localStorage.setItem('Email', email)
        localStorage.setItem('Log In', 'true')
        window.location.reload()
    }
    else {

    }

    return response
  }
  const logInWithEmailAndPassword = (event: FormEvent) => {
    event.preventDefault()
    let email = emailRef.current!.value;
    let password = passwordRef.current!.value;
    
    let response = getResponse(email, password)
   

  }
  return (
    <>
      <form className={classes.form}>
        <input
          type="email"
          placeholder="email"
          className={`${classes.input} ${emailInvalid && classes.red}`}
          ref={emailRef}
          onBlur={onBlurEmailHandler}
        />
        <input
          type="password"
          placeholder="password"
          className={`${classes.input} ${passwordInvalid && classes.red}`}
          ref={passwordRef}
          onBlur={onBlurPasswordHandler}
        />
        {/* {errorMessage !== "" && (
          <p className={classes["error-message"]}>{errorMessage}</p>
        )} */}
        <Button text={"Sign Up"} onClick={logInWithEmailAndPassword} />
      </form>
    </>
  );
};
