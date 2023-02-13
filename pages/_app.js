
import "@/styles/globals.css";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { Fragment, useEffect, useState } from "react";
export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  useEffect(() => {
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")))
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }
    
  }, []);
  

  const saveCart = (saveCart) => {
    localStorage.setItem("cart", JSON.stringify(saveCart));
    let subt = 0;
    let keys = Object.keys(saveCart)
    for (let i = 0; i < keys.length; i++) {
      subt += saveCart[keys[i]].price * saveCart[keys[i]].qty;
    }
    setSubTotal(subt);
  };

  const addtoCart = (itemCode, qty, size, price, name, variant) => {
    let newCart = cart;
    if (!(itemCode in cart)) {
      newCart[itemCode] = { name, qty: 1, size, price, variant };
    } else {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    }
    setCart(newCart);
    saveCart(newCart);
  };
  const clearCart = () => {
    setCart({});
    saveCart({});
  };
  const lessinCart = (itemCode, qty) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
      
    }
    if (cart[itemCode].qty <= 0) {
      delete cart[itemCode];
    }
    setCart(newCart)
    saveCart(newCart)
  };

  return (
    <Fragment>
      <Navbar
        cart={cart}
        addtoCart={addtoCart}
        lessinCart={lessinCart}
        clearCart={clearCart}
        subTotal={subTotal}
      />
      <Component
        cart={cart}
        addtoCart={addtoCart}
        lessinCart={lessinCart}
        clearCart={clearCart}
        subTotal={subTotal}
        {...pageProps}
      />
      <Footer />
    </Fragment>
  );
}
