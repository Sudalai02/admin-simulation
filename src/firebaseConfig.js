import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBS6w_Ru-iKsa_NryyZTnJXg7HuQb5nZgY",
  authDomain: "admin-simulations.firebaseapp.com",
  projectId: "admin-simulations",
  storageBucket: "admin-simulations.firebasestorage.app",
  messagingSenderId: "449586268337",
  appId: "1:449586268337:web:867d79a7aef7461485ba90"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db =getFirestore(app)
export const provider = new GoogleAuthProvider();