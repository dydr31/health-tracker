import { auth } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { googleProvider } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { signOut } from "firebase/auth";

export const logInWithGoogle = async () => {
  try {
    let response = await signInWithPopup(auth, googleProvider);
    localStorage.setItem("Log In", "true");
    localStorage.setItem("Email", response.user.email!);
    console.log("you've logged in");
  } catch (err) {
    console.error(err);
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    console.log("you've signed out");
    localStorage.setItem("Log In", "false");
  } catch (err) {
    console.error(err);
  }
};

const usersRef = collection(db, "users");

export const findUserIdInDatabase = async (email: string) => {
  try {
    const usersCollection = await getDocs(usersRef);
    let filteredUsersCollection = usersCollection.docs.map((doc) => ({
      name: doc.data().name,
      email: doc.data().email,
      id: doc.id,
    }));

    let result = filteredUsersCollection.find((x) => x.email === email);

    if (result !== undefined) {
      console.log(result.id);
      return result.id;
    } else {
      console.log(result);
      return result;
    }
  } catch (err) {
    console.error(err);
  }
};
