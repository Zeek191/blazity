import {
  Dispatch,
  PropsWithChildren,
  createContext,
  useEffect,
  useReducer,
} from "react";
import { ACTIONS, PAYLOAD_UPDATE_USER, State } from "./types";
import { firebaseAuth } from "@/base/services/firebase";

import { User } from "firebase/auth";

import AuthReducer from "./reducer";
import { clearUserAction, updateUserAction } from "./actions";
import useUsersFirestore from "@/base/hooks/use-users-firestore";

const initialState: State = {
  user: null,
  info: null,
};

export const AuthContext = createContext<{
  state: State;
  dispatch: Dispatch<ACTIONS>;
}>({
  state: initialState,
  dispatch: () => null,
});

export default function AuthProvider({ children }: PropsWithChildren<{}>) {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const { readUserRecord } = useUsersFirestore();

  async function authStateChangeHandler(authState: User | null) {
    if (!authState || !authState.email) return dispatch(clearUserAction());
    const userAdditionalInfo = await readUserRecord({
      docKey: authState?.email,
    });

    return dispatch(
      updateUserAction({
        user: authState,
        info: userAdditionalInfo.data() as PAYLOAD_UPDATE_USER["info"],
      })
    );
  }

  useEffect(() => {
    const authListener = firebaseAuth.onAuthStateChanged(
      authStateChangeHandler
    );

    return () => authListener();
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}
