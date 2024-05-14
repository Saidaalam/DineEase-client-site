// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOF5V82U-gF_jUpTKIavGYYGK8PuDwysw",
  authDomain: "assignment11-77574.firebaseapp.com",
  projectId: "assignment11-77574",
  storageBucket: "assignment11-77574.appspot.com",
  messagingSenderId: "320220582364",
  appId: "1:320220582364:web:810a82faa5a1fd25b87f19"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth }; 