import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getUserId } from "./login-functions";

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

export const fetchData = async (email: string, name: string) => {
    try{
        let id = await getUserId(email, name)
        let data = await getUserData(id!)
        return data
    } catch (err){
    }
  }

export const addData = async () => {

}

