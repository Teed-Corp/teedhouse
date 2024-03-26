import { FIREBASE_AUTH } from "@app/libs/firebase/FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const signIn = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
  } catch (error) {
    console.error(error);
  }
};

export const signUp = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
  } catch (error) {
    console.error(error);
  }
};
