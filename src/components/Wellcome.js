import classes from "./Wellcome.module.css";
import { auth } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { googleProvider } from "../config/firebase";

export const Wellcome = () => {
  const logInWithGoogle = async () => {
    try {
      let response = await signInWithPopup(auth, googleProvider);
      localStorage.setItem("Log In", true);
      // localStorage.setItem("Email", response.user.email);
      console.log(response.user.email)
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className={classes.wellcome}>
        <h1>This is a health tracker app.</h1>
        <button onClick={logInWithGoogle}>Log in with Google</button>
      </div>
    </>
  );
};
