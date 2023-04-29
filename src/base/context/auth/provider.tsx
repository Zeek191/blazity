import {
  Dispatch,
  PropsWithChildren,
  createContext,
  useEffect,
  useReducer,
} from "react";
import { ACTIONS, State } from "./types";
import { firebaseAuth } from "@/base/services/firebase";

import { User } from "firebase/auth";

import AuthReducer from "./reducer";
import { clearUserAction, updateUserAction } from "./actions";

const initialState: State = {
  user: "",
  authLoading: true,
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

  function authStateChangeHandler(authState: User | null) {
    if (!authState) return dispatch(clearUserAction());
    return dispatch(updateUserAction(authState.uid));
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
