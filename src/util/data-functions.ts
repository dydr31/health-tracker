import { db } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getUserId } from "./login-functions";

export const getUserData = async (id: string) => {
  const userRef = doc(db, "users", id);
  try {
    let data = await getDoc(userRef);
    return data.data()?.data;
  } catch (err) {
    console.error(err);
  }
};

export const fetchData = async (email: string) => {
  try {
    let id = await getUserId(email);
    let data = await getUserData(id!);
    return data;
  } catch (err) {
    console.error(err);
  }
};

type Data1 = {
  date: Date;
  upper: number;
  lower: number;
  pulse: number;
}[];

type Data2 = {
  date: {seconds: number, nanoseconds: number};
  upper: number;
  lower: number;
  pulse: number;
}

export const addDataPoint = async (
  email: string,
  data: Data1
) => {
  try {
    //we need to store id in a context
    let id = await getUserId(email);
    const userRef = doc(db, "users", id!);
    let prevData = await getUserData(id!);
    console.log(prevData.concat(data));
    //and data array in context
    await updateDoc(userRef, { data: prevData.concat(data) });
  } catch (err) {
    console.error(err);
  }
};

export const updateData = async (
  email: string,
  data: Data2[]
) => {
  try {
    let id = await getUserId(email);
    const userRef = doc(db, "users", id!);
    let response = await updateDoc(userRef, { data: data });
    console.log(response)
  } catch (err) {
    console.error(err);
  }
};
