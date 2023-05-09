import type { AppProps } from "next/app";
import "@/base/styles/global.css";
import Header from "@/components/sections/header/header";
import AuthProvider from "@/base/context/auth/provider";
import ProductsProvider from "@/base/context/products/provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ProductsProvider>
        <div className="font-mono">
          <Header />
          <Component {...pageProps} />
        </div>
      </ProductsProvider>
    </AuthProvider>
  );
}
