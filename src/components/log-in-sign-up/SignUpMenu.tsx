import { Button } from "../UI/Button";
import classes from "./SignUpMenu.module.scss";
import { FormEvent, useRef, useState } from "react";
import { signUp } from "../../util/login-functions";
import { isEmailValid, isPasswordValild } from "../../util/signup-login-form-validation";

export const SignUpMenu: React.FC = () => {
  let emailRef = useRef<HTMLInputElement>(null);
  let passwordRef = useRef<HTMLInputElement>(null);

  const [emailInvalid, setEmailInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);

  const getResponse = async (email: string, password: string) => {
    let response = await signUp(email, password);
    if (response === undefined) {
      console.log();
      setErrorMessage("Email already in use");
    } else if (typeof response === "object") {
      let responseMessage = response!.toString().slice(0, 13);
      if (responseMessage === "FirebaseError") {
        setErrorMessage("Ivalid email");
        setSuccessMessage(false);
      } else {
        setErrorMessage("");
        localStorage.setItem("Email", email);
        setSuccessMessage(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    }
  };

  const signUpWithEmailAndPassword = (event: FormEvent) => {
    event.preventDefault();
    let email = emailRef.current!.value;
    let password = passwordRef.current!.value;
    if (checkForm(email, password) === true) {
      getResponse(email, password);
    } else {
      return null;
    }
  };

  const checkForm = (email: string, password: string) => {
    if (isEmailValid(email) && isPasswordValild(password)){
      setEmailInvalid(false)
      setPasswordInvalid(false)
      return true
    }
    else if (!isEmailValid(email)){
      setEmailInvalid(true)
      return false
    }
    else if(!isPasswordValild(password)){
      setPasswordInvalid(true)
      return false
    }
    else {
      return false
    }
  };

  const onBlurEmailHandler = () => {
    let email = emailRef.current!.value;
    if (isEmailValid(email)) {
      setEmailInvalid(false);
      setErrorMessage("");
    } else {
      setEmailInvalid(true);
    }
  };

  const onBlurPasswordHandler = () => {
    let password = passwordRef.current!.value;
    if (isPasswordValild(password)) {
      setPasswordInvalid(false);
    } else {
      setPasswordInvalid(true);
    }
  };

  return (
    <>
      {!successMessage && (
        <form className={classes.form}>
          <input
            type="email"
            placeholder="email"
            className={`${classes.input} ${emailInvalid && classes.red}`}
            key={"1"}
            ref={emailRef}
            onBlur={onBlurEmailHandler}
            required
          />
          <input
            type="password"
            placeholder="password"
            className={`${classes.input} ${passwordInvalid && classes.red}`}
            key={"2"}
            ref={passwordRef}
            onBlur={onBlurPasswordHandler}
            required
          />
          {errorMessage !== "" && (
            <p className={classes["error-message"]}>{errorMessage}</p>
          )}
          <Button text={"Sign Up"} onClick={signUpWithEmailAndPassword} />
        </form>
      )}
      {successMessage && <h2>Sign up successful</h2>}
    </>
  );
};
