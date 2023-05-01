import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { firebaseDatabase } from "../services/firebase";
import { UserInfo } from "../types/users";
import { FIRESTORE_COLLECTIONS } from "../consts/database-endpoints";

export default function useUsersFirestore() {
  async function createUserRecord({ email, ...rest }: UserInfo) {
    return await setDoc(
      doc(firebaseDatabase, FIRESTORE_COLLECTIONS.USERS, email),
      rest
    );
  }

  async function readUserRecord({ docKey }: { docKey: string }) {
    return await getDoc(
      doc(firebaseDatabase, FIRESTORE_COLLECTIONS.USERS, docKey)
    );
  }

  function updateUserRecord() {}

  function deleteUserRecord() {}

  return {
    createUserRecord,
    readUserRecord,
  };
}
