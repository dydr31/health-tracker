import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { googleProvider } from "../config/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { signOut } from "firebase/auth";
import { getUserData } from "./data-functions";
import { signInWithEmailAndPassword } from "firebase/auth";

export const logInWithGoogle = async () => {
  try {
    let response = await signInWithPopup(auth, googleProvider);
    localStorage.setItem("Log In", "true");
    let email = response.user.email!;
    let name = response.user.displayName!;
    localStorage.setItem("Email", email);
    localStorage.setItem("Name", name);
    console.log("you've logged in");
    // let id = await getUserId(email);
    // console.log(id)
    return {email: email, name: name}
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

const getUsersDbData = async () => {
  try {
    const usersCollection = await getDocs(usersRef);
    let filteredUsersCollection = usersCollection.docs.map((doc) => ({
      name: doc.data().name,
      email: doc.data().email,
      id: doc.id,
    }));
    return filteredUsersCollection;
  } catch (err) {
    console.error(err);
  }
};

export const getUserId = async (email: string) => {
  try {
    let data = await getUsersDbData();

    let result = data?.find((x) => x.email === email);

    if (result !== undefined) {
      return result.id;
      //getUserData(result.id);
    } else {
      addUserToDb(email);
    }
  } catch (err) {
    console.error(err);
  }
};

export const addUserToDb = async (email: string) => {
  try {
    await addDoc(usersRef, {
      name: "",
      email: email,
      data: [],
    });
    let data = await getUsersDbData();

    let user = data?.find((x) => x.email === email);

    return user?.id;
    // getUserData(user!.id);
  } catch (err) {
    console.error(err);
  }
};

export const LogIn = async (email: string, password: string) => {
  try {
    let response = await signInWithEmailAndPassword(auth, email, password);
    return response
  } catch (err) {
    console.error(err);
  }
};

export const signUp = async (email:string, password: string) => {
  try{
    let response = await createUserWithEmailAndPassword(auth, email, password)
    console.log('user created')
    console.log(response)
    await addUserToDb(email)
    return response
    // if (response.ok){
    //   console.log('a')
    // }

  } catch(err: unknown){
    console.error(err)
    // console.log(err.message)
    return err
  }
}
