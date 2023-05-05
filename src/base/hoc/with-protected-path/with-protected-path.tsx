import { useEffect } from "react";
import { useRouter } from "next/router";
import { ROUTES } from "@/base/consts/routes";
import useAuthContext from "@/base/context/auth/hook";

export default function withProtectedPath<T extends JSX.IntrinsicAttributes>(
  Component: React.ComponentType<T>
) {
  return function (props: T) {
    const { user, attempted, clearSignInAttemp } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push(ROUTES.SIGN_IN);
        clearSignInAttemp();
      }
    }, [user, attempted]);

    return <Component {...props} />;
  };
}
