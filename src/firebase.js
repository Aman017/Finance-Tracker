// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsawd59SjkjSqLKCJxgwk43e51RodkusM",
  authDomain: "finance-tracker-ft-one.vercel.app",
  projectId: "prj_Wd5eEgQ4v3fhuWoVQkd1MiGn8mL9",
  storageBucket: "financly-tracker.firebasestorage.app",
  messagingSenderId: "586987463453",
  appId: "1:586987463453:web:df5266a1c6e6a0750e37f4",
  measurementId: "G-5G23M7BT17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {db, auth, provider, doc, setDoc};
