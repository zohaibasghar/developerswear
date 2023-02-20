import Link from "next/link";
import Image from "next/image";
import logo from "public/logo-no-background.svg";
import {
  AiOutlineShoppingCart,
  AiOutlineCloseCircle,
  AiOutlinePlus,
  AiOutlineMinus,
} from "react-icons/ai";
import { BsViewList } from "react-icons/bs";
import { useRef } from "react";
import { MdAccountCircle } from "react-icons/md";

const Navbar = ({ cart, addtoCart, lessinCart, clearCart, subTotal }) => {
  const ref = useRef();
  const closeCart = () => {
    ref.current.classList.add("translate-x-full");
  };
  const openCart = () => {
    ref.current.classList.remove("translate-x-full");
  };
  return (
    <div>
      <nav className="bg-gray-800">
        <div className="flex flex-col md:flex-row md:justify-start justify-center items-center">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <Image
                  src={logo}
                  width={200}
                  height={100}
                  alt="Developer's Wear"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <Link
                    href="/"
                    className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </Link>

                  <Link
                    href="/tshirts"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    T-Shirts
                  </Link>

                  <Link
                    href="/mugs"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Mugs
                  </Link>

                  <Link
                    href="/stickers"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Stickers
                  </Link>
                  <Link
                    href="/hoodies"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Hoodies
                  </Link>
                  <Link
                    href="/contact"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Contact
                  </Link>
                  <Link
                    href="/about"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    About
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <Link
            href={"/login"}
            className="absolute right-20 text-3xl hover:text-blue-700 top-4  hover:bg-yellow-500 p-1 rounded"
          >
            <MdAccountCircle />
          </Link>
          <Link
            href={"#"}
            onClick={openCart}
            className="absolute right-0 hover:text-blue-700 top-4 mx-5 hover:bg-yellow-500 p-1 rounded"
          >
            <AiOutlineShoppingCart className="text-3xl " />
          </Link>
        </div>
      </nav>
      <section
        ref={ref}
        className="cart z-10 absolute h-full shadow-2xl text-gray-900 top-0 right-0 bg-yellow-500 w-[300px] px-8 py-10 transform  transition-transform translate-x-full"
      >
        <div className="wrapper">
          <div
            className="closeBtn absolute top-5 right-5 cursor-pointer hover:bg-yellow-200 p-1"
            onClick={closeCart}
          >
            <AiOutlineCloseCircle className="text-2xl" />
          </div>
          <div>
            <h2 className="text-center text-2xl font-bold my-3 ">
              Shopping Cart
            </h2>
            <div className="bill my-3 text-right">Total Bill: ${subTotal}</div>
            <ol>
              {Object.keys(cart).length > 0 ? (
                Object.keys(cart).map((item) => {
                  return (
                    <li
                      className="flex w-[250px] justify-between items-center my-3 border-b p-1 border-gray-500"
                      key={item}
                    >
                      <BsViewList />
                      <div className="flex flex-col items-center">
                        <h3>{cart[item].name}</h3>
                        <span>
                          {cart[item].variant}/{cart[item].size}
                        </span>
                      </div>
                      <div className="quan flex text-center items-center">
                        <AiOutlinePlus
                          className="cursor-pointer hover:bg-yellow-100"
                          onClick={() => {
                            addtoCart(item, 1, "XL", 699, "Tshirt", "Red");
                          }}
                        />
                        <span className="mx-1">{cart[item].qty}</span>
                        <AiOutlineMinus
                          className="cursor-pointer hover:bg-yellow-100"
                          onClick={() => {
                            lessinCart(item, 1);
                          }}
                        />
                      </div>
                    </li>
                  );
                })
              ) : (
                <div className="text-center font-normal my-2">
                  Your cart is empty!
                </div>
              )}
            </ol>
          </div>
          <div className="checkoutBtn flex justify-between">
            <Link
              href={"/checkout"}
              className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={closeCart}
            >
              Check Out
            </Link>

            <button
              className="bg-transparent hover:bg-gray-900 text-gray-900 font-semibold hover:text-white py-2 px-4 border border-gray-900 hover:border-transparent rounded"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Navbar;
