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
  apiKey: "AIzaSyAOVvWVZcDy58U94j_FaKOR_Q96NcEOKuA",
  authDomain: "tmdb-6e244.firebaseapp.com",
  projectId: "tmdb-6e244",
  storageBucket: "tmdb-6e244.firebasestorage.app",
  messagingSenderId: "580615161524",
  appId: "1:580615161524:web:cc047d5d6e9246ed2e39e1",
  measurementId: "G-2EZBPHW0VW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
