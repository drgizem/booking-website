// Import the functions you need from the SDKs you need
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzhJLiMZSh1axQbGvzntIFv1fxYCUN_78",
  authDomain: "booking-2f3e6.firebaseapp.com",
  projectId: "booking-2f3e6",
  storageBucket: "booking-2f3e6.appspot.com",
  messagingSenderId: "885763768775",
  appId: "1:885763768775:web:4db9e497ed69370073d9e2",
  measurementId: "G-WNSY8T3Q7B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);