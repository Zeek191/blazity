import { UserInfo } from "@/base/types/users";
import type { User } from "firebase/auth";

export enum ACTION_TYPES {
  UPDATE_USER = "UPDATE_USER",
  CLEAR_USER = "CLEAR_USER",
  LOAD_CONTEXT = "LOAD_CONTEXT",
  UPDATE_USER_INFO = "UPDATE_USER_INFO",
}

export type State = {
  user: User | null;
  contextLoaded: boolean;
  info?: Omit<UserInfo, "email"> | null;
};

export type PAYLOAD_UPDATE_USER_INFO = Omit<UserInfo, "email">;

export type PAYLOAD_UPDATE_USER = {
  user: User;
  info?: PAYLOAD_UPDATE_USER_INFO;
};

export type ACTIONS =
  | { type: ACTION_TYPES.UPDATE_USER; payload: PAYLOAD_UPDATE_USER }
  | { type: ACTION_TYPES.UPDATE_USER_INFO; payload: PAYLOAD_UPDATE_USER_INFO }
  | { type: ACTION_TYPES.CLEAR_USER }
  | { type: ACTION_TYPES.LOAD_CONTEXT };
