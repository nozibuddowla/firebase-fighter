// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBpSO5G6CPVMaw-bY6bH_6vwuEZ_Dj_2c",
  authDomain: "fir-fighter-babff.firebaseapp.com",
  projectId: "fir-fighter-babff",
  storageBucket: "fir-fighter-babff.firebasestorage.app",
  messagingSenderId: "1064067106514",
  appId: "1:1064067106514:web:b84b56745ca2aefc498f0b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);