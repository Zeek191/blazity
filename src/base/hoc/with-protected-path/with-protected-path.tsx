import { useEffect } from "react";
import { useRouter } from "next/router";
import useAuthContext from "@/base/context/auth/hook";

export default function withProtectedPath<T extends JSX.IntrinsicAttributes>(
  Component: React.ComponentType<T>
) {
  return function (props: T) {
    const { user, attempted, clearSignInAttepm } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
      if (attempted && !user) {
        router.push("/auth/sign-in");
        clearSignInAttepm();
      }
    }, [user, attempted]);

    return <Component {...props} />;
  };
}
