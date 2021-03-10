import firebase from 'firebase/app'
import 'firebase/firestore';
import "firebase/auth"
import { FireSQL } from 'firesql';

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID

});

export const auth = app.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider()
export const appleProvider = new firebase.auth.OAuthProvider('apple.com')
export const facebookProvider = new firebase.auth.FacebookAuthProvider()
export const twitterProvider = new firebase.auth.TwitterAuthProvider()
//export const db = firebase.firestore();
export const fireSQL = new FireSQL(firebase.firestore());
export default app;
