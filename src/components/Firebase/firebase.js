// Import the functions you need from the SDKs you need
import { getAuth } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAobGSqrCK5TRb4vxmJjbywezNdDLvzI30",
  authDomain: "socialize-6f1eb.firebaseapp.com",
  databaseURL: "https://socialize-6f1eb-default-rtdb.firebaseio.com",
  projectId: "socialize-6f1eb",
  storageBucket: "socialize-6f1eb.appspot.com",
  messagingSenderId: "809364993298",
  appId: "1:809364993298:web:cc68af8b0f2fd0e6602fcb",
  measurementId: "G-CCKFKBBJD5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app);

// export const storageRef = ref(storage)
