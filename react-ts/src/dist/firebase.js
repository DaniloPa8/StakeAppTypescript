import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
// Initialize Firebase
var app = initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
});
// Firebase storage reference
var db = getFirestore(app);
var appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider("6LeFCRkhAAAAAMIuVA4HQF00Cko7s5o1EQxJGZpa"),
    isTokenAutoRefreshEnabled: true,
});
export default db;
