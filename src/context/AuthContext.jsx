import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, provider } from "../firebaseConfig";
import { ADMIN_EMAILS } from "../adminConfig";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
 
  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Google login failed:", err);
      alert("Google sign-in failed. Please retry.");
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser({ uid: u.uid, email: u.email, displayName: u.displayName, photoURL: u.photoURL });
      } else {
        setUser(null);
      }
    });
    return () => unsub();
  }, []);

  const isAdmin = ADMIN_EMAILS.includes(user?.email);

  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);