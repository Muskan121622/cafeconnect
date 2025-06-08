import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcNRo7kboQKWIWUQCM50M2oSCll24DBA0",
  authDomain: "cafeconnect-5b354.firebaseapp.com",
  projectId: "cafeconnect-5b354",
  storageBucket: "cafeconnect-5b354.firebasestorage.app",
  messagingSenderId: "312093934122",
  appId: "1:312093934122:web:56771a146f6b8b5a577953",
  measurementId: "G-6FJEVFC10W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);