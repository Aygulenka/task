import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Firebase configuration
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCi28hC4GV3kySC6H2kcwTa8PaPEnDn5jM",
  authDomain: "task3-db447.firebaseapp.com",
  projectId: "task3-db447",
  storageBucket: "task3-db447.appspot.com",
  messagingSenderId: "504495283733",
  appId: "1:504495283733:web:c83f2e0b3e9265a0e3381c",
  measurementId: "G-2YF2TCT4R0"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
const db = getFirestore(app)
export { db } 


