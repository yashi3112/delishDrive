"use client";
import { CartItem } from "@/models/cart";
import { Product } from "@/models/product";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

// Create a context with an initial empty array for cart items
const CartContext = createContext<{
  cartItems: CartItem[];
  addToCart: (item: Product) => void;
  removeFromCart: (itemId: number) => void;
  removeEntireItem: (itemId: number) => void;
  emptyCart: () => void;
}>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: (itemId) => {},
  removeEntireItem: () => {},
  emptyCart: () => {},
});

interface CartProviderProps {
  children: ReactNode;
}

// Create a CartProvider component that will wrap your entire application
export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const updateLocalStorage = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  const addToCart = (product: Product) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.productId === product.id
    );
    if (existingItemIndex !== -1) {
      // Product is already in the cart, update quantity
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += 1;
      setCartItems(updatedCart);
      updateLocalStorage(updatedCart);
    } else {
      // Product is not in the cart, add as a new item
      const newItem: CartItem = {
        id: Math.random(),
        productId: product.id,
        quantity: 1,
      };
      setCartItems([...cartItems, newItem]);
      updateLocalStorage([...cartItems, newItem]);
    }
  };

  const removeFromCart = (productId: number): void => {
    const updatedCart = cartItems.map((item) => {
      if (item.productId === productId) {
        return {
          ...item,
          quantity: item.quantity > 1 ? item.quantity - 1 : 0,
        };
      } else {
        return item;
      }
    });

    const filteredCart = updatedCart.filter((item) => item.quantity > 0);
    setCartItems(filteredCart);
    updateLocalStorage(filteredCart);
  };

  const removeEntireItem = (productId: number): void => {
    const updatedCart = cartItems.filter(
      (item) => item.productId !== productId
    );
    setCartItems(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const emptyCart = () => {
    updateLocalStorage([]);
  };

  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem("cartItems")!) || []);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        removeEntireItem,
        emptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook to consume the cart context
export const useCart = () => {
  return useContext(CartContext);
};
