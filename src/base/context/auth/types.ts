import { UserInfo } from "@/base/types/users";
import type { User } from "firebase/auth";

export enum ACTION_TYPES {
  UPDATE_USER = "UPDATE_USER",
  CLEAR_USER = "CLEAR_USER",
}

export type State = {
  user: User | null;
  info?: Omit<UserInfo, "email"> | null;
};

export type PAYLOAD_UPDATE_USER = {
  user: User;
  info?: Omit<UserInfo, "email">;
};

export type ACTIONS =
  | { type: ACTION_TYPES.UPDATE_USER; payload: PAYLOAD_UPDATE_USER }
  | { type: ACTION_TYPES.CLEAR_USER };
