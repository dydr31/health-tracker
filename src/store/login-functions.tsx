import { auth } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { googleProvider } from "../config/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { signOut } from "firebase/auth";
import { getUserData } from "./data-functions";

export const logInWithGoogle = async () => {
  try {
    let response = await signInWithPopup(auth, googleProvider);
    localStorage.setItem("Log In", "true");
    let email = response.user.email!;
    let name = response.user.displayName!;
    localStorage.setItem("Email", email);
    localStorage.setItem("Name", name);
    console.log("you've logged in");
    getUserId(email, name);
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

export const getUserId = async (email: string, name: string) => {

  try {
   
    let data = await getUsersDbData();
    
    let result = data?.find((x) => x.email === email);
   
    if (result !== undefined) {
        return result.id
      //getUserData(result.id);
    } else {
      addUserToDb(email, name);
    }

  } catch (err) {
    console.error(err);
  }
};

export const addUserToDb = async (email: string, name: string) => {
  try {
    await addDoc(usersRef, {
      name: name,
      email: email,
      data: [],
    });
    let data = await getUsersDbData();

    let user = data?.find((x) => x.email === email);

    return user?.id
    // getUserData(user!.id);

  } catch (err) {
    console.error(err);
  }
};
