import { useEffect } from "react";
import { useRouter } from "next/router";
import useAuthContext from "@/base/context/auth/hook";

export default function withProtectedPath<T extends JSX.IntrinsicAttributes>(
  Component: React.ComponentType<T>
) {
  return function (props: T) {
    const { user } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
      if (!user?.uid) router.push("/auth/sign-in");
    }, [user]);

    return <Component {...props} />;
  };
}
