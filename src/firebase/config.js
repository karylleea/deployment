// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvhKXlrxPpbRqeOwLK05z9s0w-Iewb_mk",
  authDomain: "banus-79d06.firebaseapp.com",
  projectId: "banus-79d06",
  storageBucket: "banus-79d06.firebasestorage.app",
  messagingSenderId: "135536359538",
  appId: "1:135536359538:web:d13ba964fcef6a6a892aeb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Storage for photo uploads
export const storage = getStorage(app);

// Initialize Auth
export const auth = getAuth(app);

export default app;
