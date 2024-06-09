import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../../others/firebase/firebase.config";
import { Toaster } from "react-hot-toast";
import useAxiosCommon from "../../others/hooks/axios/useAxiosCommon";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

export default function AuthProvider({ children }) {
  const commonApi = useAxiosCommon();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const updateNamePhoto = (name, imageUrl) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: imageUrl,
    });
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (isUser) => {
      setUser(isUser);
      if (isUser) {
        const userInfo = { email: isUser?.email, uid: isUser?.uid };
        const response = await commonApi.post("/jwt", userInfo);
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          setLoading(false);
        }
      } else {
        localStorage.removeItem("token");
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const $info = {
    user,
    loading,
    setLoading,
    createUser,
    googleLogin,
    loginUser,
    updateNamePhoto,
    logOut,
  };
  return (
    <AuthContext.Provider value={$info}>
      {children}
      <Toaster position="center"></Toaster>
    </AuthContext.Provider>
  );
}
AuthProvider.propTypes = {
  children: PropTypes.node,
};
