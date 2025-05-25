import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBkEkPGw8u6_JvxRXi0huHypB14CjcXAok",
  authDomain: "netflix-better.firebaseapp.com",
  projectId: "netflix-better",
  storageBucket: "netflix-better.appspot.com",
  messagingSenderId: "796062735163",
  appId: "1:796062735163:web:640700543e7274b957751e",
  measurementId: "G-LE0K34XZ9Q",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
