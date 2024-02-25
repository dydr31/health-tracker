
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDl24xtlW7zJMoUgQtCsMrKscg9QGGj25A",
  authDomain: "redux-tutorial-c8c52.firebaseapp.com",
  databaseURL: "https://redux-tutorial-c8c52-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "redux-tutorial-c8c52",
  storageBucket: "redux-tutorial-c8c52.appspot.com",
  messagingSenderId: "868138118935",
  appId: "1:868138118935:web:f799a64cf65164251b1152"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);