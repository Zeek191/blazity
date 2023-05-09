import { ACTION_TYPES } from "./types";
import type { PAYLOAD_UPDATE_USER, PAYLOAD_UPDATE_USER_INFO } from "./types";

export function updateUserAction(payload: PAYLOAD_UPDATE_USER): {
  type: ACTION_TYPES.UPDATE_USER;
  payload: PAYLOAD_UPDATE_USER;
} {
  return {
    type: ACTION_TYPES.UPDATE_USER,
    payload,
  };
}

export function updateUserInfoAction(payload: PAYLOAD_UPDATE_USER_INFO): {
  type: ACTION_TYPES.UPDATE_USER_INFO;
  payload: PAYLOAD_UPDATE_USER_INFO;
} {
  return {
    type: ACTION_TYPES.UPDATE_USER_INFO,
    payload,
  };
}

export function clearUserAction(): { type: ACTION_TYPES.CLEAR_USER } {
  return {
    type: ACTION_TYPES.CLEAR_USER,
  };
}

export function loadContextAction(): { type: ACTION_TYPES.LOAD_CONTEXT } {
  return {
    type: ACTION_TYPES.LOAD_CONTEXT,
  };
}
