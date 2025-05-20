import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDMf26akL5pIj5yo6_f-iMgcR8HMnOJ-hY",
  authDomain: "netflix-2-0-7e1e2.firebaseapp.com",
  projectId: "netflix-2-0-7e1e2",
  storageBucket: "netflix-2-0-7e1e2.firebasestorage.app",
  messagingSenderId: "201193233825",
  appId: "1:201193233825:web:3a212aa0229f31cf357fe0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };
