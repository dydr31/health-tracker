import { auth } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { googleProvider } from "../config/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { signOut } from "firebase/auth";

export const logInWithGoogle = async () => {
  try {
    let response = await signInWithPopup(auth, googleProvider);
    localStorage.setItem("Log In", "true");
    let email = response.user.email!
    let name = response.user.displayName!
    localStorage.setItem("Email", email);
    localStorage.setItem("Name", name)
    console.log("you've logged in");
    findUserIdInDatabase(email, name)
    // return {name: response.user.displayName, email: response.user.email}

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
    try{
        const usersCollection = await getDocs(usersRef);
    let filteredUsersCollection = usersCollection.docs.map((doc) => ({
      name: doc.data().name,
      email: doc.data().email,
      id: doc.id,
    }))
    return filteredUsersCollection
    } catch (err) {
        console.error(err)
    }
}

export const findUserIdInDatabase = async (email: string, name: string) => {
  try {
    let data = await getUsersDbData()
    let result = data?.find((x) => x.email === email);

    //returns uid
    if (result !== undefined) {
      console.log(result.id);
      return result.id;
    } else {
      addUserToDb(email, name)
    }
  } catch (err) {
    console.error(err);
  }
};

export const addUserToDb = async (name: string, email: string) => {
    try{
        await addDoc (usersRef, {
            name: name,
            email: email,
        })
        let data = await getUsersDbData()
        
        let user = data?.find(x => x.email === email)
        
        console.log(user?.id)
        return user?.id
        
    } catch (err){
        console.error(err)
    }
}
