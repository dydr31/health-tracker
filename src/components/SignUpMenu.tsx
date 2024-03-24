import { Button } from "./UI/Button";
import classes from "./SignUpMenu.module.scss";
import { FormEvent, useRef, useState } from "react";
import { signUp } from "../store/login-functions";

export const SignUpMenu: React.FC = () => {
  let emailRef = useRef<HTMLInputElement>(null);
  let passwordRef = useRef<HTMLInputElement>(null);

  const [emailInvalid, setEmailInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);

  const [errorMessage, setErrorMessage] = useState('')

  const getResponse = async (email: string, password: string) => {
    let response = await signUp(email, password);
    console.log(response)
     if (response === undefined){
        console.log()
        setErrorMessage('Email already in use')
     }
     else {
        setErrorMessage('')
        localStorage.setItem('Email', email)
        // window.location.reload()
     }
  }

  const signUpWithEmailAndPassword = (event: FormEvent) => {
    event.preventDefault();
    let email = emailRef.current!.value;
    let password = passwordRef.current!.value;
    if (checkForm(email, password) === true) {
      getResponse(email, password)
    } else {
      return null;
    }
  };

  const checkForm = (email: string, password: string) => {
    console.log(email.indexOf("@"), password.length);
    if (email.indexOf("@") > -1) {
      if (password.length >= 8) {
        console.log("true");
        return true;
      } else {
        setPasswordInvalid(true);
        return false;
      }
    } else {
      setEmailInvalid(true);
      if (password.length >= 8) {
        setPasswordInvalid(false);
      } else {
        setPasswordInvalid(true);
      }
      return false;
    }
  };

  const onBlurEmailHandler = () => {
    let email = emailRef.current!.value;
    if (email.indexOf("@") > -1) {
      setEmailInvalid(false);
      setErrorMessage('')
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
        {errorMessage !== '' && <p className={classes['error-message']}>{errorMessage}</p>}
        <Button text={"Sign Up"} onClick={signUpWithEmailAndPassword} />
      </form>
    </>
  );
};
