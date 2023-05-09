import { useEffect } from "react";
import useAuthContext from "@/base/context/auth/hook";
import useUsersFirestore from "@/base/hooks/use-users-firestore";
import UserInitials from "@/components/elements/user-initials/user-initials";
import type { PAYLOAD_UPDATE_USER_INFO } from "@/base/context/auth/types";

export default function UserBar() {
  const { user, info, updateUserInfo } = useAuthContext();
  const { readUserRecord } = useUsersFirestore();

  async function updateUserInformation(email: string) {
    const userAdditionalInfo = await readUserRecord({
      docKey: email,
    });

    updateUserInfo(userAdditionalInfo.data() as PAYLOAD_UPDATE_USER_INFO);
  }

  useEffect(() => {
    if (user?.email) {
      updateUserInformation(user?.email);
    }
  }, [user?.email]);

  if (!info?.name) return null;
  return (
    <div className="flex items-center justify-center flex-col">
      <UserInitials {...info} />

      <p className="mt-6 capitalize">
        Hello {info?.name} {info?.surname}!
      </p>
    </div>
  );
}
