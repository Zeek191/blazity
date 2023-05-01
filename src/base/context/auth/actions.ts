import { User } from "firebase/auth";
import { ACTION_TYPES, PAYLOAD_UPDATE_USER } from "./types";

export function updateUserAction(payload: PAYLOAD_UPDATE_USER): {
  type: ACTION_TYPES.UPDATE_USER;
  payload: PAYLOAD_UPDATE_USER;
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
