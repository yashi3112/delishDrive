import "../styles/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.scss";
import { AppProps } from "next/app";
import { CartProvider } from "@/hooks/useCart";
import "react-toastify/dist/ReactToastify.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Component {...pageProps} />;
    </CartProvider>
  );
}
