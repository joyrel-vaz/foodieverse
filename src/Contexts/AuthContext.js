import React, {useContext, useState, useEffect} from 'react'
import { auth, googleProvider, facebookProvider, twitterProvider, appleProvider } from '../firebase'

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email,password,displayName) {
        const sign = auth.createUserWithEmailAndPassword(email,password)
            .then(function(result) {
                result.user.sendEmailVerification()
                return result.user.updateProfile({
                displayName: displayName
                })
            });
        return sign
    }

    function login(email,password) {
        return auth.signInWithEmailAndPassword(email,password);
    }

    function loginGoogle(){
       return auth.signInWithPopup(googleProvider);
    }

    function loginFB(){
        return auth.signInWithPopup(facebookProvider);
    }

    function loginTw(){
        return auth.signInWithPopup(twitterProvider);
    }

    function loginApple(){
        return auth.signInWithPopup(appleProvider);
    }

    function forgotpassword(email) {
        return auth.sendPasswordResetEmail(email);
    }

    function logout() {
        return auth.signOut()
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return  currentUser.updatePassword(password)
    }

    function updateDetails(displayName) {
        return  currentUser.updateProfile({
            displayName: displayName
            })
    }


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
           
        })

        return unsubscribe
    }, [])

    const value = { 
        currentUser ,
        signup,
        login,
        loginGoogle,
        loginFB,
        loginTw,
        loginApple,
        logout,
        forgotpassword,
        updateEmail,
        updatePassword,
        updateDetails
    };

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}