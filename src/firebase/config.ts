// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAS1cvlqFOydqvnDFMpNLUwksynmg51CTI",
  authDomain: "astro-auth-36a3e.firebaseapp.com",
  projectId: "astro-auth-36a3e",
  storageBucket: "astro-auth-36a3e.firebasestorage.app",
  messagingSenderId: "147354923003",
  appId: "1:147354923003:web:62bc919b7cfac983a9a55e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
auth.languageCode = 'es';
export const firebase = {
    app,
    auth
}