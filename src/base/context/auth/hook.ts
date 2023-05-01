import { useContext } from "react";
import { AuthContext } from "./provider";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { firebaseAuth } from "@/base/services/firebase";

export default function useAuthContext() {
  const { state } = useContext(AuthContext);

  async function signUpUser(email: string, password: string) {
    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.error(error);
    }
  }

  async function signInUser(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.error(error);
    }
  }

  async function signOutUser() {
    try {
      await signOut(firebaseAuth);
    } catch (error) {
      console.error(error);
    }
  }

  return {
    user: state.user,
    info: state.info,
    signInUser,
    signOutUser,
    signUpUser,
  };
}
