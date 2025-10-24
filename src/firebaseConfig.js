import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCn4mlQFKUUlEZYsGHsMcZMdjpkW31OhuM",
  authDomain: "admin-pro-b81e3.firebaseapp.com",
  projectId: "admin-pro-b81e3",
  storageBucket: "admin-pro-b81e3.firebasestorage.app",
  messagingSenderId: "58443942643",
  appId: "1:58443942643:web:0f0c5ac8b1e919632e4586"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();