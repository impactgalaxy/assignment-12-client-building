import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import auth from "../../others/firebase/firebase.config";
import { Toaster } from "react-hot-toast";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (isUser) => {
      setUser(isUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const $info = {
    user,
    loading,
    setLoading,
    createUser,
  };
  return (
    <AuthContext.Provider value={$info}>
      {children}
      <Toaster position="top-right"></Toaster>
    </AuthContext.Provider>
  );
}
AuthProvider.propTypes = {
  children: PropTypes.node,
};
