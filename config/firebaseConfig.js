// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmZVcCraiz-d6_po9EprxdWUkqcmMKRk4",
  authDomain: "dine-time-9124c.firebaseapp.com",
  projectId: "dine-time-9124c",
  storageBucket: "dine-time-9124c.firebasestorage.app",
  messagingSenderId: "1057985737534",
  appId: "1:1057985737534:web:224c5e7bc4ff25c02d326f",
  measurementId: "G-1R3FG4B5J8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);