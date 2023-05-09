import { ACTIONS, ACTION_TYPES, State } from "./types";

export default function AuthReducer(state: State, action: ACTIONS) {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_USER: {
      return {
        ...state,
        user: action.payload.user,
        info: action.payload.info,
        contextLoaded: true,
      };
    }
    case ACTION_TYPES.UPDATE_USER_INFO: {
      return {
        ...state,
        info: action.payload,
      };
    }
    case ACTION_TYPES.CLEAR_USER: {
      return {
        ...state,
        contextLoaded: false,
        user: null,
        info: null,
      };
    }
    case ACTION_TYPES.LOAD_CONTEXT: {
      return {
        ...state,
        contextLoaded: true,
      };
    }
    default: {
      return state;
    }
  }
}
