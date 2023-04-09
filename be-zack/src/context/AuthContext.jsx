import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../utils/firebase-config";
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";

const AuthContext = createContext({
    currentUser: null,
    register: () => Promise,
    login: () => Promise,
    logout: () => Promise,
    loading: true,
    forgotPassword: () => Promise,
});

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setLoading(false);
        })
        return () => {
            unsubscribe()
        }
    }, []);

    function register (email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () => {
        return signOut(auth);
    }

    const forgotPassword = (email) => {
        return sendPasswordResetEmail(auth, email, { url: "http://localhost:5175/login" });
      };


    const value = {
        currentUser,
        register,
        login,
        logout,
        loading,
        forgotPassword,
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

