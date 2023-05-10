import { ComponentType, useEffect } from "react";
import { useRouter } from "next/router";
import { ROUTES } from "@/base/consts/routes";
import useAuthContext from "@/base/context/auth/hook";

export default function withProtectedPath<T extends {}>(
  Component: ComponentType<T>
) {
  return function (props: T) {
    const { user, contextLoaded, loadContext } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
      const timeout = setTimeout(() => {
        if (!user && contextLoaded) return router.push(ROUTES.SIGN_IN);
        return loadContext();
      }, 300);

      return () => clearTimeout(timeout);
    }, [user, contextLoaded]);

    return <Component {...props} />;
  };
}
