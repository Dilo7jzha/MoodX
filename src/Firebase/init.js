// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4tYRA-TakPKsod4_iDjBuhBo6b1JplQM",
  authDomain: "moodx-a3040.firebaseapp.com",
  projectId: "moodx-a3040",
  storageBucket: "moodx-a3040.appspot.com",
  messagingSenderId: "503884886491",
  appId: "1:503884886491:web:66c30f5a0b1cf1f31d77fe"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore()
export default db