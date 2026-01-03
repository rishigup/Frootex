import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3AMsMO7zwtavrG3dPr1zI9iWORAlWs8A",
  authDomain: "frootex-f3977.firebaseapp.com",
  projectId: "frootex-f3977",
  storageBucket: "frootex-f3977.appspot.com",
  messagingSenderId: "152260981218",
  appId: "1:152260981218:web:0d28584a98424e0fdd09bb",
};

// 🔒 important: SINGLE initialization
const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
