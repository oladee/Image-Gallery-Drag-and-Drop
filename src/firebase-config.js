// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_SOME_KEY ,
  authDomain: "image-dnd.firebaseapp.com",
  projectId: "image-dnd",
  storageBucket: "image-dnd.appspot.com",
  messagingSenderId: "771743800787",
  appId: "1:771743800787:web:d5b6867c21e6c185946326",
  measurementId: "G-3N1EVNCXV8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);