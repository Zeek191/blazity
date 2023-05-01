import { ACTIONS, ACTION_TYPES, State } from "./types";

export default function AuthReducer(state: State, action: ACTIONS) {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_USER: {
      return {
        ...state,
        user: action.payload.user,
        info: action.payload.info,
        attempted: true,
      };
    }
    case ACTION_TYPES.CLEAR_USER: {
      return {
        ...state,
        user: null,
        info: null,
      };
    }
    case ACTION_TYPES.CLEAR_ATTEMP: {
      return {
        ...state,
        attempted: false,
      };
    }
    default: {
      return state;
    }
  }
}
