import { ACTIONS, ACTION_TYPES, State } from "./types";

export default function AuthReducer(state: State, action: ACTIONS) {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_USER: {
      return {
        ...state,
        user: action.payload.user,
        info: action.payload.info,
      };
    }
    case ACTION_TYPES.CLEAR_USER: {
      return {
        ...state,
        user: null,
      };
    }
    default: {
      return state;
    }
  }
}
