import { useContext } from "react";
import { AuthContext } from "./provider";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { firebaseAuth } from "@/base/services/firebase";
import { loadContextAction, updateUserInfoAction } from "./actions";
import type { PAYLOAD_UPDATE_USER_INFO } from "./types";

export default function useAuthContext() {
  const { state, dispatch } = useContext(AuthContext);

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

  function updateUserInfo(userInfo: PAYLOAD_UPDATE_USER_INFO) {
    return dispatch(updateUserInfoAction(userInfo));
  }

  function loadContext() {
    return dispatch(loadContextAction());
  }

  return {
    ...state,
    signInUser,
    signOutUser,
    signUpUser,
    loadContext,
    updateUserInfo,
  };
}
