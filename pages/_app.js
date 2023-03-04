import "@/styles/globals.css";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [key, setKey] = useState(0);
  const [user, setUser] = useState({ value: null });
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    try {
      router.events.on("routeChangeStart", () => {
        setProgress(30);
      });
      router.events.on("routeChangeComplete", () => {
        setProgress(100);
      });
      router.events.on("routeChangeError", () => {
        setProgress(10);
      });

      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }
    let token = localStorage.getItem("auth-token");
    if (token) {
      setUser({ value: token });
      setKey(Math.random());
    }
  }, [router.events]);

  //cart saving function
  const saveCart = (saveCart) => {
    localStorage.setItem("cart", JSON.stringify(saveCart));
    let subt = 0;
    let keys = Object.keys(saveCart);
    for (let i = 0; i < keys.length; i++) {
      subt += saveCart[keys[i]].price * saveCart[keys[i]].qty;
    }
    setSubTotal(subt);
  };

  // add item to the cart
  const addtoCart = (itemCode, qty, size, price, name, variant) => {
    let newCart = { ...cart };
    if (!(itemCode in cart)) {
      newCart[itemCode] = { name, qty: 1, size, price, variant };
      toast.success(`Item added successfully!`);
    } else {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
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
    let newCart={}
    newCart[itemCode] = { qty, size, price, name, variant }
    setCart(newCart);
    saveCart(newCart);
    router.push("/checkout");
  };

  // user logout
  const logout = () => {
    localStorage.removeItem("auth-token");
    setUser({ value: null });
    setKey(Math.random());
    toast.info("Logout Successfully!");
    router.push("/");
  };

  return (
    <Fragment>
      <LoadingBar
        color="#f59e0b"
        progress={progress}
        waitingTime={100}
        onLoaderFinished={() => setProgress(0)}
      />
      <Navbar
        user={user}
        logout={logout}
        skey={key}
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
