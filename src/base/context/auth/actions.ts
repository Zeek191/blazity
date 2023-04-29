import { ACTION_TYPES } from "./types";

export function updateUserAction(payload: string): {
  type: ACTION_TYPES.UPDATE_USER;
  payload: string;
} {
  return {
    type: ACTION_TYPES.UPDATE_USER,
    payload,
  };
}

export function clearUserAction(): { type: ACTION_TYPES.CLEAR_USER } {
  return {
    type: ACTION_TYPES.CLEAR_USER,
  };
}
