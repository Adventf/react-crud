import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC0ji5cfMYr73MjHJExbrW1AJ3nfF_GWRI",
  authDomain: "react-crud-4aced.firebaseapp.com",
  projectId: "react-crud-4aced",
  storageBucket: "react-crud-4aced.appspot.com",
  messagingSenderId: "612732179765",
  appId: "1:612732179765:web:d8cc837350455ebd7c287c",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
