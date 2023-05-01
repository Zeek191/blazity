import useAuthContext from "@/base/context/auth/hook";
import UserInitials from "@/components/elements/user-initials/user-initials";

export default function UserBar() {
  const { info } = useAuthContext();

  return (
    <div className="flex items-center justify-center flex-col">
      <UserInitials {...info} />

      <p className="mt-6">
        Hello {info?.name} {info?.surname}!
      </p>
    </div>
  );
}
