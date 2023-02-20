import "@/styles/globals.css";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function App({ Component, pageProps }) {
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
    } else {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    }
    setCart(newCart);
    saveCart(newCart);
    toast.success(`Item added successfully!`);
  };
  const clearCart = () => {
    setCart({});
    saveCart({});
    toast.info(`Cart cleared!`);
  };
  const lessinCart = (itemCode, qty) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if (cart[itemCode].qty <= 0) {
      delete cart[itemCode];
    }
    setCart(newCart);
    saveCart(newCart);
    toast.info(`Item removed from cart.`);
  };
  const buyNow = (itemCode, qty, size, price, name, variant) => {
    let newCart = { [itemCode]: { qty, size, price, name, variant } };
    setCart(newCart);
    saveCart(newCart);
    router.push("/checkout");
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
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        limit={2}
        transition={Slide}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Component
        buyNow={buyNow}
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
