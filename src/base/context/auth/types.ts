export enum ACTION_TYPES {
  UPDATE_USER = "UPDATE_USER",
  CLEAR_USER = "CLEAR_USER",
}

export type State = {
  user: string | null;
  authLoading: boolean;
};

export type ACTIONS =
  | { type: ACTION_TYPES.UPDATE_USER; payload: string }
  | { type: ACTION_TYPES.CLEAR_USER };
