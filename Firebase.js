// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/compat/database';
import 'firebase/compat/auth';

import { FirebaseOptions } from 'firebase/app';
import firebase from 'firebase/compat/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFxsCBd6asaBIC8uYZY06c9JYlC3t1qdw",
  authDomain: "emerson-cf2bb.firebaseapp.com",
  projectId: "emerson-cf2bb",
  storageBucket: "emerson-cf2bb.appspot.com",
  messagingSenderId: "668712275003",
  appId: "1:668712275003:web:c059c05b470e6845f9a01e",
  measurementId: "G-K2L2KV3MCP"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth;
export {auth}
export default firebase;