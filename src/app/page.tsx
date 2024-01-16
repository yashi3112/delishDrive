"use client";

import Header from "@/components/header";
import Home from "@/components/home";
import { CartProvider } from "@/hooks/useCart";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

export default function Page() {
  return (
    <CartProvider>
      <Header></Header>
      <Home></Home>
    </CartProvider>
  );
}
