import "@/styles/globals.css";
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";
import UserContextProvider from "@/Context/UserContext";
import CartContextProvider from "@/Context/cartContext";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(30);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
    router.events.on("routeChangeError", () => {
      setProgress(10);
    });
  }, [router.query]);

  return (
    <Fragment>
      <LoadingBar
        color="#f59e0b"
        progress={progress}
        waitingTime={100}
        onLoaderFinished={() => setProgress(0)}
      />
      <ToastContainer
        position="bottom-center"
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
      <UserContextProvider>
        <CartContextProvider>
          <Navbar />
          <Component {...pageProps} />
        </CartContextProvider>
      </UserContextProvider>
      <Footer />
    </Fragment>
  );
}
