import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAAaSiK7XJmTDr3hIOnelkStX01lQsZ2D4",
  authDomain: "teedhouse.firebaseapp.com",
  projectId: "teedhouse",
  storageBucket: "teedhouse.appspot.com",
  messagingSenderId: "382700502813",
  appId: "1:382700502813:web:dcfe6fbfadc7de115febf4",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
