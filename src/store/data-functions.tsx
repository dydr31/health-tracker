import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getData } from "./login-functions";

export const getUserData = async (id: string) => {
  const userRef = doc(db, "users", id);
  try {
    let data = await getDoc(userRef);
    console.log(data.data()?.data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

