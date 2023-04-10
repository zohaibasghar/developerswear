import { useRouter } from "next/router";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();
const CartContextProvider = (props) => {
  const router = useRouter();
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }
  }, []);
  const saveCart = (saveCart) => {
    localStorage.setItem("cart", JSON.stringify(saveCart));
    let subt = 0;
    let keys = Object.keys(saveCart);
    for (let i = 0; i < keys.length; i++) {
      subt += saveCart[keys[i]].price * saveCart[keys[i]].qty;
    }
    setSubTotal(subt);
  };
  const addtoCart = (itemCode, qty, size, price, name, variant) => {
    let newCart = { ...cart };

    if (!(itemCode in cart)) {
      newCart[itemCode] = { name, qty: 1, size, price, variant };
      toast.success(`Item added successfully!`);
    } else {
      newCart[itemCode].qty += qty;
      toast.success(`Item quantity updated!`);
    }

    setCart(newCart);
    saveCart(newCart);
  };

  // delete all items in cart
  const clearCart = () => {
    setCart({});
    saveCart({});
  };

  // decrease the quantity in the cart
  const lessinCart = (itemCode, qty) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if (cart[itemCode].qty <= 0) {
      delete cart[itemCode];
      toast.info(`Item removed from cart.`);
    }
    setCart(newCart);
    saveCart(newCart);
  };

  // buy item right now and clear the remaining items from the cart
  const buyNow = (itemCode, qty, size, price, name, variant) => {
    let newCart = {};
    newCart[itemCode] = { qty, size, price, name, variant };
    setCart(newCart);
    saveCart(newCart);
    router.push("/checkout");
  };
  return (
    <CartContext.Provider
      value={{ cart, addtoCart, buyNow, lessinCart, clearCart, subTotal }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
