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
  apiKey: "AIzaSyBHcQEeq87sFMiX-tktMEHc5A0w89yQsB8",
  authDomain: "tmdbmovie-4c9a9.firebaseapp.com",
  projectId: "tmdbmovie-4c9a9",
  storageBucket: "tmdbmovie-4c9a9.firebasestorage.app",
  messagingSenderId: "735578404646",
  appId: "1:735578404646:web:e0840deee0e5908d4973e7",
  measurementId: "G-JYPMHW16VW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); 

export const auth = getAuth();
