// // Base de datos de Emerson Peru SAC

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import 'firebase/compat/database';
// import 'firebase/compat/auth';

// import { FirebaseOptions } from 'firebase/app';
// import firebase from 'firebase/compat/app';

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDFxsCBd6asaBIC8uYZY06c9JYlC3t1qdw",
//   authDomain: "emerson-cf2bb.firebaseapp.com",
//   projectId: "emerson-cf2bb",
//   storageBucket: "emerson-cf2bb.appspot.com",
//   messagingSenderId: "668712275003",
//   appId: "1:668712275003:web:c059c05b470e6845f9a01e",
//   measurementId: "G-K2L2KV3MCP"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// const auth = firebase.auth;
// export {auth}
// export default firebase;

// Base de Datos abierta al público en general

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/compat/database';
import 'firebase/compat/auth';

import { FirebaseOptions } from 'firebase/app';
import firebase from 'firebase/compat/app';

const firebaseConfig = {
  apiKey: "AIzaSyDVpzFdgUAzOQNaElJhOeqSXQs3kZ2VP4A",
  authDomain: "inventory-managment-9d8d6.firebaseapp.com",
  databaseURL: "https://inventory-managment-9d8d6-default-rtdb.firebaseio.com",
  projectId: "inventory-managment-9d8d6",
  storageBucket: "inventory-managment-9d8d6.appspot.com",
  messagingSenderId: "934551463330",
  appId: "1:934551463330:web:e6b03390e1ad2318d27efb",
  measurementId: "G-0EZGM15EV6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth;
export {auth}
export default firebase;