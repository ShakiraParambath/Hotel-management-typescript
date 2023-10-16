// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnXs7WwzBjPopkag3pOh637OtuCWrmpBw",
  authDomain: "hotel-management-typescript.firebaseapp.com",
  projectId: "hotel-management-typescript",
  storageBucket: "hotel-management-typescript.appspot.com",
  messagingSenderId: "561812569718",
  appId: "1:561812569718:web:7368f9b8a438164948a957",
  measurementId: "G-T99E0SQCFK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const firebaseApp = initializeApp(firebaseConfig);
