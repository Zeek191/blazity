import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Auth0Provider } from "@auth0/auth0-react";
import "@/base/styles/global.css";
import Header from "@/components/sections/header/header";

export default function App({ Component, pageProps }: AppProps) {
  console.log(typeof window !== "undefined" && window.location.origin);
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      redirectUri={typeof window !== "undefined" && window.location.origin}
    >
      <UserProvider>
        <Header />
        <Component {...pageProps} />
      </UserProvider>
    </Auth0Provider>
  );
}
