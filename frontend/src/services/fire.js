import dotenv from 'dotenv';
import firebase from 'firebase/app';
require('firebase/auth');

dotenv.config();

const FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
const FIREBASE_PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID;
const FIREBASE_MESSAGE_SENDER_ID = process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID;
const FIREBASE_APP_ID = process.env.REACT_APP_FIREBASE_APP_ID;

const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_PROJECT_ID + ".firebaseapp.com",
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_PROJECT_ID + ".appspot.com",
    messageSenderId: FIREBASE_MESSAGE_SENDER_ID,
    appId: FIREBASE_APP_ID
}

console.log(process.env);

try {
    firebase.initializeApp(firebaseConfig);
} catch (err) {
    // Only report the error if it doesn't contain "already exists" in the string
    if(!/already exists/.test(err.message)) {
        console.error('Firebase initialization error', err.stack);
    }
}

const fire = firebase;
export default fire;