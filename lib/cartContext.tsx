"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type CartPlan = {
  id: string;
  name: string;
  price: number;
  period: string;
  color: string;
};

type CartContextType = {
  cartPlan: CartPlan | null;
  addToCart: (plan: CartPlan) => void;
  removeFromCart: () => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextType>({
  cartPlan: null,
  addToCart: () => {},
  removeFromCart: () => {},
  cartOpen: false,
  setCartOpen: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartPlan, setCartPlan] = useState<CartPlan | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cart_plan");
    if (saved) setCartPlan(JSON.parse(saved));
  }, []);

  function addToCart(plan: CartPlan) {
    setCartPlan(plan);
    localStorage.setItem("cart_plan", JSON.stringify(plan));
    setCartOpen(true);
  }

  function removeFromCart() {
    setCartPlan(null);
    localStorage.removeItem("cart_plan");
  }

  return (
    <CartContext.Provider value={{ cartPlan, addToCart, removeFromCart, cartOpen, setCartOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}