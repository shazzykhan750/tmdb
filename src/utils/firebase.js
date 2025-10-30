// Import the functions you need from the SDKs you need

import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDkIi0NBj6WnxhUTFuV2TZ8PLnZohwbUM",
  authDomain: "tmdbproject-b23f3.firebaseapp.com",
  projectId: "tmdbproject-b23f3",
  storageBucket: "tmdbproject-b23f3.firebasestorage.app",
  messagingSenderId: "251288860006",
  appId: "1:251288860006:web:5b8a4cb549a699c7ad04a7",
  measurementId: "G-F39EMC1TH5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
