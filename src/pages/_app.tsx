import type { AppProps } from "next/app";
import "@/base/styles/global.css";
import Header from "@/components/sections/header/header";
import AuthProvider from "@/base/context/auth/provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Header />
      <Component {...pageProps} />
    </AuthProvider>
  );
}
