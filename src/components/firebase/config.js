import firebase from "firebase/app";

import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDj1lY-4dscxPsq1LLD8WYIsElYFW3tkXY",
  authDomain: "react-8c1e0.firebaseapp.com",
  projectId: "react-8c1e0",
  storageBucket: "react-8c1e0.appspot.com",
  messagingSenderId: "1004752010317",
  appId: "1:1004752010317:web:46d0546c1d277154563004",
  measurementId: "G-REVB4NPM0X",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const porjectSto = firebase.storage();

export { porjectSto };
