// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhv2t6YqDGCFYEEXzYYVvOEcoGCBd9uoM",
  authDomain: "inscripciones-90672.firebaseapp.com",
  projectId: "inscripciones-90672",
  storageBucket: "inscripciones-90672.appspot.com",
  messagingSenderId: "380947480009",
  appId: "1:380947480009:web:3443630a9afbc73ea2fc18",
  measurementId: "G-W6WT015P7S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const storage = getStorage(app);

export { storage };