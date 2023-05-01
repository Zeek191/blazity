import type { UserInfo } from "@/base/types/users";

export type HeroProps = {
  title: string;
  description?: string;
};

export type UserAdditionalInfo = Omit<UserInfo, "email">;
