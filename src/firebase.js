// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { apiKey } from "./apiKey";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "rem-app-c29c2.firebaseapp.com",
  projectId: "rem-app-c29c2",
  storageBucket: "rem-app-c29c2.appspot.com",
  messagingSenderId: "490349054693",
  appId: "1:490349054693:web:72670489a573dd857c220c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);